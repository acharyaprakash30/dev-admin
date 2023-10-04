import actions from './redux/actions';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../../layout/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../../components/Modal/Modal';
import SearchBox from '../../../layout/search-box/index';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Badge, Card, Col, Container, Row } from 'reactstrap';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import TableBasicActions from '../../../components/TableBasicActions';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import utility from 'utils/Utility';
import { fileURLReader } from 'utils';
import NoImage from '../../../assets/images/noImg.png';

const Allshops = () => {
  const dispatch = useDispatch();

  const shops = useSelector((state) => state.Shop.Shop);
  const [searchTerm, setSearchTerm] = useState('');

  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const closeModelHandler = () => setShow(false);
  const [modelObj, setModelObj] = useState({
    title: 'Shop',
  });

  const searchResult = useSelector((state) => state.Shop.result);

  let [filteredData, setFilteredData] = useState(shops);
  // let searchResult = useSelector((state) => state.Role.result);
  const [filterValue, setFilterValue] = useState('');

  const deleteShopRef = useRef();
  const editShopRef = useRef();

  deleteShopRef.current = () => {
    dispatch(actions.deleteShopReq());
  };

  editShopRef.current = () => {
    dispatch(actions.editShopReq());
  };

  const fetchShops = () => dispatch(actions.fetchShopReq());

  //Fetch all the shops
  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    let filtered = shops;

    if (filterValue) {
      filtered = shops.filter((item) => item.state === filterValue);
    }
    setFilteredData(filtered);
  }, [filterValue, shops]);

  const toggleEdit = (shopData) => {
    // set formodal
    setModelObj({
      ...modelObj,
      dataObj: {
        id: shopData.id,
        name: shopData.name,
        description: shopData.description,
        address1: shopData.address1,
        address2: shopData.address2,
        address3: shopData.address3,
        address4: shopData.address4,
        city: shopData.city,
        state: shopData.state,
        country: shopData.country,
        status: shopData.isActive,
      },
    });
    setShow(true);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch(actions.searchShopReq(value));

    const shopList = shops.filter((value) =>
      value && value.id && value.id !== -2 && value.id !== -1 ? true : false,
    );

    setFilteredData(searchResult);
  };

  const deleteShop = (id) => {
    ConfirmDeleteDialogue('shop').then((result) => {
      if (result.isConfirmed) dispatch(actions.deleteShopReq(id));
    });
  };

  const handleSave = (data) => {
    const isActive = data.status === 'true' || false;
    delete data.status;
    dispatch(
      actions.editShopReq(modelObj.dataObj.id, {
        ...data,
        isActive: Boolean(isActive),
      }),
    );
    setShow(false);
  };

  const columns = React.useMemo(
    () => [
      {
        name: 'ID',
        widht: '20px',
        sortable: true,
        cell: (row) => row?.id,
      },
      {
        name: 'Logo',
        widht: '80px',
        cell: (row) => (
          <Image
            width="60px"
            height={'60px'}
            src={
              row?.shopProfileImage?.url
                ? fileURLReader(row?.shopProfileImage?.url)
                : NoImage
            }
          ></Image>
        ),
      },
      {
        name: 'Name',
        sortable: true,
        cell: (row) => <Link to={`/viewShop/${row.id}`}>{row.name}</Link>,
      },
      {
        name: 'Slug',
        selector: 'slug',
        sortable: true,
      },
      {
        name: 'Status',
        selector: 'isActive',
        sortable: true,
        cell: (item) => (
          <Badge color={item.isActive ? 'info' : 'secondary'}>
            {item.isActive ? 'Active' : 'InActive'}
          </Badge>
        ),
      },
      {
        name: 'Verification',
        selector: 'verified',
        sortable: true,
        cell: (item) => (
          <Badge color={item.verified === 1 ? 'info' : 'secondary'}>
            {item.verified === 1 ? 'Verified' : 'UnVerified'}
          </Badge>
        ),
      },
      {
        name: 'Actions',
        selector: 'actions',
        sortable: false,
        cell: (item) => (
          <TableBasicActions
            handleDelete={() => deleteShop(item.id)}
            handleEdit={() => toggleEdit(item)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Fragment>
      <ModalForm
        show={show}
        data={modelObj}
        close={closeModelHandler}
        save={handleSave}
      />
      <Breadcrumb parent="Shops" title="All Shops" />
      <Container fluid={true}>
        <div className="feature-products">
          <SearchBox
            handleInput={handleSearch}
            setStatus={searching}
            handleStatus={(value) => setSearching(value)}
            buttonText="Add Shop"
            placeholder={'Search by shop name'}
            value={searchTerm}
            onChange={(e) => setFilterValue(e.target.value)}
            buttonLink="/dashboard/shop/create"
            options={Array.from(new Set(shops.map((item) => item.state)))}
            filterText="Filter by province"
          />
        </div>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <DataTable
                  noHeader={true}
                  columns={columns}
                  data={filteredData}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Allshops;
