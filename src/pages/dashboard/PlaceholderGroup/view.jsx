import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
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
} from 'reactstrap';
import {
  fetchBrandsApi,
  fetchCategoriesApi,
  fetchProductsApi,
} from '../../../api/products';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import { ConfirmDeleteDialogue } from '../../../utils/Dialogue';
import placeholderItemActions from '../PlaceholderItems/redux/actions';
import actions from './redux/actions';
import PlaceholderItemChildren from './redux/PlaceholderItemChildren';

const PlaceholderGroupView = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [list, setList] = useState([]);

  // add modal
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // edit modal
  const [editModal, setEditModal] = useState(false);

  const editToggle = () => setEditModal(!editModal);

  const [editFormData, setEditFormData] = useState({});

  const [loading, setLoading] = useState(false);

  const [searching, setSearching] = useState(false);
  const { register, handleSubmit } = useForm();

  const result = useSelector((state) => state.PlaceholderGroup.current);

  //placeholder items
  const placeholderItems = useSelector(
    (state) => state.PlaceholderItem.placeholderItems,
  );

  //search placeholders
  const searchResults = useSelector(
    (state) => state.PlaceholderItem.searchResult,
  );

  const [checked, setChecked] = useState(editFormData?.isActive);

  useEffect(() => {
    dispatch(actions.getSinglePlaceholder(id));

    dispatch(placeholderItemActions.singlePlaceholderItemsRequest(id));
  }, []);

  useEffect(() => {
    if (result && result.id) {
      addPlaceholder();
    }
  }, [result]);

  const fetchProducts = async () => {
    setLoading(true);
    await fetchProductsApi()
      .then(({ data }) => {
        setLoading(false);
        setList(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const fetchCategories = async () => {
    setLoading(true);
    await fetchCategoriesApi()
      .then(({ data }) => {
        setLoading(false);
        setList(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const fetchBrands = async () => {
    setLoading(true);
    await fetchBrandsApi()
      .then(({ data }) => {
        setLoading(false);
        setList(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const addPlaceholder = () => {
    switch (result.type) {
      case 'product':
        return fetchProducts();
      case 'category':
        return fetchCategories();
      case 'brand':
        return fetchBrands();
      default:
        break;
    }
  };

  const handleForm = (data) => {
    const request = { ...data };
    const placeholderItemRequest = {
      modelId: request.modelId,
      modelName: request.modelName,
      tab: request.tab,
      orderColumn: Number(request.orderColumn),
      isActive: request.status,
      placeholderId: Number(request.placeholderId),
    };

    dispatch(actions.addPlaceholderItem(placeholderItemRequest));

    setModal(false);
  };

  const handleEditForm = (data) => {
    const request = { ...data };

    const placeholderItemId = Number(request?.placeholderItemId);

    const placeholderItemRequest = {
      modelId: request.modelId,
      modelName: request.modelName,
      tab: request.tab,
      orderColumn: Number(request.orderColumn),
      isActive: request.status,
      placeholderId: Number(request.placeholderId),
    };

    dispatch(
      placeholderItemActions.updatePlaceholderItemRequest(
        placeholderItemId,
        placeholderItemRequest,
      ),
    );

    setEditModal(false);
  };

  const deletePlaceholderItem = (id) => {
    ConfirmDeleteDialogue('PlaceholderItems').then((result) => {
      if (result.isConfirmed) {
        dispatch(placeholderItemActions.deletePlaceholderItemRequest(id));
      }
    });
  };

  const editPlaceholderItem = (placeholderItem) => {
    //console.log('placeholder Item', placeholderItem);

    let request = { ...placeholderItem };

    setEditFormData({
      id: request.id,
      modelId: request.modelId,
      tab: request.tab,
      modelName: request.modelName,
      orderColumn: request.orderColumn,
      isActive: request.isActive,
      placeholderId: request.placeholderId,
    });

    setEditModal(true);
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
        name: 'Name',
        selector: 'Name',
        sortable: true,
        cell: (item) => <PlaceholderItemChildren items={item} />,
      },
      {
        name: 'Model Name',
        selector: 'modelName',
        sortable: true,
        cell: (row) => row.modelName,
      },
      {
        name: 'Tab',
        selector: 'Tab',
        sortable: true,
        cell: (row) => row.tab,
      },
      {
        name: 'order Column',
        selector: 'orderColumn',
        sortable: true,
        cell: (row) => row.orderColumn,
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
          <>
            <Button
              color="secondary btn-sq-effect"
              size="sm"
              className="mr-2"
              onClick={() => editPlaceholderItem(item)}
            >
              <i className="fa fa-pencil"></i>
            </Button>

            <Button
              color="danger btn-sq-effect"
              size="sm"
              onClick={() => deletePlaceholderItem(item.id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </>
        ),
      },

      // /dashboard/placeholder/:id/edit
    ],
    [],
  );

  if (!result) {
    return (
      <>
        <p>data not found</p>
      </>
    );
  }

  return (
    <>
      <Breadcrumb parent="Placeholder Items" title={`Placeholder Items`} />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              {result ? (
                <>
                  <Card>
                    <CardBody>
                      <h4>{result.title}</h4>
                      <p>Description: {result?.description}</p>
                      <p>Type: {result?.type}</p>
                      <p>Agent: {result?.agent}</p>
                      <p>orderColumn: {result?.orderColumn}</p>
                      <p>
                        Visibility:{' '}
                        {result.visibility == true
                          ? 'visibility'
                          : 'inVisibility'}
                      </p>
                      <p>
                        IsActive:{' '}
                        {result.isActive == true ? 'Active' : 'inActive'}
                      </p>
                      <Button
                        color="info"
                        className="mt-3"
                        outline
                        onClick={toggle}
                      >
                        <i className="fa fa-plus"></i> Add placeholder Item
                      </Button>
                    </CardBody>
                  </Card>

                  {/* add modal popup */}
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                      Add Placeholder Item
                    </ModalHeader>
                    <ModalBody>
                      <Card className="p-4">
                        <Form onSubmit={handleSubmit(handleForm)}>
                          <FormGroup>
                            <div className="row">
                              <Col md="10">
                                {/* item */}
                                <Label for="item">Item</Label>
                                <select
                                  name="modelId"
                                  id="modelId"
                                  ref={register}
                                  className="browser-default custom-select"
                                >
                                  {loading ? (
                                    <option>Loading...</option>
                                  ) : list.length ? (
                                    list.map((value) => (
                                      <option
                                        key={`${value.id}-${
                                          value.name
                                        }-${Date.now()}`}
                                        value={value.id}
                                      >
                                        {value.name}
                                      </option>
                                    ))
                                  ) : (
                                    <option>no items available here !!!</option>
                                  )}
                                </select>
                                {/* tab */}
                                {result.tabs && result.tabs.length ? (
                                  <>
                                    <Label for="tab" className="mt-3">
                                      Tab
                                    </Label>
                                    <select
                                      name="tab"
                                      id="tab"
                                      ref={register}
                                      className="browser-default custom-select"
                                    >
                                      {result.tabs.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                  </>
                                ):<></>}
                                {/* order */}
                                <FormGroup>
                                  <Label for="orderColumn" className="mt-3">
                                    Order Column
                                  </Label>
                                  <Input
                                    type="number"
                                    name="orderColumn"
                                    id="orderColumn"
                                    innerRef={register}
                                    placeholder="Enter Order Column"
                                  />
                                </FormGroup>
                                {/* status */}
                                <FormGroup className="row">
                                  <Label className="col-sm-4">Status</Label>
                                  <Col sm="8">
                                    <FormGroup check>
                                      <Input
                                        type="checkbox"
                                        name="status"
                                        innerRef={register}
                                      />
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                              </Col>
                            </div>
                            <input
                              type="hidden"
                              name="placeholderId"
                              value={id}
                              ref={register}
                            />
                            <input
                              type="hidden"
                              name="modelName"
                              value={result.type}
                              ref={register}
                            />
                            <ModalFooter>
                              <Button color="primary" type="submit">
                                Submit
                              </Button>{' '}
                              <Button color="secondary" onClick={toggle}>
                                Close
                              </Button>
                            </ModalFooter>
                          </FormGroup>
                        </Form>
                      </Card>
                    </ModalBody>
                  </Modal>

                  {/* edit modal popup */}
                  <Modal isOpen={editModal} toggle={editToggle}>
                    <ModalBody>
                      <ModalHeader toggle={editToggle}>
                        Edit Placeholder Item
                      </ModalHeader>
                      <Card className="p-4">
                        <Form onSubmit={handleSubmit(handleEditForm)}>
                          <FormGroup>
                            <div className="row">
                              <Col md="10">
                                <Label for="item">Item </Label>
                                <select
                                  name="modelId"
                                  id="modelId"
                                  ref={register}
                                  className="browser-default custom-select"
                                  defaultValue={editFormData.modelId}
                                >
                                  {list.map((value) => (
                                    <option
                                      key={`${value.id}-${
                                        value.name
                                      }-${Date.now()}`}
                                      value={value.id}
                                    >
                                      {value.name}
                                    </option>
                                  ))}
                                </select>

                                {/* tab */}
                                {result.tabs && result.tabs.length && (
                                  <>
                                    <Label for="tab" className="mt-3">
                                      Tab
                                    </Label>
                                    <select
                                      name="tab"
                                      id="tab"
                                      ref={register}
                                      className="browser-default custom-select"
                                      defaultValue={editFormData.tab}
                                    >
                                      {result.tabs.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                  </>
                                )}
                                <FormGroup>
                                  <Label for="orderColumn" className="mt-3">
                                    Order Column
                                  </Label>
                                  <Input
                                    type="number"
                                    name="orderColumn"
                                    id="orderColumn"
                                    innerRef={register}
                                    placeholder="Enter Order Column"
                                    defaultValue={editFormData?.orderColumn}
                                  />
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label className="col-sm-4">Status</Label>
                                  <Col sm="8">
                                    <FormGroup check>
                                      <Input
                                        type="checkbox"
                                        name="status"
                                        defaultChecked={checked}
                                        onChange={() => setChecked(!checked)}
                                        innerRef={register}
                                      />
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                              </Col>
                            </div>
                            <input
                              type="hidden"
                              name="placeholderId"
                              value={id}
                              ref={register}
                            />
                            <input
                              type="hidden"
                              name="modelName"
                              value={editFormData?.modelName}
                              ref={register}
                            />
                            <input
                              type="hidden"
                              name="placeholderItemId"
                              value={editFormData?.id}
                              ref={register}
                            />
                            <ModalFooter>
                              <Button color="primary" type="submit">
                                Submit
                              </Button>{' '}
                              <Button color="secondary" onClick={editToggle}>
                                Close
                              </Button>
                            </ModalFooter>
                          </FormGroup>
                        </Form>
                      </Card>
                    </ModalBody>
                  </Modal>

                  {/* placeholder item list */}
                  <>
                    {/* <Breadcrumb parent="Placeholder Items" title="Placeholder Items" /> */}
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
                                title={
                                  <p className="m-0 p-0">{informationString}</p>
                                }
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
                </>
              ) : (
                <p>No data found...</p>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default PlaceholderGroupView;

/**
    placeholder item table column:

    "id": 1,
    "modelId": "1",
    "modelName": "category",
    "orderColumn": 1,
    "isActive": true,
    "placeholderId": 1


 */
