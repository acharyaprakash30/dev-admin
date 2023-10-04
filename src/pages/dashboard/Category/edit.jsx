import { Skeleton } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
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
import { getCategoryTree } from '../../../utils/getCategoryTree';
import CategoryForm from './category-form';
import actions from './redux/actions';
import config from 'config/app';
import Loading from 'components/ProgressModal/Progress';
import { Redirect } from 'react-router-dom';
import paths from 'route/paths';

const EditCategory = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [description, setDescription] = useState(null);
  //Fetch current category
  const getCategoryState = useSelector((state) => state.Category);
  const formattedCategory = getCategoryState?.list;
  const categoryList = getCategoryState?.Category;
  const [parentId, setOnParentId] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [onHomepageWeb, setOnHomepageWeb] = useState(null);
  const [onHomepageMobile, setOnHomepageMobile] = useState(null);
  const [onCollection, setOnCollection] = useState(null);
  const [onKtmMart, setOnKtmMart] = useState();
  const [fileList, setFileList] = useState([]);
  const [isActive, setIsActive] = useState(null);

  let currentCatTree;

  const [redirect, setRedirect] = useState(false);
  let currentCategory = categoryList?.find((value) => value.id === Number(id));

  useEffect(() => {
    if (currentCategory) {
      let a = getCategoryTree(currentCategory.id, categoryList);
      a.pop();
      currentCatTree = a;
      if (currentCategory?.image) {
        setFileList([{ url: currentCategory?.image }]);
      }
      if (!currentCategory?.image) {
        setFileList([]);
      }
    }
  }, [categoryList, currentCategory]);

  useEffect(() => {
    dispatch(actions.getCategoryWithChild());
    dispatch(actions.getCategoryReq());
  }, []);

  const handleForm = (data) => {
    const { ...rest } = data;
    const request = { ...rest };
    if (request?.orderColumn?.length)
      request.orderColumn = Number(request.orderColumn);
    request.featured = featured;
    request.description = description ? description : '';
    request.onHomepageWeb = onHomepageWeb;
    request.onHomepageMobile = onHomepageMobile;
    request.onCollection = onCollection;
    request.parentId = parentId ? parentId : currentCategory?.parentId;
    request.onKtmMart = onKtmMart;
    request.image = '';
    request.isActive = isActive;
    /**For Image */
    if (fileList && fileList.length) {
      request.image = fileList.map((image) => image?.url)[0];
    } else {
      request.image = '';
    }

    dispatch(actions.updateCategoryReq(id, request));
    setRedirect(true);
  };

  const editCategoryResult = useSelector(
    (state) => state?.Category.editCategory,
  );
  if (editCategoryResult?.success && redirect) {
    return <Redirect to={paths.Categories} />;
  }

  return (
    <Fragment>
      <Loading
        show={editCategoryResult?.loading}
        title={'Finishing Category....'}
        type="info"
      />
      <Breadcrumb parent="Form" title="Edit Category" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="pb-2">
                <h5>Edit {currentCategory?.name || null} Category Details</h5>
              </CardHeader>
              <Form onSubmit={handleSubmit(handleForm)} className="theme-form">
                <CardBody>
                  {/* {getCategoryState.loading || currentCategory?.categoryTree ? ( */}
                  <CategoryForm
                    setDescription={setDescription}
                    formattedCategory={formattedCategory}
                    register={register}
                    defaultValues={currentCategory}
                    id={id}
                    setFileList={setFileList}
                    Images={fileList}
                    setFeatured={setFeatured}
                    setOnHomepageWeb={setOnHomepageWeb}
                    setOnHomepageMobile={setOnHomepageMobile}
                    setOnCollection={setOnCollection}
                    setOnParentId={setOnParentId}
                    setOnKtmMart={setOnKtmMart}
                    setIsActive={setIsActive}
                  />
                  {/* ) : ( */}
                  {/* <>
                      <Skeleton />
                      <Skeleton />
                    </>
                  )} */}
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" className="mr-1">
                    Update Category
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

export default EditCategory;
