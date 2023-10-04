import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CardBody, CardHeader, Container } from 'reactstrap';
import Gallery from '../../components/Gallery/EditGallery';
import productActions from './redux/action';
import Imageupload from './upload/ImageUpload';

const EditImageGallery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const Images = useSelector((state) => state.Product.productImages);
  const [toggleFetch, setToggleFetch] = useState(false);
  const handleDelete = (id) => {
    dispatch(productActions.deleteProductImage(id));
  };
  const fetchProductImage = useRef();
  fetchProductImage.current = () => {
    dispatch(productActions.fetchProductImages(id));
  };
  useEffect(() => {
    fetchProductImage.current();
  }, [toggleFetch]);

  useEffect(() => {
    fetchProductImage.current();
  }, []);
  return (
    <>
      <Container fluid={true}>
        <Imageupload
          multiple={true}
          id={id}
          setToggle={setToggleFetch}
          toggle={toggleFetch}
        />
      </Container>
      <Gallery
        toggle={toggleFetch}
        setToggle={setToggleFetch}
        handleDelete={handleDelete}
        isDeletable={true}
        images={Images}
      />
    </>
  );
};

export default EditImageGallery;
