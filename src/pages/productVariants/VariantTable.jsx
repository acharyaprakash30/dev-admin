import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';

function VariantTable(props) {
  const [variants, setVariants] = useState([]);
  const [col, setCol] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [selectedVariantImages, setSelectedVariantImages] = useState([]);
  const [currentVariant, setCurrentVariant] = useState(null);

  useEffect(() => {
    setShowTable(false);
    if (props.variants.length) {
      let updatedVariants = props.variants.map((variant) => {
        return {
          ...variant,
          price: props?.product?.salePrice || 0,
        };
      });
      setVariants(updatedVariants);
    }
  }, [props]);

  const handleDelete = (record) => {
    setVariants(variants.filter((variant) => variant.id !== record.id));
  };

  const handleInput = ({ target: { name, value } }, record) => {
    setVariants(
      variants.map((variant) => {
        if (record.id === variant.id) {
          if (name === 'price' || name === 'quantity') {
            return {
              ...variant,
              [name]: Number(value),
            };
          } else {
            return {
              variant,
              [name]: value,
            };
          }
        } else {
          return variant;
        }
      }),
    );
  };
  const handleModal = (value) => {
    if (value && value.id) setCurrentVariant(value.variant);
    setShowModel(!showModel);
  };

  const data = variants.map((variant) => {
    return {
      variant: variant.variant,
      price: (
        <input
          name="price"
          onChange={(e) => handleInput(e, variant)}
          value={variant.price}
        />
      ),
      action: <button onClick={() => handleDelete(variant)}>Delete</button>,
    };
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Variant',
        accessor: 'variant',
      },
      {
        Header: 'Variant Price',
        accessor: 'price',
      },
      {
        Header: 'SKU code',
        accessor: 'sku',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Image',
        accessor: 'image',
      },
      {
        Header: 'Actions',
        accessor: 'action',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      className="col-md-12"
      style={{ border: 'solid 1px blue' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default VariantTable;
