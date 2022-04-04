module {
  public type ItemId = Nat;

  public type NewItem = {
    date: Text;
    category: Text;
    content: Text;
    amount: Nat;
  };

  public type Item = {
    id: ItemId;
    date: Text;
    category: Text;
    content: Text;
    amount: Nat;
  };
};
