import React,{ Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const TableBasicActions = ({
  editUrl,
  viewUrl,
  handleDelete,
  handleEdit,
  handleView,
  hideDelete,
}) => {
  const editButtonHandle = {};
  if (typeof handleEdit === 'function') {
    editButtonHandle.onClick = handleEdit;
  }
  return (
    <Fragment>
      {handleView || viewUrl ? (
        <Link to={viewUrl}>
          <Button
            className="mr-1 no-padding-circle"
            size="sm"
            color="secondary"
            onClick={handleView}
          >
            <i className="fa fa-eye "></i>
          </Button>
        </Link>
      ) : null}

      {handleEdit || editUrl ? (
        <Link to={editUrl ? editUrl : '#'}>
          <Button
            className="mr-1 btn-sq-effect"
            size="sm"
            color="info"
            {...editButtonHandle}
          >
            <i className="fa fa-pencil "></i>
          </Button>
        </Link>
      ) : null}
      {hideDelete ?? (
        <Button color="danger btn-sq-effect" size="sm" onClick={handleDelete}>
          <i className="fa fa-trash"></i>
        </Button>
      )}
    </Fragment>
  );
};

export default TableBasicActions;
