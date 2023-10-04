import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, Col, Container, Row } from 'reactstrap';
import TableBasicActions from '../../../components/TableBasicActions';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';

const AllPlaceholderItems = () => {
  const dispatch = useDispatch();

  //placeholder items
  const placeholderItems = useSelector(
    (state) => state.PlaceholderItem.placeholderItems,
  );

  //search placeholders
  const searchResults = useSelector(
    (state) => state.PlaceholderItem.searchResult,
  );

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchPlaceholderItemsRequest());
  }, []);

  const deletePlaceholderItem = (id) => {
    ConfirmDeleteDialogue('PlaceholderItems').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deletePlaceholderItemRequest(id));
      }
    });
  };

  const searchplaceholderItems = (e) => {
    let value = e.target.value;
    dispatch(actions.searchPlaceholderItemRequest(value));
  };

  //Filter only active data
  const activeFilter = (value) => value.isActive;

  //Map all the table results
  const tableResults = searching ? searchResults : placeholderItems;

  //Total number of items counter
  const resultCounter = tableResults.length;

  //Active items
  const activeCounter = tableResults.filter(activeFilter).length;

  const informationString = `All (${resultCounter}) | Active (${activeCounter}) | Inactive(${
    resultCounter - activeCounter
  })`;

  const columns = useMemo(
    () => [
      {
        name: 'Model Name',
        selector: 'modelName',
        sortable: true,
        cell: (row) => row.modelName,
      },
      {
        name: 'order Column',
        selector: 'orderColumn',
        sortable: true,
        cell: (row) => row.orderColumn,
      },
      {
        name: 'placeholder Grp',
        selector: 'placeholderId',
        sortable: true,
        cell: (row) => row.placeholderId,
      },
      {
        name: 'Status',
        selector: 'isActive',
        sortable: true,
        cell: (item) => {
          return (
            <Badge color={item.isActive == 1 ? 'info' : 'secondary'}>
              {item.isActive == 1 ? 'Featured' : 'No'}
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
            handleDelete={() => deletePlaceholderItem(item.id)}
            editUrl={`/dashboard/placeholder-item/${item.id}/edit`}
          />
        ),

        // /dashboard/placeholder/:id/edit
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumb parent="Placeholders" title="All Placeholders" />
      <Container fluid={true}>
        <div className="feature-products">
          <SearchBox
            setStatus={searching}
            handleStatus={(value) => setSearching(value)}
            handleInput={searchplaceholderItems}
          />
        </div>

        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <DataTable
                  title={<p className="m-0 p-0">{informationString}</p>}
                  noHeader={true}
                  columns={columns}
                  data={tableResults}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default AllPlaceholderItems;

/**
 *   "id": 1,
        "modelId": "1",
        "modelName": "category",
        "orderColumn": 1,
        "isActive": true,
        "placeholderId": 1
 */
