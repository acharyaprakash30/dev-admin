import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'reactstrap';
import TableBasicActions from '../../../components/TableBasicActions';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';

const AllVariants = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getVariantReq());
  }, []);
  const variants = useSelector((state) => state?.VariantDashboard?.Variant);

  const deleteVariant = (id) => {
    ConfirmDeleteDialogue('variant').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.dltVariantReq(id));
      }
    });
  };

  //Filter only active data
  const activeFilter = (value) => value.isActive;
  //Map all the table results
  const tableResults = variants;
  //Total number of items counter
  const resultCounter = tableResults?.length;
  //Active items
  const activeCounter = tableResults?.filter(activeFilter).length;
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
        name: 'Variant Options',
        selector: 'variantOptions',
        sortable: true,
        cell: (item) => {
          return item.variantOptions
            ? item.variantOptions.map((variant) => variant.name + ' | ')
            : [];
        },
      },
      {
        name: 'Actions',
        selector: 'actions',
        sortable: false,
        cell: (item) => (
          <TableBasicActions
            handleDelete={() => deleteVariant(item.id)}
            editUrl={`/dashboard/variant/${item.id}/edit`}
            viewUrl={`/dashboard/variant/${item.id}/edit`}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumb parent="Variants" title="All Variants" />
      <Container fluid={true}>
        <SearchBox
          handleInput={() => {}}
          setStatus={() => {}}
          handleStatus={() => {}}
          buttonText="Add Variant"
          buttonLink="/dashboard/variant/create"
        />

        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <DataTable
                  title={informationString}
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

export default AllVariants;
