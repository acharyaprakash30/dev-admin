import { Select, Switch } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import variantActions from './redux/actions';
import VariantList from './VariantList';

const { Option } = Select;

const AddVariants = ({ product }) => {
  const params = useParams();
  const isVariantActive = useSelector((state) => state.Variant?.toggleVariant);
  const selectedAttributes = useSelector(
    (state) => state.Variant?.selectedAttributes,
  );
  const colors = useSelector((state) => state.Variant?.colors);
  let variantAttributes = useSelector((state) => state.Variant?.attributes);
  const currentProduct = useSelector((state) => state.Product?.editProduct);

  const variants = useSelector((state) => state.Variant?.variants);

  const addCurrentProduct = useRef();

  addCurrentProduct.current = () => {
    dispatch(variantActions.addCurrentProduct(currentProduct));
  };
  const dispatch = useDispatch();
  const variantData = useRef();

  // useEffect(() => {
  // if (variantAttributes) {
  // let newUpdatedArray = [];
  // variantAttributes.map((attribute, index) => {
  //   let jsonAttribute = JSON.stringify(attribute);
  //   if (newUpdatedArray.indexOf(jsonAttribute) === -1) {
  //     newUpdatedArray.push(jsonAttribute);
  //     return newUpdatedArray;
  //   }//
  //   return;
  // });
  // variantAttributes = newUpdatedArray.map((item) => JSON.parse(item));
  //     newUpdatedArray = variantAttributes.map((item) => {
  //       if (
  //         newUpdatedArray.map((item) => item.id) ||
  //         [].indexOf(item.id) !== -1
  //       ) {
  //         console.log('newUpdatedArray==', newUpdatedArray);
  //         return;
  //       }
  //       newUpdatedArray.push(item);
  //     });
  //     console.log('newUpdated array>>', newUpdatedArray);
  //   }
  // }, [variantAttributes]);

  useEffect(() => {
    if (variants?.length) {
      variantActions.setToggleVariant(true);
    }
  }, [variants]);

  // useEffect(() => {
  //   console.log(isVariantActive);
  // }, [isVariantActive]);

  variantData.current = () => {
    dispatch(variantActions.getVariantColors());
    dispatch(variantActions.getVariantAttributes(product.category_id));
  };

  useEffect(() => {
    variantData.current();
    return () => {
      dispatch(variantActions.hideModal());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorSelection = (color) => {
    dispatch(variantActions.addSelectedColor(color, params.id));
  };
  const handleAttributes = (attribute) => {
    dispatch(variantActions.addSelectedAttribute(attribute, params.id));
  };
  const handleColorDeselect = (color) => {
    dispatch(variantActions.removeSelectedColor(color));
  };
  const handleDeselectAttribute = (attribute) => {
    dispatch(variantActions.removeSelectedAttribute(attribute));
  };
  const handleGeneratedAttrs = (attribute, option) => {
    const payload = {
      attribute,
      option,
    };
    dispatch(variantActions.handleSelectedAttribute(payload, params.id));
  };
  const handleDeselectGeneraratedAttribute = (attribute, option) => {
    const payload = {
      attribute,
      option,
    };
    dispatch(variantActions.handleDeselectedAttribute(payload));
  };

  return (
    <>
      <Row>
        <Col sm="9" lg="9">
          <Card>
            <CardHeader className="d-flex justify-content-between w-100 py-0 pb-1 pt-3">
              <h6>Create variants</h6>
              <Switch
                checked={isVariantActive}
                onChange={() => dispatch(variantActions.toggleVariant())}
              />
            </CardHeader>
            <CardBody className={isVariantActive ? '' : 'disabled'}>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Col sm="9">
                      <Label>Color</Label>

                      <Select
                        disabled={!isVariantActive}
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="add color"
                        onSelect={handleColorSelection}
                        onDeselect={handleColorDeselect}
                      >
                        {colors?.length &&
                          colors.map((color) => (
                            <Option key={color.id} value={color.id}>
                              {color.name}{' '}
                            </Option>
                          ))}
                      </Select>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm="9">
                      <Label>Attributes</Label>

                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="add attributes"
                        disabled={!isVariantActive}
                        onSelect={handleAttributes}
                        onDeselect={handleDeselectAttribute}
                      >
                        {variantAttributes?.length &&
                          variantAttributes?.map((attr) => {
                            if (attr) {
                              return (
                                <Option key={attr.id} value={attr.id}>
                                  {attr.name}
                                </Option>
                              );
                            }
                            return null;
                          })}
                      </Select>
                    </Col>
                  </FormGroup>
                  {selectedAttributes?.map((attribute, index) => {
                    return (
                      <FormGroup key={attribute.id}>
                        <Col sm="9">
                          <Label>{attribute.name}</Label>

                          <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            disabled={!isVariantActive}
                            placeholder="add attributes"
                            onSelect={(option) =>
                              handleGeneratedAttrs(attribute, option)
                            }
                            onDeselect={(option) =>
                              handleDeselectGeneraratedAttribute(
                                attribute,
                                option,
                              )
                            }
                          >
                            {attribute?.variantOptions.map((attr) => (
                              <Option key={attr.id} value={attr.id}>
                                {attr.name}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                      </FormGroup>
                    );
                  })}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="9" lg="9">
          <VariantList isVariantActive={isVariantActive} />
        </Col>
      </Row>
    </>
  );
};

export default AddVariants;
