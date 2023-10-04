import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Table, Input, Button } from 'antd';
import { MdDelete } from 'react-icons/md';
import { IoIosImages } from 'react-icons/io';
import VariantImage from './VariantImage';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { MoonLoader } from 'react-spinners';

import variantAction from './redux/actions';

const VariantList = (props) => {
  const [col, setCol] = useState([]);
  // const variants = useSelector((state) => state.Product?.productVariant);
  const variants = useSelector((state) => state.Variant?.variants);
  const variantReducer = useSelector((state) => state?.Variant);
  const [variant, setVariant] = useState();
  const [variantVal, setVariantVal] = useState({
    price: '',
    sku: '',
    stock: '',
  });
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.Variant?.showModal);
  const toggle = () => {
    dispatch(variantAction.hideModal());
  };

  // useEffect(() => {
  // }, [variantReducer.originalVariants]);

  const handleModal = (record) => {
    dispatch(variantAction.setCurrentVariant(record));
    dispatch(variantAction.showModal());
  };
  const ImagesCountButton = ({ record }) => {
    let count = 0;
    // for (let variant of variants) {
    //   if (record && variant?.name === record.name) {
    //     if (variant?.images?.length) {
    //       count = variant.images.length;
    //     }
    //   }
    // }
    return (
      <Badge count={count}>
        <Button
          className="primary"
          type="primary"
          icon={<IoIosImages />}
          title="upload"
          onClick={() => handleModal(record)}
        ></Button>
      </Badge>
    );
  };

  const handleInput = (variant, event) => {
    dispatch(
      variantAction.handleInput(
        variant,
        event.nativeEvent.target.value,
        event.target.name,
      ),
    );
    setVariant(variant);
    setVariantVal({
      ...variantVal,
      [event.target.name]: event.nativeEvent.target.value,
    });
  };

  const handleDeleteVariant = (id, name) => {
    console.log(id, 'delete ');

    if (id) {
      dispatch(variantAction.deleteProductVariant(id));
    } else {
      dispatch(variantAction.removeVariant(name));
    }
  };

  const configureColumn = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'id',
        render: (text) => <p>{text}</p>,
        center: true,
      },
      {
        title: 'Variant Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => (
          <Input
            name="price"
            value={record.price}
            placeholder={'Enter Price'}
            type="number"
            onChange={(e) => handleInput(record.name, e)}
          />
        ),
      },
      {
        title: 'SKU Code',
        dataIndex: 'sku',
        key: 'sku',
        render: (text, record, index) => (
          <Input
            type="text"
            name="sku"
            placeholder={'Enter SKU'}
            value={record.sku}
            onChange={(e) => handleInput(record.name, e)}
          />
        ),
        center: true,
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        render: (text, record, index) => (
          <Input
            type="number"
            name="stock"
            placeholder={'Enter Stock'}
            value={record.stock}
            onChange={(e) => handleInput(record.name, e)}
          />
        ),
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text, record, inde) => <ImagesCountButton record={record} />,
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <>
            {variantReducer?.deletingVariant ? (
              <MoonLoader size={22} color="red" />
            ) : (
              <MdDelete
                color="red"
                size="22"
                className="action-icon"
                onClick={() => handleDeleteVariant(record.id, record.name)}
              />
            )}
          </>
        ),
      },
    ];
    setCol(columns);
  };

  useEffect(() => {
    configureColumn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants, variant, variantVal]);

  return (
    <>
      <VariantImage open={showModal} toggle={toggle} />

      <CSSTransition
        classNames="fade-appear"
        in={props.isVariantActive}
        timeout={500}
      >
        <Card className={props.isVariantActive ? '' : 'd-none'}>
          <CardHeader className="d-flex justify-content-between w-100 py-0 pb-1 pt-3">
            <h6>Variant List</h6>
          </CardHeader>
          <CardBody className="p-0">
            {variants && (
              <Table
                className="variant-table"
                columns={col}
                dataSource={variants}
                // onRow={onRow}
                rowClassName={() => 'text-center'}
              />
            )}
          </CardBody>
        </Card>
      </CSSTransition>
    </>
  );
};

export default VariantList;
