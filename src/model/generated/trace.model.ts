import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_, ManyToOne as ManyToOne_} from "@subsquid/typeorm-store"
import {HistoryEntry} from "./historyEntry.model"

@Entity_()
export class Trace {
    constructor(props?: Partial<Trace>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

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
    @ManyToOne_(() => HistoryEntry, {nullable: true})
    historyEntry!: HistoryEntry
}
