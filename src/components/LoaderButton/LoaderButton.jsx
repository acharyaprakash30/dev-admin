import React from 'react';
import { Spinner, Button } from 'reactstrap';

const LoaderButton = ({ isLoading, type, title, children, ...rest }) => {
  return (
    <>
      <Button type={type} {...rest}>
        {children?.length > 0 ? (
          isLoading ? (
            <Spinner color="primary-color" size="sm" />
          ) : (
            children
          )
        ) : isLoading ? (
          <Spinner color="primary-color" size="sm" />
        ) : (
          title
        )
        }
      </Button>
    </>
  );
};

export default LoaderButton;
