import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Update, Edit, Delete } from '../../constant';

const ActionButton = ({ id, onEdit, onView, onDelete }) => {
  return (
    <div>
      {onView && (
        <Button color="info" className="m-1" onClick={onView} size="sm">
          <i className="fa fa-eye"></i> {'View'}
        </Button>
      )}

      {/* <Link to={`/product/edit/${id}`} style={{ color: 'white' }}>
        <Button color="primary" className="m-1" onClick={onEdit} size="sm">
          <i className="fa fa-pencil" style={{ color: 'white' }}></i>
          {Edit}
        </Button>
      </Link> */}
      {onDelete && (
        <Button color="danger" className="m-1" onClick={onDelete} size="sm">
          <i className="fa fa-trash"></i> {Delete}
        </Button>
      )}
    </div>
  );
};

export default ActionButton;
