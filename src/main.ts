import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as depositAbi from "./abi/depositContract";
import { Deposit } from "./model";

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/ethereum-mainnet")
  .setRpcEndpoint({
    url: process.env.RPC_ETH_HTTP,
    rateLimit: 10,
  })
  .setFinalityConfirmation(75) // 15 mins to finality
  .setBlockRange({
    from: 21881391,
  })
  .addLog({
    address: ["0x00000000219ab540356cbb839cbe05303d7705fa"],
    topic0: [depositAbi.events.DepositEvent.topic],
    transaction: true,
  });

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  const deposits: Deposit[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      const transaction = log.getTransaction();

      let {
        pubkey,
        withdrawal_credentials: withdrawalCredentials,
        amount,
        signature,
        index,
      } = depositAbi.events.DepositEvent.decode(log);

      deposits.push(
        new Deposit({
          id: log.id,
          pubkey,
          withdrawalCredentials,
          amount: BigInt(amount),
          signature,
          index,
          transactionHash: transaction.hash,
        }),
      );
    }
  }

  await ctx.store.insert(deposits);
});
