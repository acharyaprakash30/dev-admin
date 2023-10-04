import React, { useState, Fragment, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Tabs, Badge, Typography } from 'antd';
import Imageupload from '../product/upload/ImageUpload';
import VariantImageGallery from './VariantImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import variantAction from './redux/actions';
const { TabPane } = Tabs;

const { Text } = Typography;

const VariantImage = (props) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const selectedImage = useSelector((state) => state.Variant?.selectedImage);
  const productImages = useSelector((state) => state.Product?.productImages);
  const product = useSelector((state) => state.Product?.editProduct);

  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.Variant?.showModal);
  useEffect(() => {
    setSelectedCount(selectedImage?.length);
  }, [selectedImage]);
  return (
    <Fragment>
      <Modal modalClassName="fullpage-gallery" isOpen={showModal}>
        <ModalBody>
          <Tabs defaultActiveKey="1">
            <TabPane className="variant-gallery" tab="Select Image" key="1">
              <VariantImageGallery images={productImages} />
            </TabPane>
            <TabPane tab="Upload New Images" key="2">
              <Imageupload id={product.id} multiple={true} />
            </TabPane>
          </Tabs>
        </ModalBody>
        <ModalFooter className="d-flex w-100 justify-content-between">
          <Text>
            Total images selected:{' '}
            <Badge
              size="default"
              count={selectedCount}
              style={{ backgroundColor: '#52c41a' }}
            />
          </Text>{' '}
          <div>
            <Button onClick={props.toggle} color="secondary">
              Cancel
            </Button>
            <Button
              disabled={!!(selectedCount === 0)}
              onClick={() => dispatch(variantAction.saveSelectedImage())}
              color="primary ml-1"
            >
              Save
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default VariantImage;
