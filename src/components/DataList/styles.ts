import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
  padding-bottom: 20px;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  width: 100%;
  padding-vertical: 10px;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RowText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-left: 10px;
  width: 75%;
`;
