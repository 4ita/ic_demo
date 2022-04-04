import type { Principal } from '@dfinity/principal';
export interface Item {
  'id' : ItemId__1,
  'content' : string,
  'date' : string,
  'category' : string,
  'amount' : bigint,
}
export type ItemId = bigint;
export type ItemId__1 = bigint;
export interface NewItem {
  'content' : string,
  'date' : string,
  'category' : string,
  'amount' : bigint,
}
export interface _SERVICE {
  'delete' : (arg_0: ItemId, arg_1: Item) => Promise<undefined>,
  'getItem' : (arg_0: ItemId) => Promise<[] | [Item]>,
  'length' : () => Promise<bigint>,
  'new' : (arg_0: NewItem) => Promise<undefined>,
  'update' : (arg_0: ItemId, arg_1: Item) => Promise<undefined>,
}
