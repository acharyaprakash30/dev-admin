import React, { useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
// redux
import user from './redux/action';
import { useDispatch, useSelector } from 'react-redux';

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const fetchUser = useRef();
  fetchUser.current = () => {
    if (!userList.length) {
      dispatch(user.getUsers());
    }
  };
  useEffect(() => {
    fetchUser.current();
  }, []);

  const supportColumns = [
    {
      name: 'First Name',
      selector: 'firstName',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Middle Name',
      selector: 'middleName',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Last Name',
      selector: 'lastName',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Username',
      selector: 'username',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Created On',
      selector: 'createdOn',
      sortable: true,
      center: true,
      width: '200px',
      style: {
        textAlign: 'center',
        padding: '0px',
      },
    },
    {
      name: 'Actions',
      selector: 'action',
      sortable: true,
      center: true,
      width: '400px',
    },
  ];

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{'All Users'}</h5>
                <span>{'List of all users.'}</span>
              </CardHeader>
              <CardBody>
                <div className="table-responsive support-table">
                  <DataTable
                    columns={supportColumns}
                    data={userList}
                    striped={true}
                    center={true}
                    pagination
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
