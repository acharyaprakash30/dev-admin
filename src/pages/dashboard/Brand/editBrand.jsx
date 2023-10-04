import React, { Fragment, useState, useEffect } from 'react';
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

import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import { Redirect } from 'react-router-dom';
import paths from 'route/paths';
import Loading from 'components/ProgressModal/Progress';
import BrandForm from './BrandForm';
import { useParams } from 'react-router';
import config from 'config/app';
import { editBrandApi } from 'api/fetchBrand';

const EditBrand = (props) => {
  const { currentBrand, highlightImage } = props.location;
  const { id } = useParams();
  const dispatch = useDispatch();
  let Images = [];

  const { register, handleSubmit } = useForm();
  const [brandConfig, setBrandConfig] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isActive, setIsActive] = useState();
  const [fileList, setFileList] = useState([]);
  const [brandData, setBrandData] = useState();
  const [selectedCatList, setselectedCatList] = useState([]);


  let selectorResult = useSelector((state) => state?.Brand?.Brand);
  useEffect(() => {
    if (highlightImage && !!currentBrand && parseInt(currentBrand?.id) === parseInt(id)) {
      setBrandData(currentBrand)
    } else {
      setBrandData(selectorResult?.find((value) => value.id === Number(id)));
    }
  }, [id])

  useEffect(() => {
    if (brandData?.image) {
      setFileList([{ url: brandData?.image }])
    }
    if (!brandData?.image) {
      setFileList([]);
    }
    if (brandData?.isActive) {
      setIsActive(brandData?.isActive);
    }
    if(brandData?.category_id){
      setselectedCatList(brandData.category_id || -1 )
    } 

  }, [brandData])

  const handleForm = (data, e) => {
    setBrandConfig([...brandConfig, data]);
    data.isActive = isActive ? true : false;
    console.log(selectedCatList);
    data.category_id = selectedCatList?.length > 0? selectedCatList[0] : -1
    console.log(data);
    if (fileList && fileList.length > 0) {
      data.image = fileList.map((file) => file.url)[0];
    } else {
      data.image = "";
    }
    dispatch(actions.editBrandReq(id, data));
    e.target.reset();
  };

  const addbrand = useSelector((state) => state?.Brand?.editBrand);

  return (
    <Fragment>
      <Loading
        show={addbrand?.loading}
        title={'Finishing Brand....'}
        type="info"
      />
      <Breadcrumb parent="Form" title="Brands" />
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
                        Images={fileList}
                        setFileList={setFileList}
                        id={id}
                        redirected={highlightImage ? true : false}
                        brandData={brandData}
                        selectedCatList={selectedCatList}
                        setselectedCatList={setselectedCatList}
                      />
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Finish
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

export default EditBrand;
