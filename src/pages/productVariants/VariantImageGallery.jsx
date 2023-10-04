import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Media } from 'reactstrap';
import { APP_CONFIG } from '../../app/config';
import variantAction from './redux/actions';
import productAction from '../product/redux/action';
import { useParams } from 'react-router-dom';
const VariantImageGallery = ({ images }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const handleImageSelect = (url) => {
    dispatch(variantAction.addSelectedImage(url));
  };
  const selectedImage = useSelector((state) => state.Variant.selectedImage);
  // useEffect(() => {
  //   dispatch(productAction.fetchProductImages(params?.id));
  // }, [images]);
  return (
    <>
      {images.map((image) => {
        return (
          <>
            <figure
              onClick={() => handleImageSelect(image.key)}
              className={`d-flex image-figure justify-content-center m-1 ${
                selectedImage.includes(image.url) ? 'selected' : ''
              }`}
            >
              <Media
                src={`${APP_CONFIG.ASSET_MANAGER}/${image.key}`}
                className={`img-thumbnail bg-gray w-100`}
              />
            </figure>
          </>
        );
      })}
    </>
  );
};

export default VariantImageGallery;
