import React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import DataList from "../../components/DataList";
import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import Customer from "../../models/Customer";

type drawerNavigatorProp = StackNavigationProp<
  RootStackParamList,
  "DrawerNavigator"
>;

export default function Customers() {
  const navigation = useNavigation<drawerNavigatorProp>();

  // const cliente: variavelCliente;

  async function loadData() {
    return [];
  }

  function onNew() {
    // navigation.navigate("ProductForm");
  }

  function onEdit() {}

  return (
    <DataList<Customer>
      loadData={loadData}
      buttonLabel="Novo Cliente"
      onPressNew={onNew}
      onPressEdit={onEdit}
      getRowText={(customer) => customer.getName()}
    />
  );
}
