import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationOptions,
} from "@react-navigation/stack";

import lightTheme from "../../styles/themes/light";

import DrawerNavigator from "../DrawerNavigator/index";
import PaymentMethodForm from "../../pages/PaymentMethodForm";
import ProductForm from "../../pages/ProductForm";
import CustomerForm from "../../pages/CustomerForm";

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
	headerStyle: {
		backgroundColor: lightTheme.PRIMARY,
	},
	headerTintColor: lightTheme.WHITE,
	headerTitleAlign: "center",
};

export default function StackNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="DrawerNavigator"
				screenOptions={screenOptions}
			>
				<Stack.Screen
					name="DrawerNavigator"
					component={DrawerNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="PaymentMethodForm"
					component={PaymentMethodForm}
					options={{
						title: "Forma de Pagamento",
					}}
				/>
				<Stack.Screen
					name="ProductForm"
					component={ProductForm}
					options={{
						title: "Produto",
					}}
				/>
				<Stack.Screen
					name="CustomerForm"
					component={CustomerForm}
					options={{
						title: "Cliente",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
