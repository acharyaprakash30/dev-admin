import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Container } from 'reactstrap';
import ModalForm from '../../../components/Modal/Modal';
import TableBasicActions from '../../../components/TableBasicActions';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';

const AllColors = () => {
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const colors = useSelector((state) => state.Colors.Colors);
  const searchResults = useSelector((state) => state.Colors.result);
  useEffect(() => {
    dispatch(actions.getColorReq());
  }, []);

  const deleteColor = (id) => {
    ConfirmDeleteDialogue('color').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.dltColorReq(id));
      }
    });
  };

  const [show, setShow] = useState(false);
  const closeModelHandler = () => setShow(false);
  const [modelObj, setModelObj] = useState({
    title: 'Edit Color',
  });

  const toggleEdit = (colorData) => {
    // set formodal
    setModelObj({
      ...modelObj,

      dataObj: {
        id: colorData.id,
        name: colorData.name,
      },
    });
    setShow(true);
  };
  const handleSave = (data) => {
    dispatch(actions.editColorReq(modelObj.dataObj.id, data));
    dispatch(actions.getColorReq());
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch(actions.searchColorReq(value));
  };

  //Filter only active data
  const activeFilter = (value) => value.isActive;
  //Map all the table results
  const tableResults = searching ? searchResults : colors;
  //Total number of items counter
  const resultCounter = tableResults.length;
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
        name: 'Color Code',
        selector: 'hexCode',
        sortable: true,
        cell: (item) => {
          return <Badge color={'info'}>{item.hexCode.toUpperCase()}</Badge>;
        },
      },
      {
        name: 'Actions',
        selector: 'actions',
        sortable: false,
        cell: (item) => (
          <TableBasicActions
            handleDelete={() => deleteColor(item.id)}
            handleEdit={() => toggleEdit(item)}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumb parent="Colors" title="All Colors" />
      <Container fluid={true}>
        <ModalForm
          show={show}
          data={modelObj}
          close={closeModelHandler}
          save={handleSave}
        />

        <div className="feature-products">
          <SearchBox
            handleInput={handleSearch}
            setStatus={searching}
            handleStatus={(value) => setSearching(value)}
            buttonText="Add Color"
            buttonLink="/dashboard/color/create"
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
    </>
  );
};

export default AllColors;
