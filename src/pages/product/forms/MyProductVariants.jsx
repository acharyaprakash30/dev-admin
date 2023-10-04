import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Form } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import productActions from '../redux/action';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { BsPlusCircle } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import ListVariants from '../ListVariants';
import EditProduct from '../EditProduct';
import ProductImage from '../ProductImage';
import EditBaseProduct from '../EditBaseProduct';
import EditImageGallery from '../EditImageGallery';
import Imageupload from '../upload/ImageUpload';
import ColorImageUpload from '../ColorImageUpload';
import LoaderButton from '../../../components/LoaderButton/LoaderButton';

const { Option } = Select;

const getcolors = [];
for (let i = 10; i < 36; i++) {
  getcolors.push(
    <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
  );
}

const MyProductVariants = ({ categoryId }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [tableColumn, setColumnData] = useState([]);
  const [tableRow, setTableRow] = useState([]);

  const [imageCount, setImageCount] = useState(1);

  const [colorList, setColorList] = useState([]);

  const myColorList = [];

  const variants = useSelector((state) => state.Product?.variants);
  const supportColumns = [
    ...variants.map((value) => {
      return {
        name: value.name,
        selector: value.name,
        center: true,
        width: 'auto',
      };
    }),
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

  let variantsList = {};

  variantsList.test = (
    <select
      className="form-control digits"
      name={`properties.test`}
      ref={register}
    >
      {myColorList.map((v, index) => (
        <option key={`${v}---${index}`} value={v || 'test'}>
          {v}
        </option>
      ))}
    </select>
  );
  variantsList.sku = (
    <input name="sku" ref={register()} className="form-control" type="text" />
  );
  variantsList.price = (
    <input
      name="price"
      ref={register()}
      className="form-control"
      type="number"
    />
  );
  variantsList.stock = (
    <input
      name="stock"
      ref={register()}
      className="form-control"
      type="number"
    />
  );
  variantsList.image = (
    <input type="text" ref={register()} className="form-control" />
  );
  variants.map((value) => {
    variantsList[value.name] = (
      <select
        className="form-control digits"
        name={`properties.${value.name}`}
        ref={register}
      >
        {value.variantOptions.map((v) => (
          <option id={v.id} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>
    );
    return {
      [variantsList[value.name]]: value,
    };
  });

  const supportData = [variantsList];

  const handleTableData = useRef();

  handleTableData.current = () => {
    setColumnData(supportColumns);
    setTableRow(supportData);
  };

  useEffect(() => {
    handleTableData.current();
  }, [variants]);

  const fetchVariant = useRef();

  fetchVariant.current = () => {
    dispatch(productActions.fetchVariant(categoryId));
  };

  useEffect(() => {
    fetchVariant.current();
  }, []);
  const product = useSelector((state) => state.Product.editProduct);
  const addProduct = useSelector((state) => state.Product);
  const handlePlus = (data) => {
    dispatch(
      productActions.addProductVariant(product?.id, {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      }),
    );
  };

  const handleNext = () => {
    dispatch(productActions.goToNextStep());
  };

  const getColorList = (data, index) => {
    myColorList[index] = data;
  };
  return (
    <>
      {' '}
      {/* <Row>
          <h1
            onClick={(e) => {
              setImageCount(imageCount + 1);
            }}
          >
            PLUS
          </h1>

          {Array(imageCount)
            .fill(true)
            .map((value, index) => {
              return (
                <ColorImageUpload
                  iterationCounter={index}
                  setColorList={setColorList}
                  getColorList={getColorList}
                />
              );
            })}
        </Row> */}
      <Card className="card-wrapper shadow-none">
        <CardBody>
          <Col>
            <p className="muted">
              {' '}
              Insert your variant information on the table below and click on
              add variant button
            </p>
            <DataTable
              title="Create Variants"
              className="mt-1 w-100"
              columns={tableColumn}
              data={tableRow}
              striped={true}
              center={true}
            />

            <div className="mt-4 " onClick={handleSubmit(handlePlus)}>
              <LoaderButton
                isDisabled={addProduct?.addingVariant}
                isLoading={addProduct?.addingVariant}
                className="btn"
                color="primary"
              >
                <BsPlusCircle color="white" /> Add Variant
              </LoaderButton>
            </div>
          </Col>
        </CardBody>
      </Card>
      <Row>
        <Col sm="12">
          <Card className="card-wrapper shadow-none">
            <CardBody>
              <ListVariants productId={product.id} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default MyProductVariants;
