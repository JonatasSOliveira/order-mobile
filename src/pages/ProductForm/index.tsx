import React, { useState } from "react";

import { View, Text } from "react-native";

import Form from "../../components/Form/index";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  function onCancel() {}

  function onSave() {}

  return (
    <Form onCancel={onCancel} onSave={onSave}>
      <Text>ProductForm</Text>
    </Form>
  );
}
