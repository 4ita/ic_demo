import L "mo:base/List";
import A "mo:base/AssocList";
import Types "./types";

actor DemoApp {

  type NewItem = Types.NewItem;
  type Item = Types.Item;
  type ItemId = Types.ItemId;

  stable var newItemId: Nat = 1;

  // The actor maps itemId to Item.
  flexible var accountBook: A.AssocList<ItemId, Item> = L.nil<(ItemId, Item)>();

  // An auxiliary function checks whether two items are equal.
  func isEq(l: ItemId, r: ItemId): Bool {
      return l == r;
  };

  public func new(newItem: NewItem) : async () {
    let item = {
      id = newItemId;
      date = newItem.date;
      category = newItem.category;
      content = newItem.content;
      amount = newItem.amount;
    };

    let (newAccountBook, _) = A.replace<ItemId, Item>(accountBook, newItemId, isEq, ?item);
    accountBook := newAccountBook;
    newItemId += 1;
  };

  // A shared invokable function that inserts a new entry
  // into the account book or replaces the previous one.
  public func update(itemId: ItemId, item: Item) : async () {
    let (newAccountBook, _) = A.replace<ItemId, Item>(accountBook, itemId, isEq, ?item);
    accountBook := newAccountBook;
  };
  
  public func delete(itemId: ItemId, item: Item) : async () {
    let tmpAccountBook: A.AssocList<ItemId, Item> = L.nil<(ItemId, Item)>();
    let (newAccountBook, _) = A.replace<ItemId, Item>(tmpAccountBook, itemId, isEq, ?item);
    accountBook := A.diff<ItemId, Item, Item>(accountBook, newAccountBook, isEq);
  };

  // A shared read-only query function that returns the (optional)
  // item corresponding to the person with the given itemId.
  public query func getItem(itemId: ItemId) : async ?Item {
    return A.find<ItemId, Item>(accountBook, itemId, isEq);
  };

  public query func length() : async Nat {
    newItemId - 1;
  };
};
