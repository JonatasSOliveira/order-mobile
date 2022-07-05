import React, { useEffect, useState } from "react";

import { View, FlatList, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, IconButton } from "react-native-paper";

import { Container, ListContainer, Row } from "./styles";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import lightTheme from "../../styles/themes/light";
import BaseModel from "../../services/BaseModel";

type drawerNavigatorProp = StackNavigationProp<
  RootStackParamList,
  "DrawerNavigator"
>;

interface CommonProps<T extends BaseModel> {
  getRowText(item: T): string;
  onPressEdit(item: T): void;
}

interface DataRowProps<T extends BaseModel> extends CommonProps<T> {
  item: T;
}

interface DataListProps<T extends BaseModel> extends CommonProps<T> {
  loadData(): Promise<Array<T>>;
  buttonLabel: string;
  onPressNew(): void;
}

function DataRow<T extends BaseModel>({
  getRowText,
  onPressEdit,
  item,
}: DataRowProps<T>) {
  return (
    <Row>
      <Text>{getRowText(item)}</Text>
      <IconButton
        icon="square-edit-outline"
        onPress={() => onPressEdit(item)}
      />
    </Row>
  );
}

export default function DataList<T extends BaseModel>({
  loadData,
  buttonLabel,
  onPressNew,
  getRowText,
  onPressEdit,
}: DataListProps<T>) {
  const [data, setData] = useState<Array<T>>([]);

  const navigation = useNavigation<drawerNavigatorProp>();

  async function loadDataHandler() {
    const data = await loadData();
    setData(data);
  }

  useEffect(() => {
    loadDataHandler();
  }, []);

  return (
    <Container>
      <ListContainer>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <DataRow
              item={item}
              getRowText={getRowText}
              onPressEdit={onPressEdit}
            />
          )}
          keyExtractor={(item) => item.getId().toString()}
        />
      </ListContainer>
      <View>
        <Button
          mode="contained"
          color={lightTheme.PRIMARY}
          icon="plus-circle"
          onPress={onPressNew}
        >
          {buttonLabel}
        </Button>
      </View>
    </Container>
  );
}
