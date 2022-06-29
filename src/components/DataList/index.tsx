import React, { useEffect, useState } from "react";

import { View, FlatList, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, IconButton } from "react-native-paper";

import { Container, ListContainer, Row } from "./styles";

import RootStackParamList from "../../components/StackNavigator/RootStackParamList";

import lightTheme from "../../styles/themes/light";


type drawerNavigatorProp = StackNavigationProp<
    RootStackParamList,
    "DrawerNavigator"
>;

interface CommonProps {
    getRowText(item: T): string
    onPressEdit(item: T): void
}

interface DataRowProps extends CommonProps {
    item: T
}

interface DataListProps extends CommonProps {
    loadData(): Promisse<T>
    buttonLabel: string
    onPressNew(): void
}

function DataRow({
    getRowText,
    onPressEdit,
    item
}: DataRowProps) {
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

export default function DataList({ loadData, buttonLabel, onPressNew, getRowText, onPressEdit }: DataListProps) {
    const [data, setData] = useState([]);

    const navigation = useNavigation<drawerNavigatorProp>();

    async function loadDataHandler() {
        const data = await loadData();
        setData(data);
    }

    useEffect(() => {
        loadDataHandler();
    }, [])

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
