import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { HistoryEntry, Trace } from "./model";
import { z } from "zod";
import * as beaconDeposit from "./abi/BeaconDeposit";
import * as ethDepositor from "./abi/ETHDepositor";
import * as messageSender from "./abi/MessageSender";
import * as ssvNetwork from "./abi/SSVNetwork";
import * as ssvProxyFactory from "./abi/SSVProxyFactory";
import * as ssvUnlimitedProxyFactory from "./abi/SSVUnlimitedProxyFactory";
import * as unlimitedETHDepositor from "./abi/UnlimitedETHDepositor";

const ethAddressSchema = z.string().regex(/^(0x)?[0-9a-fA-F]{40}$/);
const startBlockSchema = z.coerce.number().int();

const env = z
  .object({
    GATEWAY_HTTP: z.string().url(),
    RPC_ETH_HTTP: z.string().url(),
    BEACON_DEPOSIT__CONTRACT_ADDRESS: ethAddressSchema,
    BEACON_DEPOSIT__START_BLOCK: startBlockSchema,
    PARTIAL_WITHDRAWAL__CONTRACT_ADDRESS: ethAddressSchema,
    PARTIAL_WITHDRAWAL__START_BLOCK: startBlockSchema,
    CONSOLIDATE_VALIDATORS__CONTRACT_ADDRESS: ethAddressSchema,
    CONSOLIDATE_VALIDATORS__START_BLOCK: startBlockSchema,
    DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__CONTRACT_ADDRESS: ethAddressSchema,
    DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__START_BLOCK: startBlockSchema,
    DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__CONTRACT_ADDRESS: ethAddressSchema,
    DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__START_BLOCK: startBlockSchema,
    SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS: ethAddressSchema,
    SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__START_BLOCK: startBlockSchema,
    SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS: ethAddressSchema,
    SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__START_BLOCK: startBlockSchema,
    DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__CONTRACT_ADDRESS: ethAddressSchema,
    DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__START_BLOCK: startBlockSchema,
    SSV_WITHDRAWAL__SSV_NETWORK__CONTRACT_ADDRESS: ethAddressSchema,
    SSV_WITHDRAWAL__SSV_NETWORK__START_BLOCK: startBlockSchema,
  })
  .parse(process.env);

const processor = new EvmBatchProcessor()
  .setGateway(env.GATEWAY_HTTP)
  .setRpcEndpoint({
    url: env.RPC_ETH_HTTP,
    rateLimit: 10,
  })
  .setFinalityConfirmation(75) // 15 mins to finality
  .setFields({
    trace: {
      callFrom: true,
      callTo: true,
      callInput: true,
      callValue: true,
      callSighash: true,
    },
    transaction: {
      hash: true,
      from: true,
      to: true,
      input: true,
      value: true,
      sighash: true,
    },
  })
  // Native deposits - top ups
  .addTrace({
    callTo: [env.BEACON_DEPOSIT__CONTRACT_ADDRESS],
    callSighash: [beaconDeposit.functions.deposit.sighash],
    range: {
      from: env.BEACON_DEPOSIT__START_BLOCK,
    },
    transaction: true,
  })
  // Native withdrawals - partial/full
  .addTrace({
    callTo: [env.PARTIAL_WITHDRAWAL__CONTRACT_ADDRESS],
    range: {
      from: env.PARTIAL_WITHDRAWAL__START_BLOCK,
    },
    transaction: true,
  })
  // Native validators consolidations - upgrade/consolidation
  .addTrace({
    callTo: [env.CONSOLIDATE_VALIDATORS__CONTRACT_ADDRESS],
    range: {
      from: env.CONSOLIDATE_VALIDATORS__START_BLOCK,
    },
    transaction: true,
  })
  // Direct deposits - unlimited
  .addTrace({
    callTo: [env.DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__CONTRACT_ADDRESS],
    callSighash: [unlimitedETHDepositor.functions.addEth.sighash],
    range: {
      from: env.DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__START_BLOCK,
    },
    transaction: true,
  })
  // Direct deposits - legacy
  .addTrace({
    callTo: [env.DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__CONTRACT_ADDRESS],
    callSighash: [ethDepositor.functions.deposit.sighash],
    range: {
      from: env.DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__START_BLOCK,
    },
    transaction: true,
  })
  // SSV deposits - unlimited
  .addTrace({
    callTo: [env.SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS],
    callSighash: [ssvUnlimitedProxyFactory.functions.addEth.sighash],
    range: {
      from: env.SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__START_BLOCK,
    },
    transaction: true,
  })
  // SSV deposits - legacy
  .addTrace({
    callTo: [env.SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS],
    callSighash: [ssvProxyFactory.functions.depositEthAndRegisterValidators.sighash],
    range: {
      from: env.SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__START_BLOCK,
    },
    transaction: true,
  })
  // Direct withdrawals
  .addTrace({
    callTo: [env.DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__CONTRACT_ADDRESS],
    callSighash: [messageSender.functions.send.sighash],
    range: {
      from: env.DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__START_BLOCK,
    },
    transaction: true,
  })
  // SSV withdrawals
  .addTrace({
    callTo: [env.SSV_WITHDRAWAL__SSV_NETWORK__CONTRACT_ADDRESS],
    callSighash: [ssvNetwork.functions.bulkExitValidator.sighash],
    range: {
      from: env.SSV_WITHDRAWAL__SSV_NETWORK__START_BLOCK,
    },
    transaction: true,
  });

const db = new TypeormDatabase({
  supportHotBlocks: true,
});

processor.run(db, async (ctx) => {
  const historyEntries: Map<string, HistoryEntry> = new Map();
  const traces: Trace[] = [];

  for (const block of ctx.blocks) {
    for (const trace of block.traces) {
      const transaction = trace.transaction;
      const shouldProcess = trace.type === "call" && !!transaction;

      if (shouldProcess) {
        let historyEntry = historyEntries.get(transaction.hash);

        if (!historyEntry) {
          historyEntry = new HistoryEntry({
            id: transaction.hash,
            blockNumber: BigInt(block.header.height),
            blockHash: block.header.hash,
            blockTimestamp: BigInt(block.header.timestamp),
            hash: transaction.hash,
            from: transaction.from,
            to: transaction.to,
            input: transaction.input,
            value: transaction.value,
          });

          historyEntries.set(transaction.hash, historyEntry);
        }

        traces.push(
          new Trace({
            id: `${transaction.id}-${block.traces.indexOf(trace)}`,
            from: trace.action.from,
            to: trace.action.to,
            input: trace.action.input,
            value: trace.action.value,
            historyEntry,
          }),
        );
      }
    }
  }

  await ctx.store.insert(Array.from(historyEntries.values()));
  await ctx.store.insert(traces);
});
