import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import {
  AgeAdd,
  ChangeUser, HelloWorld
} from "../generated/HelloWorld/HelloWorld";
import { ExampleEntity } from "../generated/schema";

export function handleAgeAdd(event: AgeAdd): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  console.log("Address");
  let HelloWorld_contract = HelloWorld.bind(Address.fromString("0xBFC050DE77eCE595197a532A3E11759022b8cbEC"))
  log.info("name {}", [HelloWorld_contract.name()])
  log.info("age {}", ["" + HelloWorld_contract.age()])


  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sender = event.params.sender
  entity.afterAge = event.params.afterAge

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.age(...)
  // - contract.name(...)
}

export function handleChangeUser(event: ChangeUser): void { }
