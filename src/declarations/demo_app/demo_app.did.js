export const idlFactory = ({ IDL }) => {
  const ItemId = IDL.Nat;
  const ItemId__1 = IDL.Nat;
  const Item = IDL.Record({
    'id' : ItemId__1,
    'content' : IDL.Text,
    'date' : IDL.Text,
    'category' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const NewItem = IDL.Record({
    'content' : IDL.Text,
    'date' : IDL.Text,
    'category' : IDL.Text,
    'amount' : IDL.Nat,
  });
  return IDL.Service({
    'delete' : IDL.Func([ItemId, Item], [], []),
    'getItem' : IDL.Func([ItemId], [IDL.Opt(Item)], ['query']),
    'length' : IDL.Func([], [IDL.Nat], ['query']),
    'new' : IDL.Func([NewItem], [], []),
    'update' : IDL.Func([ItemId, Item], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
