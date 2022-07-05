import { View, Text } from "react-native";
import React from "react";

import Form from "../../components/Form/index";

export default function ProductForm() {
  function onCancel() {}

  function onSave() {}

  return (
    <Form onCancel={onCancel} onSave={onSave}>
      <Text>ProductForm</Text>
    </Form>
  );
}
