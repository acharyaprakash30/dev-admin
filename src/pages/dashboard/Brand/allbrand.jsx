import React, { Fragment, useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Container } from 'reactstrap';
import ViewModel from 'components/Modal/ViewModal';
import TableBasicActions from 'components/TableBasicActions';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';
import Loading from 'components/ProgressModal/Progress';
import { Redirect } from 'react-router-dom';
import paths from 'route/paths';
import { absImageUrl } from 'utils/url';

const AllBrands = (props) => {
  const dispatch = useDispatch();
  const getBrandsRef = useRef();
  const deleteBrandsRef = useRef();
  const editBrandRef = useRef();

  getBrandsRef.current = () => {
    dispatch(actions.getBrandReq());
  };

  deleteBrandsRef.current = (id) => {
    dispatch(actions.deleteBrandReq(id));
  };

  editBrandRef.current = (data) => {
    dispatch(actions.editBrandReq(modelObj.dataObj.id, data));
  };

  useEffect(() => {
    getBrandsRef.current();
    actions.getBrandReq();
  }, []);

  useEffect(() => {
    dispatch(actions.getBrandReq());
  }, []);

  const brands = useSelector((state) => state.Brand.Brand);
  const [searching, setSearching] = useState(false);
  const searchResults = useSelector((state) => state.Brand.result);

  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(false);

  const [modelObj, setModelObj] = useState({
    title: 'Brand',
  });

  const toggleEdit = (brandData) => {
    setCurrentBrand(brandData);
    setRedirect(true);
  };

  const handleView = (brandData) => {
    setCurrentBrand({
      ...brandData,
      ...(brandData?.image ? { image: absImageUrl(brandData?.image) } : {}),
    });
    setShow(true);
  };

  const deleteBrand = (id) => {
    ConfirmDeleteDialogue('brand').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteBrandReq(id));
      }
    });
  };

  const handleSave = (data) => {
    editBrandRef.current(data);
    getBrandsRef.current();
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch(actions.searchBrandReq(value));
  };

  //Filter only active data
  const activeFilter = (value) => value.isActive;
  //Map all the table results
  const tableResults = searching ? searchResults : brands;
  //Total number of items counter
  const resultCounter = tableResults.length || 0;
  //Active items
  const activeCounter = tableResults.filter(activeFilter).length;
  const informationString = `All (${resultCounter}) | Active (${activeCounter}) | Inactive(${
    resultCounter - activeCounter
  })`;

  const columns = React.useMemo(
    () => [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        cell: (row) => row.name,
      },
      {
        name: 'Featured',
        selector: 'featured',
        sortable: true,
        cell: (item) => {
          return (
            <Badge
              color={item.featured && item.featured == 1 ? 'info' : 'secondary'}
            >
              {item.featured && item.featured == 1 ? 'Featured' : ''}
            </Badge>
          );
        },
      },
      {
        name: 'Actions',
        selector: 'actions',
        sortable: false,
        cell: (item) => (
          <TableBasicActions
            handleView={() => handleView(item)}
            handleDelete={() => deleteBrand(item.id)}
            handleEdit={() => toggleEdit(item)}
            //viewUrl={`/dashboard/brand/${item.id}/edit`}
          />
        ),
      },
    ],
    [],
  );

  const brandsState = useSelector((state) => state?.Brand?.deleteBrand);

  if (redirect && !!currentBrand) {
    return (
      <Redirect
        from={paths.Brands}
        to={{
          pathname: paths.editBrand.replace(':id', currentBrand.id),
          currentBrand: currentBrand,
        }}
      />
    );
  }

  return (
    <Fragment>
      <Loading
        show={brandsState?.loading}
        title={'Deleting....'}
        type="danger"
      />
      <ViewModel currentItem={currentBrand} show={show} setShow={setShow} />
      <Breadcrumb parent="Brand" title="All Brands" />
      <Container fluid={true} className="mb-3">
        <div className="feature-products">
          <SearchBox
            handleInput={handleSearch}
            setStatus={searching}
            handleStatus={(value) => setSearching(value)}
            buttonText="Add Brand"
            placeholder={'Search by brand'}
            buttonLink="/dashboard/brand/create"
          />
        </div>
        <div className="edit-profile">
          <DataTable
            title={<p className="m-0 p-0">{informationString}</p>}
            noHeader={true}
            columns={columns}
            data={tableResults}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default AllBrands;
