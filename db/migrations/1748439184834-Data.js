module.exports = class Data1748439184834 {
    name = 'Data1748439184834'

    async up(db) {
        await db.query(`CREATE TABLE "history_entry" ("id" character varying NOT NULL, "hash" text NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "input" text NOT NULL, "value" numeric, "sender" text NOT NULL, "block_number" numeric NOT NULL, "block_hash" text NOT NULL, "block_timestamp" numeric NOT NULL, CONSTRAINT "PK_b65bd95b0d2929668589d57b97a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_42f94ad5b34442b0bdecf062d1" ON "history_entry" ("from") `)
        await db.query(`CREATE INDEX "IDX_a920b0e67fdb4bff05229f54a7" ON "history_entry" ("to") `)
        await db.query(`CREATE INDEX "IDX_fe526db7b827e088eb8ef9511e" ON "history_entry" ("sender") `)
        await db.query(`CREATE TABLE "trace" ("id" character varying NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "input" text NOT NULL, "value" numeric, "history_entry_id" character varying, CONSTRAINT "PK_d55e3146ed1a9769069a83a8044" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d63c917b0f3336194d22a1741e" ON "trace" ("from") `)
        await db.query(`CREATE INDEX "IDX_98b7eb149196f1f2b430a6a1ca" ON "trace" ("to") `)
        await db.query(`CREATE INDEX "IDX_54e3d8e3dba8322a7ef2fe8d49" ON "trace" ("history_entry_id") `)
        await db.query(`ALTER TABLE "trace" ADD CONSTRAINT "FK_54e3d8e3dba8322a7ef2fe8d493" FOREIGN KEY ("history_entry_id") REFERENCES "history_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "history_entry"`)
        await db.query(`DROP INDEX "public"."IDX_42f94ad5b34442b0bdecf062d1"`)
        await db.query(`DROP INDEX "public"."IDX_a920b0e67fdb4bff05229f54a7"`)
        await db.query(`DROP INDEX "public"."IDX_fe526db7b827e088eb8ef9511e"`)
        await db.query(`DROP TABLE "trace"`)
        await db.query(`DROP INDEX "public"."IDX_d63c917b0f3336194d22a1741e"`)
        await db.query(`DROP INDEX "public"."IDX_98b7eb149196f1f2b430a6a1ca"`)
        await db.query(`DROP INDEX "public"."IDX_54e3d8e3dba8322a7ef2fe8d49"`)
        await db.query(`ALTER TABLE "trace" DROP CONSTRAINT "FK_54e3d8e3dba8322a7ef2fe8d493"`)
    }
}
