import React from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

const ListVariants = ({ productId }) => {
  const oldList = useSelector((state) => state.Product.productVariant) || [];
  const variantList = useSelector((state) => state.Product.addedVariantList);
  const colGenerators = useSelector((state) => state.Product.variants);
  const dynamicCols = colGenerators.map((value) => value.name);

  const myCols =
    dynamicCols.length > 0
      ? dynamicCols.map((value) => {
          return {
            name: value,
            selector: value,
            center: true,
            width: 'auto',
          };
        })
      : [];

  const supportColumns = [
    ...myCols,
    {
      name: 'SKU',
      selector: 'sku',
      width: 'auto',
    },
    {
      name: 'stock',
      selector: 'stock',
      width: 'auto',
    },
    {
      name: 'Price',
      selector: 'price',
      width: 'auto',
    },

    // {
    //   name: 'Image',
    //   selector: 'image',
    //   width: 'auto',
    // },
  ];

  const supportData = variantList.map((value) => {
    return {
      ...value,
      ...value.properties,
    };
  });

  const allData = [...oldList, ...supportData];
  return (
    <>
      <DataTable
        title="Current Variants"
        columns={supportColumns}
        data={allData}
      ></DataTable>
    </>
  );
};

export default ListVariants;
