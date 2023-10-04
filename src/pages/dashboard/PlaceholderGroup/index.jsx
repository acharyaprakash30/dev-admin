import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
    Badge,
    Card,
    Col, Container, Row
} from 'reactstrap';
import TableBasicActions from '../../../components/TableBasicActions';
import ShowMessage from '../../../components/Toast/Toast';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import actions from './redux/actions';

const PlaceholderGroup = () => {

    const dispatch = useDispatch();

    //placeholders
    const pGroups = useSelector((state) => state.PlaceholderGroup.data);

    //search placeholders
    const searchResults = useSelector((state) => state.PlaceholderGroup.result);

    // error message
    const serverError = useSelector(state => state.PlaceholderGroup.message);


    const [searching, setSearching] = useState(false);


    useEffect(() => {
        dispatch(actions.getPlaceholderReq())
    }, []);


    const deletePGroup = (id) => {


        ConfirmDeleteDialogue('placeholderGroup').then((result) => {
            if (result.isConfirmed) {
                dispatch(actions.dltPlaceholderReq(id))
            }
        })
    }


    // if (serverError)return (ShowMessage(401, serverError));





    const searchPGroups = (e) => {
        let value = e.target.value;
        dispatch(actions.searchPlaceholderReq(value));
    }

    //Filter only active data
    const activeFilter = (value) => value.isActive;

    //Map all the table results
    const tableResults = searching ? searchResults : pGroups;

    //Total number of items counter
    const resultCounter = tableResults.length;

    //Active items
    const activeCounter = tableResults.filter(activeFilter).length;


    const informationString = `All (${resultCounter}) | Active (${activeCounter}) | Inactive(${resultCounter - activeCounter})`;



    const columns = useMemo(() => [

        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            cell: row => row.title
        },

        {
            name: 'Description',
            selector: 'description',
            sortable: true,
            cell: item => {
                if (item?.description && item?.description.length > 20) {
                    return `${item.description.slice(0, 30)}...`
                }
                return item.description
            }
        },
        {
            name: 'Type',
            selector: 'type',
            sortable: true,
            cell: row => row.type
        },
        {
            name: 'Agent',
            selector: 'agent',
            sortable: true,
            cell: row => row.agent
        },
        {
            name: 'Status',
            selector: 'isActive',
            sortable: true,
            cell: item => {
                return (
                    <Badge
                        color={item.isActive == 1 ? "info" : "secondary"}>
                        {item.isActive == 1 ? "Featured" : "No"}
                    </Badge>
                )
            }
        },
        {
            name: 'Actions',
            selector: 'actions',
            sortable: false,
            cell: item => (
                <TableBasicActions
                    handleDelete={() => deletePGroup(item.id)}
                    editUrl={`/dashboard/placeholder/${item.id}/edit`}
                    viewUrl={`/dashboard/placeholder/${item.id}/show`}
                />)

            // /dashboard/placeholder/:id/edit
        },


    ], []);


    return (

        serverError !== null ?
            <>
                <Breadcrumb parent="Placeholders" title="All Placeholders" />
                <Container fluid={true}>

                    <div className="feature-products">
                        <SearchBox
                            setStatus={searching}
                            handleStatus={(value) => setSearching(value)}
                            handleInput={searchPGroups}
                            buttonText="Add Placeholder"
                            buttonLink = "/dashboard/placeholder/create"
                        />
                    </div>

                    <div className="edit-profile">
                        <Row>
                            <Col md="12">
                                <Card>
                                    <DataTable
                                        title={(<p className="m-0 p-0">{informationString}</p>)}
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

            : (<p>{ShowMessage(401, serverError)}</p>)
    );
};

export default PlaceholderGroup;
