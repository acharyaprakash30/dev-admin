import React, { useEffect, useState, useRef } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { Cascader, Select } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import Imageupload from '../../../components/upload/ImageUploader';
import paths from 'route/paths';
import { parentCatListFormatter } from 'utils';
import { Spinner } from 'reactstrap';
import { useParams } from 'react-router';
// import { getSingleCategoryApi } from 'api/fetchCategory';
import { getCategoryTree } from '../../../utils/getCategoryTree';

const CategoryForm = ({
  setDescription,
  setFeatured,
  setOnHomepageWeb,
  setOnHomepageMobile,
  setOnCollection,
  register,
  // currentCategory,
  redirected,
  setFileList,
  Images,
  category,
  setOnParentId,
  setOnKtmMart,
  setIsActive,
}) => {
  const { id } = useParams();
  const getCategoryState = useSelector((state) => state.Category);
  const formattedCategory = getCategoryState?.list;
  const categoryList = getCategoryState?.Category;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [highlight, setHighlight] = useState(redirected);
  const [HomepageWeb, setHomepageWeb] = useState(null);
  const [name, setName] = useState(null);
  const [HomepageMobile, setHomepageMobile] = useState(null);
  const [isactive, setIsactive] = useState(null);
  const [ktmmart, setKtmMart] = useState(null);
  const [collection, setCollecton] = useState(null);
  const [feature, setFeature] = useState(null);
  const [parentId, setParentId] = useState();
  const [catTree, setcatTree] = useState([]);
  let currentCategory = categoryList?.find((value) => value.id === Number(id));

  useEffect(() => {
    if (currentCategory) {
      let a = getCategoryTree(currentCategory.id, categoryList);
      a.pop();
      setcatTree(a);
      if (currentCategory?.image) {
        setFileList([{ url: currentCategory?.image }]);
      }
      if (!currentCategory?.image) {
        setFileList([]);
      }
    }
  }, [categoryList, currentCategory]);

  useEffect(() => {
    if (currentCategory) {
      //Set the description if the value is set
      const data = currentCategory ? currentCategory['description'] : null;
      console.log(currentCategory);

      const contentBlock = data ? htmlToDraft(data) : null;
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const finalState = EditorState.createWithContent(contentState);

        setEditorState(finalState);
      }
      if (currentCategory) {
        setFeature(currentCategory['featured']);
        setFeatured(currentCategory['featured']);
      }
      if (currentCategory) {
        setHomepageWeb(currentCategory['onHomepageWeb']);
        setOnHomepageWeb(currentCategory['onHomepageWeb']);
      }
      if (currentCategory) {
        setHomepageMobile(currentCategory['onHomepageMobile']);
        setOnHomepageMobile(currentCategory['onHomepageMobile']);
      }
      if (currentCategory) {
        setCollecton(currentCategory['onCollection']);
        setOnCollection(currentCategory['onCollection']);
        setParentId(currentCategory['parentId']);
        setOnParentId(currentCategory['parentId']);
        setDescription(currentCategory['description']);
        setOnKtmMart(currentCategory['onKtmMart']);
        setKtmMart(currentCategory['onKtmMart']);
        setIsactive(currentCategory['isActive']);
        setIsActive(currentCategory['isActive']);
        // setcatTree([...currentCategory['categoryTree']]);
      }
    }
  }, [currentCategory]);

  //Change the state of the editor
  const handleEditorStateChange = (data) => {
    const html = draftToHtml(convertToRaw(data.getCurrentContent()));
    setEditorState(data);
    setDescription(html);
  };

  const handleFeatured = () => {
    setFeature(!feature);
    setFeatured(!feature);
  };
  const handleHomepageWeb = () => {
    setHomepageWeb(!HomepageWeb);
    setOnHomepageWeb(!HomepageWeb);
  };

  const handleIsActive = () => {
    setIsActive(!isactive);
    setIsactive(!isactive);
  };

  const handleHomepageMobile = () => {
    setHomepageMobile(!HomepageMobile);
    setOnHomepageMobile(!HomepageMobile);
  };

  const handleKtmKart = () => {
    setOnKtmMart(!ktmmart);
    setKtmMart(!ktmmart);
  };

  const handleCollection = () => {
    setCollecton(!collection);
    setOnCollection(!collection);
  };

  const handleParentId = (value) => {
    if (value?.length > 0) {
      let parentCat = value[value.length - 1];
      setParentId(parentCat);
      setOnParentId(parentCat);
    }
  };
  return (
    <Row>
      <Col>
        <FormGroup className="row">
          <Label className="col-sm-2 col-form-label">Category Name</Label>
          <Col sm="8">
            <Input
              className="form-control"
              type="text"
              name="name"
              innerRef={register({
                required: true,
              })}
              defaultValue={currentCategory ? currentCategory['name'] : null}
              placeholder="Category Name"
            />
          </Col>
        </FormGroup>

        <FormGroup className="row">
          <Label className="col-sm-2 col-form-label">Description</Label>
          <Col sm="8">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorStateChange}
            />
          </Col>
        </FormGroup>

        <FormGroup className="row">
          <Label className="col-sm-2 col-form-label">Parent Category</Label>
          <Col sm="10">
            {currentCategory && catTree && catTree.length > 0 ? (
              catTree?.length && catTree[0] !== -1 ? (
                (console.log(catTree),
                (
                  <Cascader
                    options={[
                      { label: 'Select Category', value: -1 },
                      ...formattedCategory,
                    ]}
                    className="w-50"
                    name="asd"
                    onChange={handleParentId}
                    fieldNames={{
                      label: 'name',
                      value: 'id',
                      children: 'children',
                    }}
                    defaultValue={currentCategory ? catTree : [-1]}
                    changeOnSelect
                  />
                ))
              ) : (
                <Spinner></Spinner>
              )
            ) : null}

            {catTree.length == 0 ? (
              <Cascader
                options={[
                  { label: 'Select Category', value: -1 },
                  ...formattedCategory,
                ]}
                className="w-50"
                name="asd"
                onChange={handleParentId}
                fieldNames={{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }}
                changeOnSelect
              />
            ) : null}

            {/* <Select onChange={handleParentId} name="parentId" className='w-50' value={parentId}>
              {
               parentCatList?.length &&  parentCatList?.map(cat => (
                  <Select.Option value={cat?.value}>{cat?.label}</Select.Option>
                ))}
            </Select> */}
          </Col>
        </FormGroup>

        <FormGroup className="row">
          <Col sm="6">
            <Row>
              <Label className="col-sm-4 col-form-label">
                Order Position (Order of items)
              </Label>
              <Col sm="6">
                <Input
                  className="form-control"
                  type="number"
                  name="orderColumn"
                  innerRef={register()}
                  placeholder="Order Position eg. 1,2 "
                  defaultValue={
                    currentCategory ? currentCategory['orderColumn'] : 0
                  }
                />
              </Col>
            </Row>
          </Col>

          <Col sm="6">
            <Label className="col-md-10 offset-md-1 col-form-label" check>
              <Input
                type="checkbox"
                name="featured"
                innerRef={register()}
                checked={feature}
                onChange={handleFeatured}
                onTouchEnd={handleFeatured}
              />{' '}
              Featured (Add on priority)
            </Label>
          </Col>
          <Col sm="12" className="pt-3">
            <h5 className="mt-2 mb-1">Display:</h5>
            <FormGroup>
              <Col sm="12" className="pt-3">
                <Label className="col-sm-2 col-form-label"></Label>
                <Label className="col-sm-6" check>
                  <Input
                    type="checkbox"
                    name="onHomepageWeb"
                    innerRef={register()}
                    checked={HomepageWeb}
                    onChange={handleHomepageWeb}
                    onTouchEnd={handleHomepageWeb}
                  />{' '}
                  Show on web (homepage)
                </Label>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm="12" className="pt-3">
                <Label className="col-sm-2 col-form-label"></Label>
                <Label className="col-sm-6" check>
                  <Input
                    type="checkbox"
                    name="onHomepageMobile"
                    innerRef={register()}
                    checked={HomepageMobile}
                    onChange={handleHomepageMobile}
                    onTouchEnd={handleHomepageMobile}
                  />{' '}
                  Show on mobile (homepage)
                </Label>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col sm="12" className="pt-3">
                <Label className="col-sm-2 col-form-label"></Label>
                <Label className="col-sm-6" check>
                  <Input
                    type="checkbox"
                    name="onHomepageMobile"
                    innerRef={register()}
                    checked={collection}
                    onChange={handleCollection}
                    onTouchEnd={handleCollection}
                  />{' '}
                  Show on collection
                </Label>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm="12" className="pt-3">
                <Label className="col-sm-2 col-form-label"></Label>
                <Label className="col-sm-6" check>
                  <Input
                    type="checkbox"
                    name="onKtmMart"
                    innerRef={register()}
                    checked={ktmmart}
                    onChange={handleKtmKart}
                    onTouchEnd={handleKtmKart}
                  />{' '}
                  Show on Ktm Mart
                </Label>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm="12" className="pt-3">
                <Label className="col-sm-2 col-form-label"></Label>
                <Label className="col-sm-6" check>
                  <Input
                    type="checkbox"
                    name="isActive"
                    innerRef={register()}
                    checked={isactive}
                    onChange={handleIsActive}
                    onTouchEnd={handleIsActive}
                  />{' '}
                  Is Active
                </Label>
              </Col>
            </FormGroup>
          </Col>
        </FormGroup>
      </Col>

      {/* Image */}
      <Col sm="12">
        {id ? (
          <FormGroup
            className={highlight ? 'row element highlight' : 'row element'}
          >
            <Label className="col-sm-2 col-form-label">
              <b>Upload Image</b>
            </Label>
            <Col sm="8">
              <Imageupload
                url={paths.addCategoryImage.replace(':id', id)} //url
                // editImg={true}
                categoryName={name}
                aspectRatioX={1}
                aspectRatioY={1}
                setFileList={setFileList} //state to set all uploaded file
                Images={Images ? Images : []} // send currnt images if there are any
                ref={register()}
                maxImageUpload={1}
                id={id}
              />
            </Col>
          </FormGroup>
        ) : null}
      </Col>
      {/* Image Ends. */}
    </Row>
  );
};

export default React.memo(CategoryForm);
