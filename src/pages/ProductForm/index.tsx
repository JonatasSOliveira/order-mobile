import React, { useState } from "react";

import { TextInput } from "react-native-paper";

import Form from "../../components/Form/index";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function onCancel() {}

  function onSave() {}

  return (
    <Form onCancel={onCancel} onSave={onSave}>
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
