import StackNavigator from "./components/StackNavigator/";
import PaymentMethod from "./models/PaymentMethod";

PaymentMethod.createTable();

export default function App() {
  return <StackNavigator />;
}
