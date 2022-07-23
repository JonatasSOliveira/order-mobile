import React, { useState, useEffect } from "react";

import { Alert } from 'react-native'
import { TextInput } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import Product from "../../models/Product";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";
import Form from "../../components/Form/index";

type ProductFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductForm"
>;

type ProductFormRouteProp = RouteProp<
  RootStackParamList,
  "ProductForm"
>;

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
        product.setName(name);
        product.setDescription(description);
        product.setPrice(formatedPrice);
      } else {
        product = new Product({ name, description, price: formatedPrice });
      }

      await product.save();
      Alert.alert("Sucesso!", "Produto salvo com sucesso!", [
        { text: "OK", onPress: goBack },
      ]);
    } catch (error) {
      Alert.alert("Erro!", "Erro ao salvar produto!");
    }
  }

  useEffect(() => {
    if (route.params?.product) {
      const product = route.params.product;
      const price: string = product.getPrice().toFixed(2).replace(".", ",");

      setName(product.getName());
      setDescription(product.getDescription());
      setPrice(price)
    }
  }, [route.params.product]);

  return (
    <Form onCancel={goBack} onSave={onSave}>
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
        autoFocus
        autoCapitalize="characters"
        multiline
        numberOfLines={10}
      />
      <TextInput
        label="Preço(*)"
        value={price}
        onChangeText={setPrice}
        mode="outlined"
        keyboardType="numeric"
        autoFocus
      />
    </Form>
  );
}
