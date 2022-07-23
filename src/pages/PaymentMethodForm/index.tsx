import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { TextInput } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import PaymentMethod from "../../models/PaymentMethod";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";
import Form from "../../components/Form";

type PaymentMethodFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentMethodForm"
>;

type PaymentMethodFormRouteProp = RouteProp<
  RootStackParamList,
  "PaymentMethodForm"
>;

export default function PaymentMethodForm() {
  const [name, setName] = useState("");

  const navigation = useNavigation<PaymentMethodFormNavigationProp>();
  const route = useRoute<PaymentMethodFormRouteProp>();

  function goBack() {
    navigation.pop();
  }

  async function savePaymentMethod() {
    try {
      if (!name.trim()) {
        Alert.alert("Atenção", "Preencha o nome da forma de pagamento");
        return;
      }

      let paymentMethod: PaymentMethod;

      if (route.params?.paymentMethod) {
        paymentMethod = route.params.paymentMethod;
      } else {
        paymentMethod = new PaymentMethod();
      }

      paymentMethod.setName(name);

      await paymentMethod.save();
      Alert.alert("Sucesso!", "Forma de pagamento salva com sucesso!", [
        { text: "OK", onPress: goBack },
      ]);
    } catch (error) {
      Alert.alert("Erro!", "Erro ao salvar forma de pagamento!");
    }
  }

  useEffect(() => {
    if (route.params?.paymentMethod) {
      const paymentMethod = route.params.paymentMethod;
      setName(paymentMethod.getName());
    }
  }, [route.params.paymentMethod]);

  return (
    <Form onCancel={goBack} onSave={savePaymentMethod}>
      <TextInput
        label="Nome(*)"
        value={name}
        onChangeText={setName}
        mode="outlined"
        autoFocus
        autoCapitalize="characters"
      />
    </Form>
  );
}
