import PaymentMethod from "../../models/PaymentMethod";
import Product from "../../models/Product";

type RootStackParamList = {
  DrawerNavigator: undefined;
  PaymentMethodForm: { paymentMethod?: PaymentMethod };
  ProductForm: { product?: Product };
  CustomerForm: undefined;
};

export default RootStackParamList;
