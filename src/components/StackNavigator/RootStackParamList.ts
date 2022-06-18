import PaymentMethod from "../../models/PaymentMethod";

type RootStackParamList = {
  DrawerNavigator: undefined;
  PaymentMethodsForm: { paymentMethod?: PaymentMethod };
};

export default RootStackParamList;
