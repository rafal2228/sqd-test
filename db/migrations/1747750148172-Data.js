module.exports = class Data1747750148172 {
    name = 'Data1747750148172'

    async up(db) {
        await db.query(`CREATE TABLE "deposit" ("id" character varying NOT NULL, "pubkey" text NOT NULL, "withdrawal_credentials" text NOT NULL, "amount" numeric NOT NULL, "signature" text NOT NULL, "index" text NOT NULL, "transaction_hash" text, CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_583e677e23df5bbfb377bf7a90" ON "deposit" ("pubkey") `)
        await db.query(`CREATE INDEX "IDX_dc51d6f657caf6a7b85bfea5f1" ON "deposit" ("withdrawal_credentials") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "deposit"`)
        await db.query(`DROP INDEX "public"."IDX_583e677e23df5bbfb377bf7a90"`)
        await db.query(`DROP INDEX "public"."IDX_dc51d6f657caf6a7b85bfea5f1"`)
    }
}
