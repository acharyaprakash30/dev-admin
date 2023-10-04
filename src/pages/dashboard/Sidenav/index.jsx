import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Card, Col, Container, Row } from 'reactstrap';
import TableBasicActions from '../../../components/TableBasicActions';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';

const SiteNav = () => {

  const dispatch = useDispatch();

  //siteNav
  const siteNavs = useSelector((state) => state.SiteNav.siteNav);

  //search siteNav
  const searchResults = useSelector((state) => state.SiteNav.result);

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchSideNavRequest());
  }, []);


  /**
   *  delete Site Nav
   * @param {int} id 
   */
  const deletSiteNav = (id) => {

    ConfirmDeleteDialogue('siteNav').then((result) => {

      if (result.isConfirmed) {
        dispatch(actions.dltSideNavReq(id));
      }
    });
  };





  const searchSiteNav = (e) => {
    let value = e.target.value;
    dispatch(actions.searchSideNavReq(value));
  };


  //Filter only active data
  const activeFilter = (value) => value.status;
  //Map all the table results
  const tableResults = searching ? searchResults : siteNavs;

  //Total number of items counter
  const resultCounter = tableResults.length;
  //Active items
  const activeCounter = tableResults.filter(activeFilter).length;

  const informationString = `All (${resultCounter}) | Active (${activeCounter}) | Inactive(${resultCounter - activeCounter
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
        name: 'URL',
        selector: 'url',
        sortable: true,
        cell: (row) => row.url,
      },
      {
        name: 'order Position',
        selector: 'order_position',
        sortable: true,
        cell: (row) => row.order_position,
      },
      {
        name: 'Icon',
        selector: 'icon',
        sortable: true,
        cell: (row) => row.icon,
      },
      {
        name: 'Type',
        selector: 'type',
        sortable: true,
        cell: (row) => row.type,
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
        cell: (item) => {
          return (
            <Badge color={item.status == 1 ? 'info' : 'secondary'}>
              {item.status == 1 ? 'Featured' : 'No'}
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
            handleDelete={() => deletSiteNav(item.id)}
            editUrl={`/dashboard/site-nav/${item.id}/edit`}
          // viewUrl={`/dashboard/site-nav/${item.id}/view`}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumb parent="Site Nav" title="All Site Nav" />
      <Container fluid={true}>
        <div className="feature-products">
          <SearchBox
            setStatus={searching}
            handleStatus={(value) => setSearching(value)}
            handleInput={searchSiteNav}
            buttonText="Add Site-Nav"
            buttonLink = "/dashboard/site-nav/create"
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

export default SiteNav;
