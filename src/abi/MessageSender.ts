import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Message: event("0x5c0bf6ba470f83fe17f0b8fd9fdf4799eaeb1b63bbf39e4868fc7e0798e7abeb", "Message(address,string,string)", {"sender": indexed(p.address), "hash": indexed(p.string), "text": p.string}),
}

export const functions = {
    send: fun("0x66792ba1", "send(string)", {"text": p.string}, ),
}

export class Contract extends ContractBase {
}

/// Event types
export type MessageEventArgs = EParams<typeof events.Message>

/// Function types
export type SendParams = FunctionArguments<typeof functions.send>
export type SendReturn = FunctionReturn<typeof functions.send>

