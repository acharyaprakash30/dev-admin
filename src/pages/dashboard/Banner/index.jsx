import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
  Spinner
} from 'reactstrap';
import { Image, Tag,Tooltip } from 'antd';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
import Loading from 'components/ProgressModal/Progress';
import DataTable from 'react-data-table-component';
import Table from 'components/Table/Table';
import paths from 'route/paths';
import { fileURLReader } from 'utils';
import NoImage from '../../../assets/images/noImg.png'


const AllDeals = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const showModal = (id) => {
    setModalDeleteId(id);
    setModalDelete(true);
  }

  const deleteDeal = (id) => {
    setModalDelete(false);
    dispatch(actions.deleteBanner(id));
  }

  const readBannerState = useSelector((state) => state.Banner.readBanner);

  useEffect(() => {
    dispatch(actions.readBanner());
  }, []);

  const deleteBannerState = useSelector((state) => state.Banner.deleteBanner);

  useEffect(() => {
    if (deleteBannerState.success) {
      dispatch(actions.readBanner());
    }

  }, [deleteBannerState]);

  const tableHeader = [
    {
      name: 'Agent',
      center: true,
      cell: (row) => <Label>{row?.agent}</Label>
    },
    {
      name: 'Title',
      center: true,
      cell: (row) => <Label>{row?.buttonTitle || "N/A"}</Label>
    },
    
    {
      name: 'Section',
      center: true,
      cell: (row) => <Label>{row?.section}</Label>
    },
    {
      name: 'Position',
      center: true,
      cell: (row) => <Label>{row?.position}</Label>
    },
    {
      name: 'Image',
      center: true,
      cell: (row) => <Image className='pb-1 pt-1' style={{clipPath:'circle(30%)'}} width={"120px"} height={"80px"} src={Array?.isArray(row?.images) && row?.images?.length>0  && !row.images[0].includes('https://a.classified.doransoft.com') ? fileURLReader(row?.images[0]) : NoImage}></Image>
    },
    {
      name: 'Is Active',
      center: true,
      cell: (row) => <Tag>{row?.isActive ? "Verified" : "Unverified"}</Tag>
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <>
          <Tooltip title="Edit">
              <Button color="info" className="mr-1 btn-sq-effect" onClick={()=>history.push(`/banners/${row?.id}`)} >
                <i className="fa fa-pencil"></i>
              </Button>
          </Tooltip>
          &nbsp;
          <Tooltip title="Delete">
            <Button color="danger" className="mr-1 btn-sq-effect" onClick={() => showModal ? showModal(row?.id) : null}>
              <i className="fa fa-trash"></i>
            </Button>
          </Tooltip>
        </>
      )
    }

  ];

  return (
    <Fragment>

      {/**Loading Modal*/}
      <Loading show={deleteBannerState?.loading} title={"Deleting...."} type="danger" />
      {/**Loading Modal Ends*/}

      {/** Delete Modal */}
      <Modal isOpen={modalDelete} toggle={() => { setModalDelete(false) }}>
        <ModalHeader toggle={() => { setModalDelete(false) }}>Delete Banner</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this banner??
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => { setModalDeleteId(null); setModalDelete(false) }}>
            Close
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => deleteDeal(modalDeleteId)}
          >
            <i className="fa fa-trash"></i> Delete
          </Button>
        </ModalFooter>
      </Modal>
      {/** Delete Modal Ends*/}

      <Breadcrumb parent="Users" title="Banners" />
      <Container fluid={true}>
        {/* filter */}
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3">
              <div className={`product-sidebar }`}>
                <div className="filter-section">
                  <Card>
                    <CardHeader>
                      <h6 className="mb-0 f-w-600">
                        Filters
                        <span className="pull-right">
                          <i className="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </Col>
            <Col xl="6" sm="6">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="search"
                    onChange={e => setSearchText(e.target.value)}
                  />
                  <i className="fa fa-search"></i>
                </FormGroup>
              </Form>
            </Col>

            {/* <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select className="form-control btn-square" name="select">
                  <option value="Featured">Featured</option>
                  <option value="LowestPrices">LowestPrices</option>
                  <option value="HighestPrices">HighestPrices</option>
                </select>
              </div>
            </Col> */}
          </Row>
        </div>
        <div className="edit-profile">

          <Row>
            <Col md="12">
              <Card>
                {
                  readBannerState?.data ?
                <DataTable
                  columns={tableHeader}
                  data={readBannerState?.data}
                  noHeader
                  responsive
                ></DataTable>
                : <Spinner></Spinner>
                }
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default AllDeals;
