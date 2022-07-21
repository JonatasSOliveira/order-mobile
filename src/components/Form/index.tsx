import React from "react";

import { Container, Footer, FooterButton, InputsContainer } from "./styles";
import lightTheme from "../../styles/themes/light";

interface FormProps {
  children: JSX.Element | JSX.Element[];
  onCancel: () => void;
  onSave: () => void;
}

export default function Form({
  children,
  onCancel,
  onSave: onSave,
}: FormProps) {
  return (
    <Container>
      <InputsContainer>{children}</InputsContainer>
      <Footer>
        <FooterButton
          mode="contained"
          color={lightTheme.CANCEL}
          icon="close-circle"
          onPress={onCancel}
        >
          Cancelar
        </FooterButton>
        <FooterButton
          mode="contained"
          color={lightTheme.SUCCESS}
          icon="check-circle"
          onPress={onSave}
        >
          Salvar
        </FooterButton>
      </Footer>
    </Container>
  );
}
