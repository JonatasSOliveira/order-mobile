import React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import PaymentMethod from "../../models/PaymentMethod";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";
import DataList from "../../components/DataList";

type drawerNavigatorProp = StackNavigationProp<
  RootStackParamList,
  "DrawerNavigator"
>;

export default function PaymentMethods() {
  const navigation = useNavigation<drawerNavigatorProp>();

  async function loadData() {
    const paymentMethods = await PaymentMethod.getAll();

    return paymentMethods;
  }

  function openPaymentMethodForm(paymentMethod?: PaymentMethod) {
    navigation.navigate("PaymentMethodForm", { paymentMethod });
  }

  return (
    <DataList<PaymentMethod>
      loadData={loadData}
      buttonLabel="Nova Forma de Pagamento"
      onPressNew={openPaymentMethodForm}
      onPressEdit={openPaymentMethodForm}
      getRowText={(paymentMethod) => paymentMethod.getName()}
    />
  );
}
