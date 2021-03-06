import StackNavigator from "./components/StackNavigator/";

import City from "./models/City";
import Customer from "./models/Customer";
import CustomerAddress from "./models/CustomerAddress";
import Neighborhood from "./models/Neighborhood";
import PaymentMethod from "./models/PaymentMethod";
import Product from "./models/Product";

PaymentMethod.createTable();
Product.createTable();
City.createTable();
Neighborhood.createTable();
Customer.createTable();

CustomerAddress.createTable();

export default function App() {
  return <StackNavigator />;
}
