// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get oldOwner_(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner_(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TransferBatch extends ethereum.Event {
  get params(): TransferBatch__Params {
    return new TransferBatch__Params(this);
  }
}

export class TransferBatch__Params {
  _event: TransferBatch;

  constructor(event: TransferBatch) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get values(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class TransferSingle extends ethereum.Event {
  get params(): TransferSingle__Params {
    return new TransferSingle__Params(this);
  }
}

export class TransferSingle__Params {
  _event: TransferSingle;

  constructor(event: TransferSingle) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get value(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class URI extends ethereum.Event {
  get params(): URI__Params {
    return new URI__Params(this);
  }
}

export class URI__Params {
  _event: URI;

  constructor(event: URI) {
    this._event = event;
  }

  get value(): string {
    return this._event.parameters[0].value.toString();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ToastContract extends ethereum.SmartContract {
  static bind(address: Address): ToastContract {
    return new ToastContract("ToastContract", address);
  }

  adminAddresses(param0: BigInt): Address {
    let result = super.call(
      "adminAddresses",
      "adminAddresses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_adminAddresses(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "adminAddresses",
      "adminAddresses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  balanceOf(account: Address, id: BigInt): BigInt {
    let result = super.call(
      "balanceOf",
      "balanceOf(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(account),
        ethereum.Value.fromUnsignedBigInt(id)
      ]
    );

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address, id: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "balanceOf",
      "balanceOf(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(account),
        ethereum.Value.fromUnsignedBigInt(id)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOfBatch(accounts: Array<Address>, ids: Array<BigInt>): Array<BigInt> {
    let result = super.call(
      "balanceOfBatch",
      "balanceOfBatch(address[],uint256[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(accounts),
        ethereum.Value.fromUnsignedBigIntArray(ids)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_balanceOfBatch(
    accounts: Array<Address>,
    ids: Array<BigInt>
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "balanceOfBatch",
      "balanceOfBatch(address[],uint256[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(accounts),
        ethereum.Value.fromUnsignedBigIntArray(ids)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  exists(id: BigInt): boolean {
    let result = super.call("exists", "exists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(id)
    ]);

    return result[0].toBoolean();
  }

  try_exists(id: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("exists", "exists(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(id)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTokenCost(tokenId_: BigInt): BigInt {
    let result = super.call("getTokenCost", "getTokenCost(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    ]);

    return result[0].toBigInt();
  }

  try_getTokenCost(tokenId_: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenCost",
      "getTokenCost(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenCurrentSupply(tokenId_: BigInt): BigInt {
    let result = super.call(
      "getTokenCurrentSupply",
      "getTokenCurrentSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );

    return result[0].toBigInt();
  }

  try_getTokenCurrentSupply(tokenId_: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenCurrentSupply",
      "getTokenCurrentSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenMaxSupply(tokenId_: BigInt): BigInt {
    let result = super.call(
      "getTokenMaxSupply",
      "getTokenMaxSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );

    return result[0].toBigInt();
  }

  try_getTokenMaxSupply(tokenId_: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenMaxSupply",
      "getTokenMaxSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isAdmin(_user: Address): boolean {
    let result = super.call("isAdmin", "isAdmin(address):(bool)", [
      ethereum.Value.fromAddress(_user)
    ]);

    return result[0].toBoolean();
  }

  try_isAdmin(_user: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isAdmin", "isAdmin(address):(bool)", [
      ethereum.Value.fromAddress(_user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(account: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [
        ethereum.Value.fromAddress(account),
        ethereum.Value.fromAddress(operator)
      ]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    account: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [
        ethereum.Value.fromAddress(account),
        ethereum.Value.fromAddress(operator)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  onlyAdmins(): boolean {
    let result = super.call("onlyAdmins", "onlyAdmins():(bool)", []);

    return result[0].toBoolean();
  }

  try_onlyAdmins(): ethereum.CallResult<boolean> {
    let result = super.tryCall("onlyAdmins", "onlyAdmins():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURIOption(): BigInt {
    let result = super.call("tokenURIOption", "tokenURIOption():(uint256)", []);

    return result[0].toBigInt();
  }

  try_tokenURIOption(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenURIOption",
      "tokenURIOption():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalSupply(id: BigInt): BigInt {
    let result = super.call("totalSupply", "totalSupply(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(id)
    ]);

    return result[0].toBigInt();
  }

  try_totalSupply(id: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalSupply",
      "totalSupply(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  uri(tokenId_: BigInt): string {
    let result = super.call("uri", "uri(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    ]);

    return result[0].toString();
  }

  try_uri(tokenId_: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("uri", "uri(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }
}

export class BurnBatchCall extends ethereum.Call {
  get inputs(): BurnBatchCall__Inputs {
    return new BurnBatchCall__Inputs(this);
  }

  get outputs(): BurnBatchCall__Outputs {
    return new BurnBatchCall__Outputs(this);
  }
}

export class BurnBatchCall__Inputs {
  _call: BurnBatchCall;

  constructor(call: BurnBatchCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get values(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }
}

export class BurnBatchCall__Outputs {
  _call: BurnBatchCall;

  constructor(call: BurnBatchCall) {
    this._call = call;
  }
}

export class CreateAdminListCall extends ethereum.Call {
  get inputs(): CreateAdminListCall__Inputs {
    return new CreateAdminListCall__Inputs(this);
  }

  get outputs(): CreateAdminListCall__Outputs {
    return new CreateAdminListCall__Outputs(this);
  }
}

export class CreateAdminListCall__Inputs {
  _call: CreateAdminListCall;

  constructor(call: CreateAdminListCall) {
    this._call = call;
  }

  get _users(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class CreateAdminListCall__Outputs {
  _call: CreateAdminListCall;

  constructor(call: CreateAdminListCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeBatchTransferFromCall extends ethereum.Call {
  get inputs(): SafeBatchTransferFromCall__Inputs {
    return new SafeBatchTransferFromCall__Inputs(this);
  }

  get outputs(): SafeBatchTransferFromCall__Outputs {
    return new SafeBatchTransferFromCall__Outputs(this);
  }
}

export class SafeBatchTransferFromCall__Inputs {
  _call: SafeBatchTransferFromCall;

  constructor(call: SafeBatchTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class SafeBatchTransferFromCall__Outputs {
  _call: SafeBatchTransferFromCall;

  constructor(call: SafeBatchTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get id(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetBaseTokenURICall extends ethereum.Call {
  get inputs(): SetBaseTokenURICall__Inputs {
    return new SetBaseTokenURICall__Inputs(this);
  }

  get outputs(): SetBaseTokenURICall__Outputs {
    return new SetBaseTokenURICall__Outputs(this);
  }
}

export class SetBaseTokenURICall__Inputs {
  _call: SetBaseTokenURICall;

  constructor(call: SetBaseTokenURICall) {
    this._call = call;
  }

  get uri_(): string {
    return this._call.inputValues[0].value.toString();
  }

  get ext_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetBaseTokenURICall__Outputs {
  _call: SetBaseTokenURICall;

  constructor(call: SetBaseTokenURICall) {
    this._call = call;
  }
}

export class SetNameAndSymbolCall extends ethereum.Call {
  get inputs(): SetNameAndSymbolCall__Inputs {
    return new SetNameAndSymbolCall__Inputs(this);
  }

  get outputs(): SetNameAndSymbolCall__Outputs {
    return new SetNameAndSymbolCall__Outputs(this);
  }
}

export class SetNameAndSymbolCall__Inputs {
  _call: SetNameAndSymbolCall;

  constructor(call: SetNameAndSymbolCall) {
    this._call = call;
  }

  get name_(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetNameAndSymbolCall__Outputs {
  _call: SetNameAndSymbolCall;

  constructor(call: SetNameAndSymbolCall) {
    this._call = call;
  }
}

export class SetTokenCostCall extends ethereum.Call {
  get inputs(): SetTokenCostCall__Inputs {
    return new SetTokenCostCall__Inputs(this);
  }

  get outputs(): SetTokenCostCall__Outputs {
    return new SetTokenCostCall__Outputs(this);
  }
}

export class SetTokenCostCall__Inputs {
  _call: SetTokenCostCall;

  constructor(call: SetTokenCostCall) {
    this._call = call;
  }

  get tokenId_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get cost_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetTokenCostCall__Outputs {
  _call: SetTokenCostCall;

  constructor(call: SetTokenCostCall) {
    this._call = call;
  }
}

export class SetTokenIdToTokenURICall extends ethereum.Call {
  get inputs(): SetTokenIdToTokenURICall__Inputs {
    return new SetTokenIdToTokenURICall__Inputs(this);
  }

  get outputs(): SetTokenIdToTokenURICall__Outputs {
    return new SetTokenIdToTokenURICall__Outputs(this);
  }
}

export class SetTokenIdToTokenURICall__Inputs {
  _call: SetTokenIdToTokenURICall;

  constructor(call: SetTokenIdToTokenURICall) {
    this._call = call;
  }

  get tokenId_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get uri_(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SetTokenIdToTokenURICall__Outputs {
  _call: SetTokenIdToTokenURICall;

  constructor(call: SetTokenIdToTokenURICall) {
    this._call = call;
  }
}

export class SetTokenMaxSupplyCall extends ethereum.Call {
  get inputs(): SetTokenMaxSupplyCall__Inputs {
    return new SetTokenMaxSupplyCall__Inputs(this);
  }

  get outputs(): SetTokenMaxSupplyCall__Outputs {
    return new SetTokenMaxSupplyCall__Outputs(this);
  }
}

export class SetTokenMaxSupplyCall__Inputs {
  _call: SetTokenMaxSupplyCall;

  constructor(call: SetTokenMaxSupplyCall) {
    this._call = call;
  }

  get tokenId_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get maxSupply_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetTokenMaxSupplyCall__Outputs {
  _call: SetTokenMaxSupplyCall;

  constructor(call: SetTokenMaxSupplyCall) {
    this._call = call;
  }
}

export class SetTokenURIOptionCall extends ethereum.Call {
  get inputs(): SetTokenURIOptionCall__Inputs {
    return new SetTokenURIOptionCall__Inputs(this);
  }

  get outputs(): SetTokenURIOptionCall__Outputs {
    return new SetTokenURIOptionCall__Outputs(this);
  }
}

export class SetTokenURIOptionCall__Inputs {
  _call: SetTokenURIOptionCall;

  constructor(call: SetTokenURIOptionCall) {
    this._call = call;
  }

  get option_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetTokenURIOptionCall__Outputs {
  _call: SetTokenURIOptionCall;

  constructor(call: SetTokenURIOptionCall) {
    this._call = call;
  }
}

export class SetUniversalBaseTokenURICall extends ethereum.Call {
  get inputs(): SetUniversalBaseTokenURICall__Inputs {
    return new SetUniversalBaseTokenURICall__Inputs(this);
  }

  get outputs(): SetUniversalBaseTokenURICall__Outputs {
    return new SetUniversalBaseTokenURICall__Outputs(this);
  }
}

export class SetUniversalBaseTokenURICall__Inputs {
  _call: SetUniversalBaseTokenURICall;

  constructor(call: SetUniversalBaseTokenURICall) {
    this._call = call;
  }

  get uri_(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetUniversalBaseTokenURICall__Outputs {
  _call: SetUniversalBaseTokenURICall;

  constructor(call: SetUniversalBaseTokenURICall) {
    this._call = call;
  }
}

export class ToastManyToManyCall extends ethereum.Call {
  get inputs(): ToastManyToManyCall__Inputs {
    return new ToastManyToManyCall__Inputs(this);
  }

  get outputs(): ToastManyToManyCall__Outputs {
    return new ToastManyToManyCall__Outputs(this);
  }
}

export class ToastManyToManyCall__Inputs {
  _call: ToastManyToManyCall;

  constructor(call: ToastManyToManyCall) {
    this._call = call;
  }

  get tos_(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get ids_(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get amounts_(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get data_(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ToastManyToManyCall__Outputs {
  _call: ToastManyToManyCall;

  constructor(call: ToastManyToManyCall) {
    this._call = call;
  }
}

export class ToastManyToSingleCall extends ethereum.Call {
  get inputs(): ToastManyToSingleCall__Inputs {
    return new ToastManyToSingleCall__Inputs(this);
  }

  get outputs(): ToastManyToSingleCall__Outputs {
    return new ToastManyToSingleCall__Outputs(this);
  }
}

export class ToastManyToSingleCall__Inputs {
  _call: ToastManyToSingleCall;

  constructor(call: ToastManyToSingleCall) {
    this._call = call;
  }

  get to_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get ids_(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get amounts_(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get data_(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ToastManyToSingleCall__Outputs {
  _call: ToastManyToSingleCall;

  constructor(call: ToastManyToSingleCall) {
    this._call = call;
  }
}

export class ToastSingleToManyCall extends ethereum.Call {
  get inputs(): ToastSingleToManyCall__Inputs {
    return new ToastSingleToManyCall__Inputs(this);
  }

  get outputs(): ToastSingleToManyCall__Outputs {
    return new ToastSingleToManyCall__Outputs(this);
  }
}

export class ToastSingleToManyCall__Inputs {
  _call: ToastSingleToManyCall;

  constructor(call: ToastSingleToManyCall) {
    this._call = call;
  }

  get tos_(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get id_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get amount_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data_(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ToastSingleToManyCall__Outputs {
  _call: ToastSingleToManyCall;

  constructor(call: ToastSingleToManyCall) {
    this._call = call;
  }
}

export class ToastSingleToSingleCall extends ethereum.Call {
  get inputs(): ToastSingleToSingleCall__Inputs {
    return new ToastSingleToSingleCall__Inputs(this);
  }

  get outputs(): ToastSingleToSingleCall__Outputs {
    return new ToastSingleToSingleCall__Outputs(this);
  }
}

export class ToastSingleToSingleCall__Inputs {
  _call: ToastSingleToSingleCall;

  constructor(call: ToastSingleToSingleCall) {
    this._call = call;
  }

  get to_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get id_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get amount_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data_(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class ToastSingleToSingleCall__Outputs {
  _call: ToastSingleToSingleCall;

  constructor(call: ToastSingleToSingleCall) {
    this._call = call;
  }
}

export class ToggleOnlyAdminsCall extends ethereum.Call {
  get inputs(): ToggleOnlyAdminsCall__Inputs {
    return new ToggleOnlyAdminsCall__Inputs(this);
  }

  get outputs(): ToggleOnlyAdminsCall__Outputs {
    return new ToggleOnlyAdminsCall__Outputs(this);
  }
}

export class ToggleOnlyAdminsCall__Inputs {
  _call: ToggleOnlyAdminsCall;

  constructor(call: ToggleOnlyAdminsCall) {
    this._call = call;
  }
}

export class ToggleOnlyAdminsCall__Outputs {
  _call: ToggleOnlyAdminsCall;

  constructor(call: ToggleOnlyAdminsCall) {
    this._call = call;
  }
}

export class TogglePauseCall extends ethereum.Call {
  get inputs(): TogglePauseCall__Inputs {
    return new TogglePauseCall__Inputs(this);
  }

  get outputs(): TogglePauseCall__Outputs {
    return new TogglePauseCall__Outputs(this);
  }
}

export class TogglePauseCall__Inputs {
  _call: TogglePauseCall;

  constructor(call: TogglePauseCall) {
    this._call = call;
  }
}

export class TogglePauseCall__Outputs {
  _call: TogglePauseCall;

  constructor(call: TogglePauseCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}