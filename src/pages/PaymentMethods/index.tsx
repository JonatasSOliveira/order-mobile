import React, { useEffect, useState } from "react";

import { View, FlatList, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, IconButton } from "react-native-paper";

import { Container, ListContainer, Row } from "./styles";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import lightTheme from "../../styles/themes/light";

import PaymentMethod from "../../models/PaymentMethod";

interface PaymentMethodRowProps {
  paymentMethod: PaymentMethod;
  onPressEdit: (paymentMethod: PaymentMethod) => void;
}

function PaymentMethodRow({
  paymentMethod,
  onPressEdit,
}: PaymentMethodRowProps) {
  return (
    <Row>
      <Text>{paymentMethod.getName()}</Text>
      <IconButton
        icon="square-edit-outline"
        onPress={() => onPressEdit(paymentMethod)}
      />
    </Row>
  );
}

type drawerNavigatorProp = StackNavigationProp<
  RootStackParamList,
  "DrawerNavigator"
>;

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const navigation = useNavigation<drawerNavigatorProp>();

  function openPaymentMethodForm(paymentMethod?: PaymentMethod) {
    navigation.navigate("PaymentMethodForm", { paymentMethod });
  }

  async function loadData() {
    const paymentMethods = await PaymentMethod.getAll();
    setPaymentMethods(paymentMethods);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <ListContainer>
        <FlatList
          data={paymentMethods}
          renderItem={({ item }) => (
            <PaymentMethodRow
              paymentMethod={item}
              onPressEdit={openPaymentMethodForm}
            />
          )}
          keyExtractor={(item) => item.getId().toString()}
        />
      </ListContainer>
      <View>
        <Button
          mode="contained"
          color={lightTheme.PRIMARY}
          icon="plus-circle"
          onPress={() => openPaymentMethodForm()}
        >
          Nova Forma de Pagamento
        </Button>
      </View>
    </Container>
  );
}
