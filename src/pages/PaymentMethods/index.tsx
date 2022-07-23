import React from "react";

import { Alert } from "react-native";
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

  async function deletePaymentMethod(paymentMethod: PaymentMethod) {
    const paymentMethodName: string = paymentMethod.getName();
    let alertTitle: string = "",
      alertMessage: string = "";

    try {
      await paymentMethod.delete();
      alertTitle = "Sucesso!";
      alertMessage = `Forma de pagamento "${paymentMethodName}" excluída com sucesso!`;
    } catch (error) {
      alertTitle = "Atenção!";
      alertMessage = `Erro ao excluir a forma de pagamento "${paymentMethodName}"!`;
      throw error;
    } finally {
      Alert.alert(alertTitle, alertMessage, [{ text: "OK" }]);
    }
  }

  return (
    <DataList<PaymentMethod>
      loadData={loadData}
      buttonLabel="Nova Forma de Pagamento"
      onPressNew={openPaymentMethodForm}
      onPressEdit={openPaymentMethodForm}
      getRowText={(paymentMethod) => paymentMethod.getName()}
      onPressDelete={deletePaymentMethod}
    />
  );
}
