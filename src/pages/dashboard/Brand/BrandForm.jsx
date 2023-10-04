import React, { useState,useEffect } from 'react';
import Imageupload from 'components/upload/ImageUploader';
import { Switch,Select } from 'antd';
import catActions from '../Category/redux/actions';
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import paths from 'route/paths';
import { useSelector,useDispatch } from 'react-redux';
import { allCategoryList } from 'utils';


const BrandForm = (props) => {
    const dispatch = useDispatch();
    const { register, isActive, setIsActive, Images, setFileList, id, redirected, brandData,setselectedCatList } = props;
    const [highlight, setHighlight] = useState(redirected);
    const formattedCategory = useSelector((state) => state.Category.list);
    const [allcategoryList, setallCategory] = useState(null);
    setTimeout(() => {
        setHighlight(false);
    }, 2000);


    useEffect(() => dispatch(catActions.getCategoryWithChild()), [])

    const handleCategorySelection = (data) => {
        setselectedCatList([data]);
    }

    useEffect(() => {
        if (Array.isArray(formattedCategory)) {
            let category = allCategoryList(formattedCategory);
            setallCategory(category);
        }
    }, [formattedCategory])

    const handleActive = (data) => {
        console.log(data)
        setIsActive(data);

    }

    return (
        <>
            <Form className="theme-form">
                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label">
                        Brand Name
                    </Label>
                    <Col sm="8">
                        <Input
                            defaultValue={brandData && brandData?.name ? brandData?.name : null}
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Brand Name"
                            innerRef={register({
                                required: true,
                            })}
                        />
                    </Col>
                </FormGroup>
                {/* description */}
                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label">
                        Description
                    </Label>
                    <Col sm="8">
                        <Input
                            defaultValue={brandData && brandData?.description ? brandData?.description : null}
                            className="form-control"
                            type="textarea"
                            name="description"
                            placeholder="Add discription about this brand."
                            innerRef={register({
                                required: false,
                            })}
                        />
                    </Col>
                </FormGroup>
                {/* Is Active */}
                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label">
                        Active
                    </Label>
                    <Col sm="8">
                        <Switch
                            className="ml-2"
                            // onChange={() => setIsActive(!isActive)}
                            onChange={handleActive}
                            checked={isActive}
                            name="isActive"

                        />
                    </Col>
                </FormGroup>


                {/* Image */}
                {id ?
                    <FormGroup className={highlight ? "row element highlight" : "row element"}>
                        <Label className="col-sm-2 col-form-label">
                            Upload Image
                        </Label>
                        <Col sm="8">
                            <Imageupload
                                url={paths.addBrandImage.replace(":id", id)} //url
                                editImg={true}
                                aspectRatioX={1}
                                aspectRatioY={1}
                                setFileList={setFileList} //state to set all uploaded file
                                Images={Images ? Images : []} // send currnt images if there are any
                            />
                        </Col>
                    </FormGroup>


                    : null}

                <FormGroup className="row">
                    <Label className="col-sm-2 col-form-label">
                        Category
                    </Label>
                    <Col sm="6">
                        {
                            brandData ?
                                <Select
                                    className='w-100'
                                    showSearch={true}
                                    placeholder="Select Category"
                                    onChange={(e) => handleCategorySelection(e)}
                                    defaultValue={brandData && brandData?.category_id ? [brandData?.category_id] : []}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {allcategoryList?.map((option) => (
                                        <Select.Option key={option?.value} value={option?.value}>
                                            {option?.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                                :
                                null
                        }
                        <>
                        </>
                    </Col>
                </FormGroup>
                {/* Image Ends. */}
            </Form>
        </>
    );
}

export default BrandForm;
