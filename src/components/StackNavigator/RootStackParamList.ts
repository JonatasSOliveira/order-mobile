import PaymentMethod from "../../models/PaymentMethod";

type RootStackParamList = {
  DrawerNavigator: undefined;
  PaymentMethodForm: { paymentMethod?: PaymentMethod };
  ProductForm: undefined;
  CustomerForm: undefined;
};

export default RootStackParamList;
