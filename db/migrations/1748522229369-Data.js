module.exports = class Data1748522229369 {
    name = 'Data1748522229369'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_fe526db7b827e088eb8ef9511e"`)
        await db.query(`ALTER TABLE "history_entry" DROP COLUMN "sender"`)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_fe526db7b827e088eb8ef9511e" ON "history_entry" ("sender") `)
        await db.query(`ALTER TABLE "history_entry" ADD "sender" text NOT NULL`)
    }
}
