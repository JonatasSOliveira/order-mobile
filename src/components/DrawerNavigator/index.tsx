import {
	createDrawerNavigator,
	DrawerNavigationOptions,
} from "@react-navigation/drawer";

import Home from "../../pages/Home/";
import PaymentMethods from "../../pages/PaymentMethods";
import Products from "../../pages/Products";
import Customers from "../../pages/Customers";

import lightTheme from "../../styles/themes/light";

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
	headerStyle: {
		backgroundColor: lightTheme.PRIMARY,
	},
	headerTintColor: lightTheme.WHITE,
	headerTitleAlign: "center",
};

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
			<Drawer.Screen
				name="Home"
				component={Home}
				options={{
					headerTitle: "Chef Patner",
					title: "Início",
				}}
			/>
			<Drawer.Screen
				name="PaymentMethods"
				component={PaymentMethods}
				options={{
					title: "Formas de Pagamento",
				}}
			/>
			<Drawer.Screen
				name="Products"
				component={Products}
				options={{
					title: "Produtos",
				}}
			/>
			<Drawer.Screen
				name="Customers"
				component={Customers}
				options={{
					title: "Clientes",
				}}
			/>
		</Drawer.Navigator>
	);
}
