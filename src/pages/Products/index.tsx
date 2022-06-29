import React from 'react';

import DataList from '../../components/DataList';




export default function Products() {

    async function loadData() {
        return [];
    }

    function openProductForm() {

    }

    return (
        <DataList loadData={loadData} DataRow buttonLabel="Novo Produto" onPressButton={openProductForm} />
    );
}