import StackNavigator from "./components/StackNavigator/";
import City from "./models/City";
import Customer from "./models/Customer";

import PaymentMethod from "./models/PaymentMethod";
import Product from "./models/Product";

PaymentMethod.createTable();
Product.createTable();
City.createTable();
Customer.createTable();

export default function App() {
  return <StackNavigator />;
}
