import React, { useState, useEffect } from "react";

import { Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import Product from "../../models/Product";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";
import Form from "../../components/Form/index";
import { formatToCurrency } from "../../utils/number";

type ProductFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductForm"
>;

type ProductFormRouteProp = RouteProp<RootStackParamList, "ProductForm">;

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0,00");

  const navigation = useNavigation<ProductFormNavigationProp>();
  const route = useRoute<ProductFormRouteProp>();

  function goBack() {
    navigation.pop();
  }

  async function saveProduct() {
    try {
      const formatedPrice: number = Number(price.replace(",", "."));

      if (!name.trim() || isNaN(formatedPrice)) {
        Alert.alert("Atenção", "Preencha o nome e o preço do produto");
        return;
      }

      let product: Product;

      if (route.params?.product) {
        product = route.params.product;
      } else {
        product = new Product();
      }

      product.setName(name);
      product.setDescription(description);
      product.setPrice(formatedPrice);

      await product.save();
      Alert.alert("Sucesso!", "Produto salvo com sucesso!", [
        { text: "OK", onPress: goBack },
      ]);
    } catch (error) {
      Alert.alert("Erro!", "Erro ao salvar produto!");
    }
  }

  function handlerSetPrice(value: string) {
    setPrice(formatToCurrency(value));
  }

  useEffect(() => {
    if (route.params?.product) {
      const product = route.params.product;
      const price: string = product.getPrice().toFixed(2).replace(".", ",");
      const description = product.getDescription() || "";

      setName(product.getName());
      setDescription(description);
      setPrice(price);
    }
  }, [route.params.product]);

  return (
    <Form onCancel={goBack} onSave={saveProduct}>
      <TextInput
        label="Nome(*)"
        value={name}
        onChangeText={setName}
        mode="outlined"
        autoFocus
        autoCapitalize="characters"
      />
      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        autoCapitalize="characters"
        multiline
        numberOfLines={8}
      />
      <TextInput
        label="Preço(*)"
        value={price}
        onChangeText={handlerSetPrice}
        mode="outlined"
        keyboardType="numeric"
      />
    </Form>
  );
}
