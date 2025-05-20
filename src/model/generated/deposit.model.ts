import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Deposit {
    constructor(props?: Partial<Deposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    pubkey!: string

    @Index_()
    @StringColumn_({nullable: false})
    withdrawalCredentials!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: false})
    signature!: string

    @StringColumn_({nullable: false})
    index!: string

    @StringColumn_({nullable: true})
    transactionHash!: string | undefined | null
}
