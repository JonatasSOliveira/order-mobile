import StackNavigator from "./components/StackNavigator/";

import PaymentMethod from "./models/PaymentMethod";
import Product from "./models/Product";

PaymentMethod.createTable();
Product.createTable();

export default function App() {
  return <StackNavigator />;
}
