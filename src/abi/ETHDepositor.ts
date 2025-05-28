import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    P2pEth2DepositEvent: event("0xed010f209ca1ee910dd761c64890cbac3b65ddf603acdc531f9c1fcec366a790", "P2pEth2DepositEvent(address,address,uint64,uint256)", {"_from": indexed(p.address), "_newFeeDistributorAddress": indexed(p.address), "_firstValidatorId": indexed(p.uint64), "_validatorCount": p.uint256}),
}

export const functions = {
    collateral: viewFun("0xd8dfeb45", "collateral()", {}, p.uint256),
    deposit: fun("0x2c4b04fa", "deposit(bytes[],bytes,bytes[],bytes32[],(uint96,address),(uint96,address))", {"_pubkeys": p.array(p.bytes), "_withdrawal_credentials": p.bytes, "_signatures": p.array(p.bytes), "_deposit_data_roots": p.array(p.bytes32), "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, ),
    i_depositContract: viewFun("0x8a46d351", "i_depositContract()", {}, p.address),
    i_feeDistributorFactory: viewFun("0x7a49f5e6", "i_feeDistributorFactory()", {}, p.address),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    validatorsMaxAmount: viewFun("0xd9fc5298", "validatorsMaxAmount()", {}, p.uint256),
}

export class Contract extends ContractBase {

    collateral() {
        return this.eth_call(functions.collateral, {})
    }

    i_depositContract() {
        return this.eth_call(functions.i_depositContract, {})
    }

    i_feeDistributorFactory() {
        return this.eth_call(functions.i_feeDistributorFactory, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    validatorsMaxAmount() {
        return this.eth_call(functions.validatorsMaxAmount, {})
    }
}

/// Event types
export type P2pEth2DepositEventEventArgs = EParams<typeof events.P2pEth2DepositEvent>

/// Function types
export type CollateralParams = FunctionArguments<typeof functions.collateral>
export type CollateralReturn = FunctionReturn<typeof functions.collateral>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type I_depositContractParams = FunctionArguments<typeof functions.i_depositContract>
export type I_depositContractReturn = FunctionReturn<typeof functions.i_depositContract>

export type I_feeDistributorFactoryParams = FunctionArguments<typeof functions.i_feeDistributorFactory>
export type I_feeDistributorFactoryReturn = FunctionReturn<typeof functions.i_feeDistributorFactory>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type ValidatorsMaxAmountParams = FunctionArguments<typeof functions.validatorsMaxAmount>
export type ValidatorsMaxAmountReturn = FunctionReturn<typeof functions.validatorsMaxAmount>

