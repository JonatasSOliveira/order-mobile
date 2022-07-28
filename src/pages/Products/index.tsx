import React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import DataList from "../../components/DataList";
import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import Product from "../../models/Product";

type drawerNavigatorProp = StackNavigationProp<
  RootStackParamList,
  "DrawerNavigator"
>;

export default function Products() {
  const navigation = useNavigation<drawerNavigatorProp>();

  async function loadData() {
    const products = await Product.getAll();
    return products;
  }

  function openProductForm(product?: Product) {
    navigation.navigate("ProductForm", { product });
  }

  return (
    <DataList<Product>
      loadData={loadData}
      buttonLabel="Novo Produto"
      onPressNew={openProductForm}
      onPressEdit={openProductForm}
      getRowText={() => ""}
      onPressDelete={() => {}}
    />
  );
}
