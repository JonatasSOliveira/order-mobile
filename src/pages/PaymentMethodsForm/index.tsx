import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { TextInput } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import { Footer, Container, Form, FooterButton } from "./styles";

import lightTheme from "../../styles/themes/light";

import PaymentMethod from "../../models/PaymentMethod";

type paymentMethodsFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentMethodsForm"
>;

type paymentMethodsFormRouteProp = RouteProp<
  RootStackParamList,
  "PaymentMethodsForm"
>;

export default function PaymentMethodsForm() {
  const [name, setName] = useState("");

  const navigation = useNavigation<paymentMethodsFormNavigationProp>();
  const route = useRoute<paymentMethodsFormRouteProp>();

  function goBack() {
    navigation.pop();
  }

  async function savePaymentMethod() {
    try {
      if (!name.trim()) {
        Alert.alert("Atenção", "Preencha o nome do método de pagamento");
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
    <Container>
      <Form>
        <TextInput
          label="Nome(*)"
          value={name}
          onChangeText={setName}
          mode="outlined"
          autoFocus
          autoCapitalize="characters"
        />
      </Form>
      <Footer>
        <FooterButton
          mode="contained"
          color={lightTheme.CANCEL}
          icon="close-circle"
          onPress={goBack}
        >
          Cancelar
        </FooterButton>
        <FooterButton
          mode="contained"
          color={lightTheme.SUCCESS}
          icon="check-circle"
          onPress={savePaymentMethod}
        >
          Salvar
        </FooterButton>
      </Footer>
    </Container>
  );
}
