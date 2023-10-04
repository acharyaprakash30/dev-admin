import React from 'react';
import StepWizard from 'react-step-wizard';
import { Card, CardBody, CardHeader } from 'reactstrap';
import AddProduct from './forms/Addproduct';
import AddProductDetails from './forms/AddProductDetails';
import FormNav from './forms/FormNav';
import PublishProduct from './forms/PublishProduct';
import ProductImage from './ProductImage';
import MyProductVariants from './forms/MyProductVariants';
import { useWindowSize } from '../../helper/Helper';

const AddProductStep = () => {
  let custom = {
    enterRight: 'fade-in-anim',
    enterLeft: 'fade-in-anim',
    exitRight: 'fade-out-anim',
    exitLeft: 'fade-out-anim',
  };

  const steps = [
    {
      name: 'Add product',
      component: () => <AddProduct key="Add Product" />,
    },
    {
      component: () => <ProductImage key="Add Product Media" />,
      name: 'Add product Media',
    },
    {
      name: 'Product Details',
      component: () => <AddProductDetails key="product Details" />,
    },
    {
      name: 'Product Variants',
      component: () => <MyProductVariants key="Product Variants" />,
    },
    {
      name: 'Publish product',
      component: () => <PublishProduct key="Publish Product" />,
    },
  ];

  const width = useWindowSize();

  return (
    <>
      <Card className="p-0 mt-5">
        <CardHeader className="card-header__title">
          <h5>{'Add Product To Product Library'}</h5>
        </CardHeader>
        <CardBody>
          <StepWizard
            transitions={custom}
            nav={width > 1128 ? <FormNav steps={steps} /> : null}
          >
            {steps.map((Step) => Step.component())}
          </StepWizard>
        </CardBody>
      </Card>
    </>
  );
};

export default AddProductStep;
