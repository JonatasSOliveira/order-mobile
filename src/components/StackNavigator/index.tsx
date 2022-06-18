import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import DrawerNavigator from "../DrawerNavigator/index";

import PaymentMethodsForm from "../../pages/PaymentMethodsForm";

import lightTheme from "../../styles/themes/light";

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
          name="PaymentMethodsForm"
          component={PaymentMethodsForm}
          options={{
            title: "Forma de Pagamento",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
