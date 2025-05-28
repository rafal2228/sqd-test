import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Trace} from "./trace.model"

@Entity_()
export class HistoryEntry {
    constructor(props?: Partial<HistoryEntry>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: false})
    hash!: string

    @Index_()
    @StringColumn_({nullable: false})
    from!: string

    @Index_()
    @StringColumn_({nullable: false})
    to!: string

    @StringColumn_({nullable: false})
    input!: string

    @BigIntColumn_({nullable: true})
    value!: bigint | undefined | null

    @Index_()
    @StringColumn_({nullable: false})
    sender!: string

    @BigIntColumn_({nullable: false})
    blockNumber!: bigint

    @StringColumn_({nullable: false})
    blockHash!: string

    @BigIntColumn_({nullable: false})
    blockTimestamp!: bigint

    @OneToMany_(() => Trace, e => e.historyEntry)
    traces!: Trace[]
}
