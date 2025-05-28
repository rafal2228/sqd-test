import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { Transaction } from "./model";
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
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-mainnet")
  .setRpcEndpoint({
    url: env.RPC_ETH_HTTP,
    rateLimit: 10,
  })
  .setFinalityConfirmation(75) // 15 mins to finality
  .setFields({
    transaction: {
      hash: true,
      from: true,
      to: true,
      input: true,
      value: true,
    },
  })
  // Native deposits - top ups
  .addTransaction({
    to: [env.BEACON_DEPOSIT__CONTRACT_ADDRESS],
    sighash: [beaconDeposit.functions.deposit.sighash],
    range: {
      from: env.BEACON_DEPOSIT__START_BLOCK,
    },
  })
  // Native withdrawals - partial/full
  .addTransaction({
    to: [env.PARTIAL_WITHDRAWAL__CONTRACT_ADDRESS],
    range: {
      from: env.PARTIAL_WITHDRAWAL__START_BLOCK,
    },
  })
  // Native validators consolidations - upgrade/consolidation
  .addTransaction({
    to: [env.CONSOLIDATE_VALIDATORS__CONTRACT_ADDRESS],
    range: {
      from: env.CONSOLIDATE_VALIDATORS__START_BLOCK,
    },
  })
  // Direct deposits - unlimited
  .addTransaction({
    to: [env.DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__CONTRACT_ADDRESS],
    sighash: [unlimitedETHDepositor.functions.addEth.sighash],
    range: {
      from: env.DIRECT_DEPOSIT_UNLIMITED__P2P_ORG_UNLIMITED_ETH_DEPOSITOR__START_BLOCK,
    },
  })
  // Direct deposits - legacy
  .addTransaction({
    to: [env.DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__CONTRACT_ADDRESS],
    sighash: [ethDepositor.functions.deposit.sighash],
    range: {
      from: env.DIRECT_DEPOSIT__P2P_ETH_DEPOSITOR__START_BLOCK,
    },
  })
  // SSV deposits - unlimited
  .addTransaction({
    to: [env.SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS],
    sighash: [ssvUnlimitedProxyFactory.functions.addEth.sighash],
    range: {
      from: env.SSV_DEPOSIT_UNLIMITED__P2P_SSV_PROXY_FACTORY__START_BLOCK,
    },
  })
  // SSV deposits - legacy
  .addTransaction({
    to: [env.SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__CONTRACT_ADDRESS],
    sighash: [ssvProxyFactory.functions.depositEthAndRegisterValidators.sighash],
    range: {
      from: env.SSV_DEPOSIT__P2P_SSV_PROXY_FACTORY__START_BLOCK,
    },
  })
  // Direct withdrawals
  .addTransaction({
    to: [env.DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__CONTRACT_ADDRESS],
    sighash: [messageSender.functions.send.sighash],
    range: {
      from: env.DIRECT_WITHDRAW__P2P_MESSAGE_SENDER__START_BLOCK,
    },
  })
  // SSV withdrawals
  .addTransaction({
    to: [env.SSV_WITHDRAWAL__SSV_NETWORK__CONTRACT_ADDRESS],
    sighash: [ssvNetwork.functions.bulkExitValidator.sighash],
    range: {
      from: env.SSV_WITHDRAWAL__SSV_NETWORK__START_BLOCK,
    },
  });

const db = new TypeormDatabase({
  supportHotBlocks: true,
});

processor.run(db, async (ctx) => {
  let transactions: Transaction[] = [];

  for (const block of ctx.blocks) {
    for (const transaction of block.transactions) {
      transactions.push(
        new Transaction({
          id: transaction.id,
          blockNumber: BigInt(block.header.height),
          blockHash: block.header.hash,
          blockTimestamp: BigInt(block.header.timestamp),
          hash: transaction.hash,
          from: transaction.from,
          to: transaction.to,
          input: transaction.input,
          value: transaction.value,
        }),
      );
    }
  }

  await ctx.store.insert(transactions);
});
