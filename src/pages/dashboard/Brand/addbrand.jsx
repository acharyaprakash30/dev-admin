import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from 'reactstrap';
import { Switch } from 'antd';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import { Redirect } from 'react-router-dom';
import paths from 'route/paths';
import Loading from 'components/ProgressModal/Progress';
import BrandForm from './BrandForm';

const Addbrands = (props) => {
  const { register, handleSubmit } = useForm();
  const [brandConfig, setBrandConfig] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedCatList, setselectedCatList] = useState([]);
  const dispatch = useDispatch();
  
  const handleForm = (data, e) => {
    setBrandConfig([...brandConfig, data]);
    data.isActive = isActive;
    /**Note: Remove this line after API is done. */
    data = {name:data.name}
    dispatch(actions.sendBrandReq(data));
    e.target.reset();
  };

  const addbrand = useSelector(state => state?.Brand?.sendBrand);

  return (
    <Fragment>
      <Loading show={addbrand?.loading} title={"Creating Brand...."} type="info" />
      <Breadcrumb parent="Form" title="Add Brands" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Brand Details</h5>
              </CardHeader>
              <Form
                onSubmit={handleSubmit(handleForm)}
                className="form theme-form"
              >
                <CardBody>
                  <Row>
                    <Col sm="12">
                    <BrandForm 
                        register={register}
                        setIsActive={setIsActive}
                        isActive={isActive}
                        //setFileList = {setFileList}
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Brand
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Addbrands;
