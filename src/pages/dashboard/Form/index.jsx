import { Cascader } from 'antd';
import "antd/dist/antd.css";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap';
// components
import FormAccordion from './form-specification-accordion';
import Breadcrumb from '../../../layout/breadcrumb';
import PreviewModal from './form-preview-modal';
// redux
import catActions from '../Category/redux/actions';

export default React.memo(({
    title,
    submitForm,
    errors,
    deleteFormGroupHandler,
    deleteFormSpecHandler,
    handleCategorySelection,
    addFormGroup,
    onChangeFormGroup,
    addFormSpec,
    onChangeFormSpec,
    toggle,
    preview,
    formState,
    editBtnDisabled
}) => {

    const dispatch = useDispatch();

    const formattedCategory = useSelector((state) => state.Category.list);

    useEffect(() => dispatch(catActions.getCategoryWithChild()), [])
    
    return (
        <>
            <Breadcrumb parent="Users" title="FormGroup Details" />
            <Container fluid={true}>
                {/* category cascade menu */}
                <Card className="pt-4 px-4">
                    <h5>Select Category</h5>
                    <div className="my-4" style={{ width: '20em' }}>
                        <Cascader
                            fieldNames={{
                                label: 'name',
                                value: 'id',
                                children: 'children'
                            }}
                            className="form-control border-0"
                            onChange={handleCategorySelection}
                            notFoundContent="No category found`"
                            options={formattedCategory}
                            placeholder="Select a category"
                        />
                    </div>

                </Card>
                {/* formgroup details */}
                <Row>
                    <Col sm="12">
                        <Card className="pt-4 px-4">
                            <h5>{title} Formgroup</h5>
                            <Form className="form theme-form">
                                <CardBody>
                                    <Row>
                                        <Col>
                                            {/* render form from state */}
                                            {formState.formgroups.map((formgroup, i) => {
                                                return (
                                                    <div key={formgroup.id}>
                                                        {/* formgroup name */}
                                                        <FormGroup className="row">
                                                            <Label className="col-sm-3 col-form-label">
                                                                FormGroup Name
                                                            </Label>
                                                            <Col sm="9">
                                                                <Row>
                                                                    <Col sm="10">
                                                                        <Input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="name"
                                                                            value={formgroup.name}
                                                                            onChange={(e) =>
                                                                                onChangeFormGroup(e, formgroup.id)
                                                                            }
                                                                            placeholder="eg. Dimension / Size"
                                                                        />
                                                                        {errors?.label ? (
                                                                            <span className="text-danger pt-5 mt-5">
                                                                                {' '}
                                                                                This field is required.
                                                                            </span>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </Col>
                                                                    <Col sm="2">
                                                                        <Button
                                                                            color="danger"
                                                                            className="mr-1"
                                                                            onClick={() =>
                                                                                deleteFormGroupHandler(formgroup.id)
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </FormGroup>
                                                        {/* formgroup order */}
                                                        <FormGroup className="row">
                                                            <Label className="col-sm-3 col-form-label">
                                                                Order
                                                            </Label>
                                                            <Col sm="9">
                                                                <Input
                                                                    className="form-control"
                                                                    type="number"
                                                                    name="order_position"
                                                                    value={formgroup.order_position || i + 1}
                                                                    onChange={(e) =>
                                                                        onChangeFormGroup(e, formgroup.id)
                                                                    }
                                                                    placeholder="order"
                                                                />
                                                                {errors?.label ? (
                                                                    <span className="text-danger pt-5 mt-5">
                                                                        {' '}
                                                                        This field is required.
                                                                    </span>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </Col>
                                                        </FormGroup>
                                                        {/* form specification */}
                                                        <FormAccordion
                                                            formgroup={formgroup}
                                                            addFormSpec={addFormSpec}
                                                            deleteFormSpec={deleteFormSpecHandler}
                                                            onChangeFormSpec={onChangeFormSpec}
                                                        />
                                                        <hr />
                                                    </div>
                                                );
                                            })}
                                        </Col>
                                    </Row>
                                    {/* Add Formgroup Button */}
                                    <div className="text-center">
                                        <Button
                                            className="py-3"
                                            color="success"
                                            onClick={addFormGroup}
                                            size="lg"
                                        >
                                            <i className="fa fa-plus"></i> {'  '}
                                            Add FormGroup
                                        </Button>
                                    </div>
                                </CardBody>
                                {/* footer */}
                                <CardFooter>
                                    <Button
                                        className="mr-4"
                                        color="dark"
                                        outline={true}
                                        onClick={toggle}
                                    >
                                        Preview FormGroup
                                    </Button>
                                    <Button
                                        color="null text-white"
                                        className="submit-button"
                                        type="submit"
                                        onClick={submitForm}
                                        disabled={!editBtnDisabled}
                                    >
                                        Submit {title}
                                    </Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                <PreviewModal toggle={toggle} preview={preview} formState={formState} />
            </Container>
        </>
    )
}

)
