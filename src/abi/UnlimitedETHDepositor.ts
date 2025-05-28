import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    P2pOrgUnlimitedEthDepositor__ClientEthAdded: event("0xb68a516afc822ac0bf66ed8ded762ab226ec9f1a6f957997ae2053eebc6b388a", "P2pOrgUnlimitedEthDepositor__ClientEthAdded(bytes32,address,address,bytes32,uint256,uint40,uint96,bytes)", {"_depositId": indexed(p.bytes32), "_sender": indexed(p.address), "_feeDistributorInstance": indexed(p.address), "_eth2WithdrawalCredentials": p.bytes32, "_amount": p.uint256, "_expiration": p.uint40, "_ethAmountPerValidatorInWei": p.uint96, "_extraData": p.bytes}),
    P2pOrgUnlimitedEthDepositor__Eip7251Enabled: event("0x3a8316ecfbf6f3065062d901f7624822ee8487d310ab29ad723e8a90276009b0", "P2pOrgUnlimitedEthDepositor__Eip7251Enabled()", {}),
    P2pOrgUnlimitedEthDepositor__Eth2Deposit: event("0x0a564087509236efe6e8513e8e2ea4ef2012d4986653771a5e8fe8dafa6741cb", "P2pOrgUnlimitedEthDepositor__Eth2Deposit(bytes32,uint256)", {"_depositId": indexed(p.bytes32), "_validatorCount": p.uint256}),
    P2pOrgUnlimitedEthDepositor__Eth2DepositCompleted: event("0x21b9552c832765250435d11e81889d766400ef1520579ae27e6e8df3fcc240ef", "P2pOrgUnlimitedEthDepositor__Eth2DepositCompleted(bytes32)", {"_depositId": indexed(p.bytes32)}),
    P2pOrgUnlimitedEthDepositor__Eth2DepositInProgress: event("0xd8f8be349b5615f4a7af6a678a23efb0ffa3fc3d6715344cf07f6b8347fec98d", "P2pOrgUnlimitedEthDepositor__Eth2DepositInProgress(bytes32)", {"_depositId": indexed(p.bytes32)}),
    P2pOrgUnlimitedEthDepositor__Refund: event("0x1443e4defcd744ac29619ec2a0bdd3ac7adb4040976d5f49e38b7bc4e5accb57", "P2pOrgUnlimitedEthDepositor__Refund(bytes32,address,address,uint256)", {"_depositId": indexed(p.bytes32), "_feeDistributorInstance": indexed(p.address), "_client": indexed(p.address), "_amount": p.uint256}),
    P2pOrgUnlimitedEthDepositor__ServiceRejected: event("0x320fa1e69da1125204e7c088a134705e00c10e1d0ad6082a0361da2532f6e945", "P2pOrgUnlimitedEthDepositor__ServiceRejected(bytes32,string)", {"_depositId": indexed(p.bytes32), "_reason": p.string}),
}

export const functions = {
    addEth: fun("0xa49b131b", "addEth(bytes32,uint96,address,(uint96,address),(uint96,address),bytes)", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_referenceFeeDistributor": p.address, "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_extraData": p.bytes}, {"depositId": p.bytes32, "feeDistributorInstance": p.address}),
    depositAmount: viewFun("0x01fecab6", "depositAmount(bytes32)", {"_depositId": p.bytes32}, p.uint112),
    depositExpiration: viewFun("0x8d1be0cb", "depositExpiration(bytes32)", {"_depositId": p.bytes32}, p.uint40),
    depositStatus: viewFun("0x7da9874f", "depositStatus(bytes32)", {"_depositId": p.bytes32}, p.uint8),
    eip7251Enabled: viewFun("0xc4ad9195", "eip7251Enabled()", {}, p.bool),
    enableEip7251: fun("0x28c2f044", "enableEip7251()", {}, ),
    'getDepositId(bytes32,uint96,address)': viewFun("0x17c5d106", "getDepositId(bytes32,uint96,address)", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_feeDistributorInstance": p.address}, p.bytes32),
    'getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))': viewFun("0x31745d91", "getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_referenceFeeDistributor": p.address, "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.bytes32),
    i_depositContract: viewFun("0x8a46d351", "i_depositContract()", {}, p.address),
    i_feeDistributorFactory: viewFun("0x7a49f5e6", "i_feeDistributorFactory()", {}, p.address),
    makeBeaconDeposit: fun("0x926b0e53", "makeBeaconDeposit(bytes32,uint96,address,bytes[],bytes[],bytes32[])", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_feeDistributorInstance": p.address, "_pubkeys": p.array(p.bytes), "_signatures": p.array(p.bytes), "_depositDataRoots": p.array(p.bytes32)}, ),
    refund: fun("0x08bedf95", "refund(bytes32,uint96,address)", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_feeDistributorInstance": p.address}, ),
    rejectService: fun("0xd77cc535", "rejectService(bytes32,string)", {"_depositId": p.bytes32, "_reason": p.string}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    totalBalance: viewFun("0xad7a672f", "totalBalance()", {}, p.uint256),
}

export class Contract extends ContractBase {

    depositAmount(_depositId: DepositAmountParams["_depositId"]) {
        return this.eth_call(functions.depositAmount, {_depositId})
    }

    depositExpiration(_depositId: DepositExpirationParams["_depositId"]) {
        return this.eth_call(functions.depositExpiration, {_depositId})
    }

    depositStatus(_depositId: DepositStatusParams["_depositId"]) {
        return this.eth_call(functions.depositStatus, {_depositId})
    }

    eip7251Enabled() {
        return this.eth_call(functions.eip7251Enabled, {})
    }

    'getDepositId(bytes32,uint96,address)'(_eth2WithdrawalCredentials: GetDepositIdParams_0["_eth2WithdrawalCredentials"], _ethAmountPerValidatorInWei: GetDepositIdParams_0["_ethAmountPerValidatorInWei"], _feeDistributorInstance: GetDepositIdParams_0["_feeDistributorInstance"]) {
        return this.eth_call(functions['getDepositId(bytes32,uint96,address)'], {_eth2WithdrawalCredentials, _ethAmountPerValidatorInWei, _feeDistributorInstance})
    }

    'getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))'(_eth2WithdrawalCredentials: GetDepositIdParams_1["_eth2WithdrawalCredentials"], _ethAmountPerValidatorInWei: GetDepositIdParams_1["_ethAmountPerValidatorInWei"], _referenceFeeDistributor: GetDepositIdParams_1["_referenceFeeDistributor"], _clientConfig: GetDepositIdParams_1["_clientConfig"], _referrerConfig: GetDepositIdParams_1["_referrerConfig"]) {
        return this.eth_call(functions['getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))'], {_eth2WithdrawalCredentials, _ethAmountPerValidatorInWei, _referenceFeeDistributor, _clientConfig, _referrerConfig})
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

    totalBalance() {
        return this.eth_call(functions.totalBalance, {})
    }
}

/// Event types
export type P2pOrgUnlimitedEthDepositor__ClientEthAddedEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__ClientEthAdded>
export type P2pOrgUnlimitedEthDepositor__Eip7251EnabledEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__Eip7251Enabled>
export type P2pOrgUnlimitedEthDepositor__Eth2DepositEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__Eth2Deposit>
export type P2pOrgUnlimitedEthDepositor__Eth2DepositCompletedEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__Eth2DepositCompleted>
export type P2pOrgUnlimitedEthDepositor__Eth2DepositInProgressEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__Eth2DepositInProgress>
export type P2pOrgUnlimitedEthDepositor__RefundEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__Refund>
export type P2pOrgUnlimitedEthDepositor__ServiceRejectedEventArgs = EParams<typeof events.P2pOrgUnlimitedEthDepositor__ServiceRejected>

/// Function types
export type AddEthParams = FunctionArguments<typeof functions.addEth>
export type AddEthReturn = FunctionReturn<typeof functions.addEth>

export type DepositAmountParams = FunctionArguments<typeof functions.depositAmount>
export type DepositAmountReturn = FunctionReturn<typeof functions.depositAmount>

export type DepositExpirationParams = FunctionArguments<typeof functions.depositExpiration>
export type DepositExpirationReturn = FunctionReturn<typeof functions.depositExpiration>

export type DepositStatusParams = FunctionArguments<typeof functions.depositStatus>
export type DepositStatusReturn = FunctionReturn<typeof functions.depositStatus>

export type Eip7251EnabledParams = FunctionArguments<typeof functions.eip7251Enabled>
export type Eip7251EnabledReturn = FunctionReturn<typeof functions.eip7251Enabled>

export type EnableEip7251Params = FunctionArguments<typeof functions.enableEip7251>
export type EnableEip7251Return = FunctionReturn<typeof functions.enableEip7251>

export type GetDepositIdParams_0 = FunctionArguments<typeof functions['getDepositId(bytes32,uint96,address)']>
export type GetDepositIdReturn_0 = FunctionReturn<typeof functions['getDepositId(bytes32,uint96,address)']>

export type GetDepositIdParams_1 = FunctionArguments<typeof functions['getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))']>
export type GetDepositIdReturn_1 = FunctionReturn<typeof functions['getDepositId(bytes32,uint96,address,(uint96,address),(uint96,address))']>

export type I_depositContractParams = FunctionArguments<typeof functions.i_depositContract>
export type I_depositContractReturn = FunctionReturn<typeof functions.i_depositContract>

export type I_feeDistributorFactoryParams = FunctionArguments<typeof functions.i_feeDistributorFactory>
export type I_feeDistributorFactoryReturn = FunctionReturn<typeof functions.i_feeDistributorFactory>

export type MakeBeaconDepositParams = FunctionArguments<typeof functions.makeBeaconDeposit>
export type MakeBeaconDepositReturn = FunctionReturn<typeof functions.makeBeaconDeposit>

export type RefundParams = FunctionArguments<typeof functions.refund>
export type RefundReturn = FunctionReturn<typeof functions.refund>

export type RejectServiceParams = FunctionArguments<typeof functions.rejectService>
export type RejectServiceReturn = FunctionReturn<typeof functions.rejectService>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type TotalBalanceParams = FunctionArguments<typeof functions.totalBalance>
export type TotalBalanceReturn = FunctionReturn<typeof functions.totalBalance>

