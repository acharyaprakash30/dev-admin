import React, { useRef, useState } from 'react';
import {
  Label,
  Input,
  FormGroup,
  CardHeader,
  CardBody,
  Card,
  Container,
} from 'reactstrap';
import { useParams } from 'react-router';
import Imageupload from './upload/ImageUpload';

const ColorImageUpload = ({ setColorList, iterationCounter, getColorList }) => {
  const { id } = useParams();
  const [variantName, setVariantName] = useState([]);
  const [images, setImages] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const colorImageRef = useRef();

  const getImages = (data) => {
    let arr = [];
    return data?.map((image) => {
      if (image && image.response && image.response.length) {
        arr.push(image.response[0].url);
      }
      return setImages(arr);
    });
  };

  let myData = [];
  if (typeof setColorList == 'function') {
    myData[iterationCounter] = variantName;
  }

  if (typeof getColorList == 'function') {
    myData[iterationCounter] = variantName;
    getColorList(myData);
  }
  const handleVariantColor = (e) => {
    e.target.value.length > 1 ? setVisibility(true) : setVisibility(false);
    setVariantName(e.target.value);
  };

  return (
    <>
      <Container fluid={true}>
        <Card className="col-lg-12 col-md-12 mb-4">
          <CardHeader className="mt-2">
            <span>
              {' '}
              <h5>Variant Image</h5>
            </span>
          </CardHeader>
          <CardBody style={{ width: '100%' }}>
            <div>
              <FormGroup>
                <Label className="col-form-label">Color</Label>
                <Input
                  className="form-control"
                  name="variant_color"
                  type="text"
                  ref={colorImageRef}
                  onChange={handleVariantColor}
                />
              </FormGroup>
              <div className={visibility ? 'visible' : 'invisible'}>
                <Imageupload
                  multiple={true}
                  id={id}
                  data={{ variant_color: variantName }}
                  setToggle={setToggleFetch}
                  toggle={toggleFetch}
                  getUploadParams={getImages}
                  images={images}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ColorImageUpload;
