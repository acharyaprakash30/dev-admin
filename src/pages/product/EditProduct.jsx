import { Empty } from 'antd';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  CardBody,
  CardHeader,
  Card,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from 'reactstrap';
import GenerateField from '../../components/forms/GenerateField';

const EditProduct = (props) => {
  const { register, errors } = props;
  const product = useSelector((state) => state.Product.editProduct);
  const formConfig = useSelector((state) => state.Product.formConfigForEdit);
  // console.log(formConfig);
  const [BasicLineTab, setBasicLineTab] = useState(1);

  return (
    <>
      <Card>
        {formConfig.length ? (
          <Form>
            <CardHeader className="m-0 p-0">
              <Nav tabs>
                {formConfig?.map((item, index) => (
                  <NavItem key={`${item.name}-${item.id}`}>
                    <NavLink
                      className={index + 1 === BasicLineTab ? 'active' : ''}
                      onClick={(e) => {
                        setBasicLineTab(index + 1);
                      }}
                    >
                      <i className="icofont icofont-ui-home"></i>
                      {item.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={BasicLineTab}>
                {formConfig &&
                  formConfig.map((item, index) => (
                    <TabPane className="fade show" tabId={index + 1}>
                      {item &&
                      item.forms &&
                      Array.isArray(item.forms) &&
                      item.forms.length ? (
                        item.forms.map((field) => {
                          // eslint-disable-next-line array-callback-return
                          if (!field) return;
                          return GenerateField(
                            field,
                            register,
                            errors,
                            item.name,
                            product,
                          );
                        })
                      ) : (
                        <Empty />
                      )}
                    </TabPane>
                  ))}
              </TabContent>
            </CardBody>
          </Form>
        ) : (
          ''
        )}
      </Card>
    </>
  );
};

export default EditProduct;
