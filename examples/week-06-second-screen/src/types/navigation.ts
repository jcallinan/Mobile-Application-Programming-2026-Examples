export type HomeStackParamList = {
  Home: undefined;
  AboutModal: undefined;
};

export type ShoppingStackParamList = {
  ShoppingList: undefined;
  ShoppingItemDetails: { itemId: string };
};

export type RootTabParamList = {
  HomeStack: undefined;
  ShoppingStack: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AboutModal: undefined;
};
