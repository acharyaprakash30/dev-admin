import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import paths from 'route/paths';
import Loading from 'components/ProgressModal/Progress';

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
import CategoryForm from './category-form';
import actions from './redux/actions';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [parentId, setOnParentId] = useState(null);
  const [description, setDescription] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [onHomepageWeb, setOnHomepageWeb] = useState();
  const [onHomepageMobile, setOnHomepageMobile] = useState();
  const [onCollection, setOnCollection] = useState();
  const [onKtmMart, setOnKtmMart] = useState();
  useEffect(() => dispatch(actions.getCategoryWithChild()), []);

  const handleForm = (data) => {
    const { ...rest } = data;
    const request = { ...rest };
    if (description) request.description = description;
    if (request.orderColumn.length)
      request.orderColumn = Number(request.orderColumn);
    request.featured = featured;
    request.onHomepageWeb = onHomepageWeb;
    request.onHomepageMobile = onHomepageMobile;
    request.onCollection = onCollection;
    request.parentId = parentId;
    request.onKtmMart = onKtmMart;

    if (fileList && fileList.length) {
      request.image = fileList.map((image) => image?.url)[0];
    } else {
      request.image = '';
    }
    dispatch(actions.addCategoryReq(request));
  };
  const createCategory = useSelector(
    (state) => state?.Category?.createCategory,
  );

  return (
    <Fragment>
      <Loading
        show={createCategory?.loading}
        title={'Creating Category....'}
        type="info"
      />
      <Breadcrumb parent="Form" title="Add Category" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-2">
                <h5>Category Details</h5>
                <p>
                  Fill the form to create a new category.{' '}
                  <small>
                    {' '}
                    Select a parent of the category to create a sub-categories
                  </small>
                </p>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  <React.StrictMode>
                    <CategoryForm
                      setDescription={setDescription}
                      setFeatured={setFeatured}
                      setOnHomepageWeb={setOnHomepageWeb}
                      setOnHomepageMobile={setOnHomepageMobile}
                      setOnCollection={setOnCollection}
                      setOnParentId={setOnParentId}
                      // formattedCategory={formattedCategory}
                      setOnKtmMart={setOnKtmMart}
                      register={register}
                      setFileList={setFileList}
                      Images={fileList}
                    />
                  </React.StrictMode>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Add Category
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

export default CreateCategory;
