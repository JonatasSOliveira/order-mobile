import styled from "styled-components/native";
import { Button } from "react-native-paper";

import lightTheme from "../../styles/themes/light";

export const Container = styled.View`
  flex: 1;
  background-color: ${lightTheme.BACKGROUND};
`;

export const InputsContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const FooterButton = styled(Button)`
  width: 47.5%;
`;
