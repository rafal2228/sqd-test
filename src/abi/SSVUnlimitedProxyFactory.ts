import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ERC1155Transferred: event("0x1c84289b4389ba8251b26974eaec89409eb21a1198ca5eb281c86388da2e778b", "ERC1155Transferred(address,address,uint256,uint256,bytes)", {"_token": indexed(p.address), "_recipient": indexed(p.address), "_tokenId": p.uint256, "_amount": p.uint256, "_data": p.bytes}),
    ERC20Transferred: event("0xe8de91d538b06154a2c48315768c5046f47e127d7fd3f726fd85cc723f29b052", "ERC20Transferred(address,address,uint256)", {"_token": indexed(p.address), "_recipient": indexed(p.address), "_amount": p.uint256}),
    ERC721Transferred: event("0xcd68d836931d28b26c81fd06a68b603542d9b3a2fd1ba1c1bd30c9e2e5f4e6eb", "ERC721Transferred(address,address,uint256)", {"_token": indexed(p.address), "_recipient": indexed(p.address), "_tokenId": p.uint256}),
    EtherTransferred: event("0x2bd8874aee0f667380057c67e3a812157e4b7649b244d6fcbc9094a9a1f7ee1d", "EtherTransferred(address,uint256)", {"_recipient": indexed(p.address), "_amount": p.uint256}),
    OperatorChanged: event("0xd58299b712891143e76310d5e664c4203c940a67db37cf856bdaa3c5c76a802c", "OperatorChanged(address,address)", {"_previousOperator": indexed(p.address), "_newOperator": indexed(p.address)}),
    OwnershipTransferStarted: event("0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700", "OwnershipTransferStarted(address,address)", {"_previousOwner": indexed(p.address), "_newOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"_previousOwner": indexed(p.address), "_newOwner": indexed(p.address)}),
    P2pSsvProxyFactory__AllowedSelectorsForClientRemoved: event("0x71e256b211b9990dce5e4eeead09024fc0ac9967e82176c0d64d704e62d65a41", "P2pSsvProxyFactory__AllowedSelectorsForClientRemoved(bytes4[])", {"_selectors": p.array(p.bytes4)}),
    P2pSsvProxyFactory__AllowedSelectorsForClientSet: event("0x9af894151314cf5c8f253a71f43eab115ae4b5963967529ec692905a5f5b89ef", "P2pSsvProxyFactory__AllowedSelectorsForClientSet(bytes4[])", {"_selectors": p.array(p.bytes4)}),
    P2pSsvProxyFactory__AllowedSelectorsForOperatorRemoved: event("0x5a21b3acabeaf7a66d3b7ae828dc70126a2f78e48f2b4d4a4afc740eb110f434", "P2pSsvProxyFactory__AllowedSelectorsForOperatorRemoved(bytes4[])", {"_selectors": p.array(p.bytes4)}),
    P2pSsvProxyFactory__AllowedSelectorsForOperatorSet: event("0xdd82d1dff1dbfeff391b03e9ec0a39d28964bf9972ed71ce60e8a7162e43f419", "P2pSsvProxyFactory__AllowedSelectorsForOperatorSet(bytes4[])", {"_selectors": p.array(p.bytes4)}),
    P2pSsvProxyFactory__AllowedSsvOperatorOwnersRemoved: event("0xfc6d52677793949e1840b9b6953d4ec3f4942d6e175e46f366e5acd6e5402c74", "P2pSsvProxyFactory__AllowedSsvOperatorOwnersRemoved(address[])", {"_allowedSsvOperatorOwners": p.array(p.address)}),
    P2pSsvProxyFactory__AllowedSsvOperatorOwnersSet: event("0x403cb436b5360f44a015c50aa8b4eb13cff157957347944f8d6d7f9f24c636f2", "P2pSsvProxyFactory__AllowedSsvOperatorOwnersSet(address[])", {"_allowedSsvOperatorOwners": p.array(p.address)}),
    P2pSsvProxyFactory__EthForSsvStakingDeposited: event("0x4c940184a7059190c68b13c7de53a61e5b7f8c0a42b89413a5cb31272f799a23", "P2pSsvProxyFactory__EthForSsvStakingDeposited(bytes32,address,address,address,uint256)", {"_depositId": indexed(p.bytes32), "_sender": indexed(p.address), "_p2pSsvProxy": indexed(p.address), "_feeDistributorInstance": p.address, "_ethAmountInWei": p.uint256}),
    P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorSet: event("0xe2badc4ee8835bf149d207b80ab81bc05d339496d3aa17f90aa66d168056f7f0", "P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorSet(uint112)", {"_maxSsvTokenAmountPerValidator": p.uint112}),
    P2pSsvProxyFactory__P2pSsvProxyCreated: event("0x74b819b8f23dff5a79460de77b1c59893078357c408163c9502f71b7b39540d8", "P2pSsvProxyFactory__P2pSsvProxyCreated(address,address,address)", {"_p2pSsvProxy": indexed(p.address), "_client": indexed(p.address), "_feeDistributor": indexed(p.address)}),
    P2pSsvProxyFactory__ReferenceFeeDistributorSet: event("0xe9d395ade7e90aa86b53f2ca7a6af85aa882c2363e96203e90b856a978059ff5", "P2pSsvProxyFactory__ReferenceFeeDistributorSet(address)", {"_referenceFeeDistributor": indexed(p.address)}),
    P2pSsvProxyFactory__ReferenceP2pSsvProxySet: event("0x11f0ffbb8f2ed411b4fa661dcaba92bdfe8e4eced3a98a1556336384f906280d", "P2pSsvProxyFactory__ReferenceP2pSsvProxySet(address)", {"_referenceP2pSsvProxy": indexed(p.address)}),
    P2pSsvProxyFactory__RegistrationCompleted: event("0x5024bc22be69cf6a4b8a15170414e79de44a8853ae021ce695262332ad984649", "P2pSsvProxyFactory__RegistrationCompleted(address)", {"_proxy": indexed(p.address)}),
    P2pSsvProxyFactory__SsvOperatorIdsCleared: event("0xaaeaa052a256956b26324e9642ea99c37516184524168473d5c91d124154ecaf", "P2pSsvProxyFactory__SsvOperatorIdsCleared(address)", {"_ssvOperatorOwner": indexed(p.address)}),
    P2pSsvProxyFactory__SsvOperatorIdsSet: event("0xd3988927265f07401f6d03cfba8fb1d10aaa2bb9f03ba66aee69cb69fc0a9835", "P2pSsvProxyFactory__SsvOperatorIdsSet(address,uint64[24])", {"_ssvOperatorOwner": indexed(p.address), "_operatorIds": p.fixedSizeArray(p.uint64, 24)}),
    P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiSet: event("0x5da50833eee5d5726caca4250b6d7d8a972913b02081b430e5c98bdc29e0ca0b", "P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiSet(uint112)", {"_ssvPerEthExchangeRateDividedByWei": p.uint112}),
}

export const functions = {
    acceptOwnership: fun("0x79ba5097", "acceptOwnership()", {}, ),
    addEth: fun("0x746bd100", "addEth(bytes32,uint96,(uint96,address),(uint96,address),bytes)", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_extraData": p.bytes}, {"_0": p.bytes32, "_1": p.address, "_2": p.address}),
    changeOperator: fun("0x06394c9b", "changeOperator(address)", {"_newOperator": p.address}, ),
    checkOperatorOrOwner: viewFun("0x1b54769e", "checkOperatorOrOwner(address)", {"_address": p.address}, ),
    'clearSsvOperatorIds(address)': fun("0x340d73a7", "clearSsvOperatorIds(address)", {"_ssvOperatorOwner": p.address}, ),
    'clearSsvOperatorIds()': fun("0x66552b95", "clearSsvOperatorIds()", {}, ),
    createP2pSsvProxy: fun("0x2794e08d", "createP2pSsvProxy(address)", {"_feeDistributorInstance": p.address}, p.address),
    'depositEthAndRegisterValidators((bytes[],bytes32[]),address,((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))': fun("0x7860180e", "depositEthAndRegisterValidators((bytes[],bytes32[]),address,((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))", {"_depositData": p.struct({"signatures": p.array(p.bytes), "depositDataRoots": p.array(p.bytes32)}), "_withdrawalCredentialsAddress": p.address, "_ssvPayload": p.struct({"ssvOperators": p.array(p.struct({"owner": p.address, "id": p.uint64, "snapshot": p.bytes32, "fee": p.uint256})), "ssvValidators": p.array(p.struct({"pubkey": p.bytes, "sharesData": p.bytes})), "cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256}), "tokenAmount": p.uint256, "ssvSlot0": p.bytes32}), "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    'depositEthAndRegisterValidators((bytes[],bytes32[]),address,address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))': fun("0xfadea089", "depositEthAndRegisterValidators((bytes[],bytes32[]),address,address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))", {"_depositData": p.struct({"signatures": p.array(p.bytes), "depositDataRoots": p.array(p.bytes32)}), "_withdrawalCredentialsAddress": p.address, "_operatorOwners": p.array(p.address), "_operatorIds": p.array(p.uint64), "_publicKeys": p.array(p.bytes), "_sharesData": p.array(p.bytes), "_amount": p.uint256, "_cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256}), "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    depositToSSV: fun("0x4a2c5799", "depositToSSV(address,uint256,uint64[],(uint32,uint64,uint64,bool,uint256))", {"_clusterOwner": p.address, "_tokenAmount": p.uint256, "_operatorIds": p.array(p.uint64), "_cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256})}, ),
    dismissOperator: fun("0xb83802f5", "dismissOperator()", {}, ),
    getAllClientP2pSsvProxies: viewFun("0x311a3c17", "getAllClientP2pSsvProxies(address)", {"_client": p.address}, p.array(p.address)),
    getAllP2pSsvProxies: viewFun("0xf1652155", "getAllP2pSsvProxies()", {}, p.array(p.address)),
    getAllowedSsvOperatorIds: viewFun("0xcfbe2e78", "getAllowedSsvOperatorIds(address)", {"_ssvOperatorOwner": p.address}, p.fixedSizeArray(p.uint64, 24)),
    getAllowedSsvOperatorOwners: viewFun("0x166effcf", "getAllowedSsvOperatorOwners()", {}, p.array(p.address)),
    getFeeDistributorFactory: viewFun("0xf8b442cc", "getFeeDistributorFactory()", {}, p.address),
    getMaxSsvTokenAmountPerValidator: viewFun("0x9473d869", "getMaxSsvTokenAmountPerValidator()", {}, p.uint112),
    getNeededAmountOfEtherToCoverSsvFees: viewFun("0x542d9108", "getNeededAmountOfEtherToCoverSsvFees(uint256)", {"_tokenAmount": p.uint256}, p.uint256),
    getReferenceFeeDistributor: viewFun("0x7c8c9f2e", "getReferenceFeeDistributor()", {}, p.address),
    getReferenceP2pSsvProxy: viewFun("0x5a8c880e", "getReferenceP2pSsvProxy()", {}, p.address),
    getSsvPerEthExchangeRateDividedByWei: viewFun("0xea1f7373", "getSsvPerEthExchangeRateDividedByWei()", {}, p.uint112),
    isClientSelectorAllowed: viewFun("0xb214a7c5", "isClientSelectorAllowed(bytes4)", {"_selector": p.bytes4}, p.bool),
    isOperatorSelectorAllowed: viewFun("0xb9e6b12b", "isOperatorSelectorAllowed(bytes4)", {"_selector": p.bytes4}, p.bool),
    isWhitelisted: viewFun("0x830639ac", "isWhitelisted(address,uint256)", {"account": p.address, "_1": p.uint256}, p.bool),
    makeBeaconDepositsAndRegisterValidators: fun("0x6a5333fe", "makeBeaconDepositsAndRegisterValidators(bytes32,uint96,address,(bytes[],bytes32[]),uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256))", {"_eth2WithdrawalCredentials": p.bytes32, "_ethAmountPerValidatorInWei": p.uint96, "_feeDistributorInstance": p.address, "_depositData": p.struct({"signatures": p.array(p.bytes), "depositDataRoots": p.array(p.bytes32)}), "_operatorIds": p.array(p.uint64), "_publicKeys": p.array(p.bytes), "_sharesData": p.array(p.bytes), "_amount": p.uint256, "_cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256})}, p.address),
    operator: viewFun("0x570ca735", "operator()", {}, p.address),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pendingOwner: viewFun("0xe30c3978", "pendingOwner()", {}, p.address),
    'predictP2pSsvProxyAddress((uint96,address))': viewFun("0x0b18a62c", "predictP2pSsvProxyAddress((uint96,address))", {"_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    'predictP2pSsvProxyAddress((uint96,address),(uint96,address))': viewFun("0x3dfac754", "predictP2pSsvProxyAddress((uint96,address),(uint96,address))", {"_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    'predictP2pSsvProxyAddress(address)': viewFun("0x696e5fc3", "predictP2pSsvProxyAddress(address)", {"_feeDistributorInstance": p.address}, p.address),
    'predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))': viewFun("0xc6fc49d7", "predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))", {"_referenceFeeDistributor": p.address, "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    'registerValidators(((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))': fun("0x085d6e42", "registerValidators(((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))", {"_ssvPayload": p.struct({"ssvOperators": p.array(p.struct({"owner": p.address, "id": p.uint64, "snapshot": p.bytes32, "fee": p.uint256})), "ssvValidators": p.array(p.struct({"pubkey": p.bytes, "sharesData": p.bytes})), "cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256}), "tokenAmount": p.uint256, "ssvSlot0": p.bytes32}), "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    'registerValidators(address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))': fun("0x3c028324", "registerValidators(address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))", {"_operatorOwners": p.array(p.address), "_operatorIds": p.array(p.uint64), "_publicKeys": p.array(p.bytes), "_sharesData": p.array(p.bytes), "_amount": p.uint256, "_cluster": p.struct({"validatorCount": p.uint32, "networkFeeIndex": p.uint64, "index": p.uint64, "active": p.bool, "balance": p.uint256}), "_clientConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address}), "_referrerConfig": p.struct({"basisPoints": p.uint96, "recipient": p.address})}, p.address),
    removeAllowedSelectorsForClient: fun("0xd444b75c", "removeAllowedSelectorsForClient(bytes4[])", {"_selectors": p.array(p.bytes4)}, ),
    removeAllowedSelectorsForOperator: fun("0x43457640", "removeAllowedSelectorsForOperator(bytes4[])", {"_selectors": p.array(p.bytes4)}, ),
    removeAllowedSsvOperatorOwners: fun("0x2630ba94", "removeAllowedSsvOperatorOwners(address[])", {"_allowedSsvOperatorOwnersToRemove": p.array(p.address)}, ),
    setAllowedSelectorsForClient: fun("0x4d5b4881", "setAllowedSelectorsForClient(bytes4[])", {"_selectors": p.array(p.bytes4)}, ),
    setAllowedSelectorsForOperator: fun("0x47e66774", "setAllowedSelectorsForOperator(bytes4[])", {"_selectors": p.array(p.bytes4)}, ),
    setAllowedSsvOperatorOwners: fun("0x95031908", "setAllowedSsvOperatorOwners(address[])", {"_allowedSsvOperatorOwners": p.array(p.address)}, ),
    setMaxSsvTokenAmountPerValidator: fun("0xe4eecb3d", "setMaxSsvTokenAmountPerValidator(uint112)", {"_maxSsvTokenAmountPerValidator": p.uint112}, ),
    setReferenceFeeDistributor: fun("0x7f01a0f8", "setReferenceFeeDistributor(address)", {"_referenceFeeDistributor": p.address}, ),
    setReferenceP2pSsvProxy: fun("0x72616d37", "setReferenceP2pSsvProxy(address)", {"_referenceP2pSsvProxy": p.address}, ),
    'setSsvOperatorIds(uint64[24])': fun("0x14a06adf", "setSsvOperatorIds(uint64[24])", {"_operatorIds": p.fixedSizeArray(p.uint64, 24)}, ),
    'setSsvOperatorIds(uint64[24],address)': fun("0x92628751", "setSsvOperatorIds(uint64[24],address)", {"_operatorIds": p.fixedSizeArray(p.uint64, 24), "_ssvOperatorOwner": p.address}, ),
    setSsvPerEthExchangeRateDividedByWei: fun("0x7e1e221b", "setSsvPerEthExchangeRateDividedByWei(uint112)", {"_ssvPerEthExchangeRateDividedByWei": p.uint112}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    transferERC1155: fun("0xdbecc616", "transferERC1155(address,address,uint256,uint256,bytes)", {"_token": p.address, "_recipient": p.address, "_tokenId": p.uint256, "_amount": p.uint256, "_data": p.bytes}, ),
    transferERC20: fun("0x9db5dbe4", "transferERC20(address,address,uint256)", {"_token": p.address, "_recipient": p.address, "_amount": p.uint256}, ),
    transferERC721: fun("0x1aca6376", "transferERC721(address,address,uint256)", {"_token": p.address, "_recipient": p.address, "_tokenId": p.uint256}, ),
    transferEther: fun("0x05b1137b", "transferEther(address,uint256)", {"_recipient": p.address, "_amount": p.uint256}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
}

export class Contract extends ContractBase {

    getAllClientP2pSsvProxies(_client: GetAllClientP2pSsvProxiesParams["_client"]) {
        return this.eth_call(functions.getAllClientP2pSsvProxies, {_client})
    }

    getAllP2pSsvProxies() {
        return this.eth_call(functions.getAllP2pSsvProxies, {})
    }

    getAllowedSsvOperatorIds(_ssvOperatorOwner: GetAllowedSsvOperatorIdsParams["_ssvOperatorOwner"]) {
        return this.eth_call(functions.getAllowedSsvOperatorIds, {_ssvOperatorOwner})
    }

    getAllowedSsvOperatorOwners() {
        return this.eth_call(functions.getAllowedSsvOperatorOwners, {})
    }

    getFeeDistributorFactory() {
        return this.eth_call(functions.getFeeDistributorFactory, {})
    }

    getMaxSsvTokenAmountPerValidator() {
        return this.eth_call(functions.getMaxSsvTokenAmountPerValidator, {})
    }

    getNeededAmountOfEtherToCoverSsvFees(_tokenAmount: GetNeededAmountOfEtherToCoverSsvFeesParams["_tokenAmount"]) {
        return this.eth_call(functions.getNeededAmountOfEtherToCoverSsvFees, {_tokenAmount})
    }

    getReferenceFeeDistributor() {
        return this.eth_call(functions.getReferenceFeeDistributor, {})
    }

    getReferenceP2pSsvProxy() {
        return this.eth_call(functions.getReferenceP2pSsvProxy, {})
    }

    getSsvPerEthExchangeRateDividedByWei() {
        return this.eth_call(functions.getSsvPerEthExchangeRateDividedByWei, {})
    }

    isClientSelectorAllowed(_selector: IsClientSelectorAllowedParams["_selector"]) {
        return this.eth_call(functions.isClientSelectorAllowed, {_selector})
    }

    isOperatorSelectorAllowed(_selector: IsOperatorSelectorAllowedParams["_selector"]) {
        return this.eth_call(functions.isOperatorSelectorAllowed, {_selector})
    }

    isWhitelisted(account: IsWhitelistedParams["account"], _1: IsWhitelistedParams["_1"]) {
        return this.eth_call(functions.isWhitelisted, {account, _1})
    }

    operator() {
        return this.eth_call(functions.operator, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    'predictP2pSsvProxyAddress((uint96,address))'(_clientConfig: PredictP2pSsvProxyAddressParams_0["_clientConfig"]) {
        return this.eth_call(functions['predictP2pSsvProxyAddress((uint96,address))'], {_clientConfig})
    }

    'predictP2pSsvProxyAddress((uint96,address),(uint96,address))'(_clientConfig: PredictP2pSsvProxyAddressParams_1["_clientConfig"], _referrerConfig: PredictP2pSsvProxyAddressParams_1["_referrerConfig"]) {
        return this.eth_call(functions['predictP2pSsvProxyAddress((uint96,address),(uint96,address))'], {_clientConfig, _referrerConfig})
    }

    'predictP2pSsvProxyAddress(address)'(_feeDistributorInstance: PredictP2pSsvProxyAddressParams_2["_feeDistributorInstance"]) {
        return this.eth_call(functions['predictP2pSsvProxyAddress(address)'], {_feeDistributorInstance})
    }

    'predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))'(_referenceFeeDistributor: PredictP2pSsvProxyAddressParams_3["_referenceFeeDistributor"], _clientConfig: PredictP2pSsvProxyAddressParams_3["_clientConfig"], _referrerConfig: PredictP2pSsvProxyAddressParams_3["_referrerConfig"]) {
        return this.eth_call(functions['predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))'], {_referenceFeeDistributor, _clientConfig, _referrerConfig})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }
}

/// Event types
export type ERC1155TransferredEventArgs = EParams<typeof events.ERC1155Transferred>
export type ERC20TransferredEventArgs = EParams<typeof events.ERC20Transferred>
export type ERC721TransferredEventArgs = EParams<typeof events.ERC721Transferred>
export type EtherTransferredEventArgs = EParams<typeof events.EtherTransferred>
export type OperatorChangedEventArgs = EParams<typeof events.OperatorChanged>
export type OwnershipTransferStartedEventArgs = EParams<typeof events.OwnershipTransferStarted>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type P2pSsvProxyFactory__AllowedSelectorsForClientRemovedEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSelectorsForClientRemoved>
export type P2pSsvProxyFactory__AllowedSelectorsForClientSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSelectorsForClientSet>
export type P2pSsvProxyFactory__AllowedSelectorsForOperatorRemovedEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSelectorsForOperatorRemoved>
export type P2pSsvProxyFactory__AllowedSelectorsForOperatorSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSelectorsForOperatorSet>
export type P2pSsvProxyFactory__AllowedSsvOperatorOwnersRemovedEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSsvOperatorOwnersRemoved>
export type P2pSsvProxyFactory__AllowedSsvOperatorOwnersSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__AllowedSsvOperatorOwnersSet>
export type P2pSsvProxyFactory__EthForSsvStakingDepositedEventArgs = EParams<typeof events.P2pSsvProxyFactory__EthForSsvStakingDeposited>
export type P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorSet>
export type P2pSsvProxyFactory__P2pSsvProxyCreatedEventArgs = EParams<typeof events.P2pSsvProxyFactory__P2pSsvProxyCreated>
export type P2pSsvProxyFactory__ReferenceFeeDistributorSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__ReferenceFeeDistributorSet>
export type P2pSsvProxyFactory__ReferenceP2pSsvProxySetEventArgs = EParams<typeof events.P2pSsvProxyFactory__ReferenceP2pSsvProxySet>
export type P2pSsvProxyFactory__RegistrationCompletedEventArgs = EParams<typeof events.P2pSsvProxyFactory__RegistrationCompleted>
export type P2pSsvProxyFactory__SsvOperatorIdsClearedEventArgs = EParams<typeof events.P2pSsvProxyFactory__SsvOperatorIdsCleared>
export type P2pSsvProxyFactory__SsvOperatorIdsSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__SsvOperatorIdsSet>
export type P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiSetEventArgs = EParams<typeof events.P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiSet>

/// Function types
export type AcceptOwnershipParams = FunctionArguments<typeof functions.acceptOwnership>
export type AcceptOwnershipReturn = FunctionReturn<typeof functions.acceptOwnership>

export type AddEthParams = FunctionArguments<typeof functions.addEth>
export type AddEthReturn = FunctionReturn<typeof functions.addEth>

export type ChangeOperatorParams = FunctionArguments<typeof functions.changeOperator>
export type ChangeOperatorReturn = FunctionReturn<typeof functions.changeOperator>

export type CheckOperatorOrOwnerParams = FunctionArguments<typeof functions.checkOperatorOrOwner>
export type CheckOperatorOrOwnerReturn = FunctionReturn<typeof functions.checkOperatorOrOwner>

export type ClearSsvOperatorIdsParams_0 = FunctionArguments<typeof functions['clearSsvOperatorIds(address)']>
export type ClearSsvOperatorIdsReturn_0 = FunctionReturn<typeof functions['clearSsvOperatorIds(address)']>

export type ClearSsvOperatorIdsParams_1 = FunctionArguments<typeof functions['clearSsvOperatorIds()']>
export type ClearSsvOperatorIdsReturn_1 = FunctionReturn<typeof functions['clearSsvOperatorIds()']>

export type CreateP2pSsvProxyParams = FunctionArguments<typeof functions.createP2pSsvProxy>
export type CreateP2pSsvProxyReturn = FunctionReturn<typeof functions.createP2pSsvProxy>

export type DepositEthAndRegisterValidatorsParams_0 = FunctionArguments<typeof functions['depositEthAndRegisterValidators((bytes[],bytes32[]),address,((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))']>
export type DepositEthAndRegisterValidatorsReturn_0 = FunctionReturn<typeof functions['depositEthAndRegisterValidators((bytes[],bytes32[]),address,((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))']>

export type DepositEthAndRegisterValidatorsParams_1 = FunctionArguments<typeof functions['depositEthAndRegisterValidators((bytes[],bytes32[]),address,address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))']>
export type DepositEthAndRegisterValidatorsReturn_1 = FunctionReturn<typeof functions['depositEthAndRegisterValidators((bytes[],bytes32[]),address,address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))']>

export type DepositToSSVParams = FunctionArguments<typeof functions.depositToSSV>
export type DepositToSSVReturn = FunctionReturn<typeof functions.depositToSSV>

export type DismissOperatorParams = FunctionArguments<typeof functions.dismissOperator>
export type DismissOperatorReturn = FunctionReturn<typeof functions.dismissOperator>

export type GetAllClientP2pSsvProxiesParams = FunctionArguments<typeof functions.getAllClientP2pSsvProxies>
export type GetAllClientP2pSsvProxiesReturn = FunctionReturn<typeof functions.getAllClientP2pSsvProxies>

export type GetAllP2pSsvProxiesParams = FunctionArguments<typeof functions.getAllP2pSsvProxies>
export type GetAllP2pSsvProxiesReturn = FunctionReturn<typeof functions.getAllP2pSsvProxies>

export type GetAllowedSsvOperatorIdsParams = FunctionArguments<typeof functions.getAllowedSsvOperatorIds>
export type GetAllowedSsvOperatorIdsReturn = FunctionReturn<typeof functions.getAllowedSsvOperatorIds>

export type GetAllowedSsvOperatorOwnersParams = FunctionArguments<typeof functions.getAllowedSsvOperatorOwners>
export type GetAllowedSsvOperatorOwnersReturn = FunctionReturn<typeof functions.getAllowedSsvOperatorOwners>

export type GetFeeDistributorFactoryParams = FunctionArguments<typeof functions.getFeeDistributorFactory>
export type GetFeeDistributorFactoryReturn = FunctionReturn<typeof functions.getFeeDistributorFactory>

export type GetMaxSsvTokenAmountPerValidatorParams = FunctionArguments<typeof functions.getMaxSsvTokenAmountPerValidator>
export type GetMaxSsvTokenAmountPerValidatorReturn = FunctionReturn<typeof functions.getMaxSsvTokenAmountPerValidator>

export type GetNeededAmountOfEtherToCoverSsvFeesParams = FunctionArguments<typeof functions.getNeededAmountOfEtherToCoverSsvFees>
export type GetNeededAmountOfEtherToCoverSsvFeesReturn = FunctionReturn<typeof functions.getNeededAmountOfEtherToCoverSsvFees>

export type GetReferenceFeeDistributorParams = FunctionArguments<typeof functions.getReferenceFeeDistributor>
export type GetReferenceFeeDistributorReturn = FunctionReturn<typeof functions.getReferenceFeeDistributor>

export type GetReferenceP2pSsvProxyParams = FunctionArguments<typeof functions.getReferenceP2pSsvProxy>
export type GetReferenceP2pSsvProxyReturn = FunctionReturn<typeof functions.getReferenceP2pSsvProxy>

export type GetSsvPerEthExchangeRateDividedByWeiParams = FunctionArguments<typeof functions.getSsvPerEthExchangeRateDividedByWei>
export type GetSsvPerEthExchangeRateDividedByWeiReturn = FunctionReturn<typeof functions.getSsvPerEthExchangeRateDividedByWei>

export type IsClientSelectorAllowedParams = FunctionArguments<typeof functions.isClientSelectorAllowed>
export type IsClientSelectorAllowedReturn = FunctionReturn<typeof functions.isClientSelectorAllowed>

export type IsOperatorSelectorAllowedParams = FunctionArguments<typeof functions.isOperatorSelectorAllowed>
export type IsOperatorSelectorAllowedReturn = FunctionReturn<typeof functions.isOperatorSelectorAllowed>

export type IsWhitelistedParams = FunctionArguments<typeof functions.isWhitelisted>
export type IsWhitelistedReturn = FunctionReturn<typeof functions.isWhitelisted>

export type MakeBeaconDepositsAndRegisterValidatorsParams = FunctionArguments<typeof functions.makeBeaconDepositsAndRegisterValidators>
export type MakeBeaconDepositsAndRegisterValidatorsReturn = FunctionReturn<typeof functions.makeBeaconDepositsAndRegisterValidators>

export type OperatorParams = FunctionArguments<typeof functions.operator>
export type OperatorReturn = FunctionReturn<typeof functions.operator>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type PredictP2pSsvProxyAddressParams_0 = FunctionArguments<typeof functions['predictP2pSsvProxyAddress((uint96,address))']>
export type PredictP2pSsvProxyAddressReturn_0 = FunctionReturn<typeof functions['predictP2pSsvProxyAddress((uint96,address))']>

export type PredictP2pSsvProxyAddressParams_1 = FunctionArguments<typeof functions['predictP2pSsvProxyAddress((uint96,address),(uint96,address))']>
export type PredictP2pSsvProxyAddressReturn_1 = FunctionReturn<typeof functions['predictP2pSsvProxyAddress((uint96,address),(uint96,address))']>

export type PredictP2pSsvProxyAddressParams_2 = FunctionArguments<typeof functions['predictP2pSsvProxyAddress(address)']>
export type PredictP2pSsvProxyAddressReturn_2 = FunctionReturn<typeof functions['predictP2pSsvProxyAddress(address)']>

export type PredictP2pSsvProxyAddressParams_3 = FunctionArguments<typeof functions['predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))']>
export type PredictP2pSsvProxyAddressReturn_3 = FunctionReturn<typeof functions['predictP2pSsvProxyAddress(address,(uint96,address),(uint96,address))']>

export type RegisterValidatorsParams_0 = FunctionArguments<typeof functions['registerValidators(((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))']>
export type RegisterValidatorsReturn_0 = FunctionReturn<typeof functions['registerValidators(((address,uint64,bytes32,uint256)[],(bytes,bytes)[],(uint32,uint64,uint64,bool,uint256),uint256,bytes32),(uint96,address),(uint96,address))']>

export type RegisterValidatorsParams_1 = FunctionArguments<typeof functions['registerValidators(address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))']>
export type RegisterValidatorsReturn_1 = FunctionReturn<typeof functions['registerValidators(address[],uint64[],bytes[],bytes[],uint256,(uint32,uint64,uint64,bool,uint256),(uint96,address),(uint96,address))']>

export type RemoveAllowedSelectorsForClientParams = FunctionArguments<typeof functions.removeAllowedSelectorsForClient>
export type RemoveAllowedSelectorsForClientReturn = FunctionReturn<typeof functions.removeAllowedSelectorsForClient>

export type RemoveAllowedSelectorsForOperatorParams = FunctionArguments<typeof functions.removeAllowedSelectorsForOperator>
export type RemoveAllowedSelectorsForOperatorReturn = FunctionReturn<typeof functions.removeAllowedSelectorsForOperator>

export type RemoveAllowedSsvOperatorOwnersParams = FunctionArguments<typeof functions.removeAllowedSsvOperatorOwners>
export type RemoveAllowedSsvOperatorOwnersReturn = FunctionReturn<typeof functions.removeAllowedSsvOperatorOwners>

export type SetAllowedSelectorsForClientParams = FunctionArguments<typeof functions.setAllowedSelectorsForClient>
export type SetAllowedSelectorsForClientReturn = FunctionReturn<typeof functions.setAllowedSelectorsForClient>

export type SetAllowedSelectorsForOperatorParams = FunctionArguments<typeof functions.setAllowedSelectorsForOperator>
export type SetAllowedSelectorsForOperatorReturn = FunctionReturn<typeof functions.setAllowedSelectorsForOperator>

export type SetAllowedSsvOperatorOwnersParams = FunctionArguments<typeof functions.setAllowedSsvOperatorOwners>
export type SetAllowedSsvOperatorOwnersReturn = FunctionReturn<typeof functions.setAllowedSsvOperatorOwners>

export type SetMaxSsvTokenAmountPerValidatorParams = FunctionArguments<typeof functions.setMaxSsvTokenAmountPerValidator>
export type SetMaxSsvTokenAmountPerValidatorReturn = FunctionReturn<typeof functions.setMaxSsvTokenAmountPerValidator>

export type SetReferenceFeeDistributorParams = FunctionArguments<typeof functions.setReferenceFeeDistributor>
export type SetReferenceFeeDistributorReturn = FunctionReturn<typeof functions.setReferenceFeeDistributor>

export type SetReferenceP2pSsvProxyParams = FunctionArguments<typeof functions.setReferenceP2pSsvProxy>
export type SetReferenceP2pSsvProxyReturn = FunctionReturn<typeof functions.setReferenceP2pSsvProxy>

export type SetSsvOperatorIdsParams_0 = FunctionArguments<typeof functions['setSsvOperatorIds(uint64[24])']>
export type SetSsvOperatorIdsReturn_0 = FunctionReturn<typeof functions['setSsvOperatorIds(uint64[24])']>

export type SetSsvOperatorIdsParams_1 = FunctionArguments<typeof functions['setSsvOperatorIds(uint64[24],address)']>
export type SetSsvOperatorIdsReturn_1 = FunctionReturn<typeof functions['setSsvOperatorIds(uint64[24],address)']>

export type SetSsvPerEthExchangeRateDividedByWeiParams = FunctionArguments<typeof functions.setSsvPerEthExchangeRateDividedByWei>
export type SetSsvPerEthExchangeRateDividedByWeiReturn = FunctionReturn<typeof functions.setSsvPerEthExchangeRateDividedByWei>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type TransferERC1155Params = FunctionArguments<typeof functions.transferERC1155>
export type TransferERC1155Return = FunctionReturn<typeof functions.transferERC1155>

export type TransferERC20Params = FunctionArguments<typeof functions.transferERC20>
export type TransferERC20Return = FunctionReturn<typeof functions.transferERC20>

export type TransferERC721Params = FunctionArguments<typeof functions.transferERC721>
export type TransferERC721Return = FunctionReturn<typeof functions.transferERC721>

export type TransferEtherParams = FunctionArguments<typeof functions.transferEther>
export type TransferEtherReturn = FunctionReturn<typeof functions.transferEther>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

