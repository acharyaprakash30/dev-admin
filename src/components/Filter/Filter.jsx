import React, { useState } from 'react';
import { Col, Label, Row } from 'reactstrap';
import { DatePicker, Divider, Form, Input, Select } from 'antd';
import './style/filter.scss';
import { SearchOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useDispatch } from 'react-redux';

const { RangePicker } = DatePicker;

export default function Filter({
  handleSearch,
  brands,
  categories,
  handleBrand,
  handleCategory,
  checkPublishHandler,
  checkDealHandler,
  checkStockHandler,
  checkDateHandler,
}) {
  const dispatch = useDispatch();
  // const [search,setSearch] = useState("");

  // const Searchhandler = (e) =>{
  //   setSearch(e.target.value)
  //   dispatch(action.searchQuery(e.target.value))
  // }

  return (
    <div className="card py-2 px-4 no-radius">
      <Form layout="vertical">
        <Row sm={12} xl={12} lg={12} xs={12}>
          <Col>
            <Form.Item label="Search Products:">
              <Input
                prefix={<SearchOutlined />}
                className="form-input"
                size="large"
                placeholder="Search product by name,sku"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row sm={12} xl={12} lg={12} xs={12}>
          {/* !DEPR :no implementation */}
          {/* <Col className="p-0 mx-3" sm="2">
            <Select placeholder="User: All" className="w-100" />
          </Col> */}
          <Col className="p-0 mx-3" sm="2">
            <Select
              className="w-100"
              placeholder="Brand: All"
              onChange={(e) => handleBrand(e)}
            >
              {brands.map((brand) => (
                <Select.Option value={brand.id}>{brand.name}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col className="p-0 mx-3" sm="2">
            <Select
              className="w-100"
              placeholder="Category: All"
              onChange={(e) => handleCategory(e)}
            >
              {categories.map((category) => (
                <Select.Option value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Divider />
        <Row sm={12} lg={12}>
          <Col className="p-0 pb-2 mx-3" sm="2">
            <Checkbox onChange={(e) => checkPublishHandler(e.target.checked)}>
              Published
            </Checkbox>
          </Col>
          {/* no implementation */}
          {/* <Col className="p-0 mx-3" sm="2">
            <Checkbox onChange={checkDealHandler}>Today's Deal </Checkbox>
          </Col> */}
          <Col className="p-0 mx-3" sm="2">
            <Checkbox onChange={checkStockHandler}>Low on stocks</Checkbox>
          </Col>
          <Col
            className="p-0 pb-4 mx-3 d-flex justify-content-center align-items-center"
            sm="5"
          >
            <Label className="p-1 m-0">Between:</Label>
            <RangePicker showTime onChange={checkDateHandler} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
