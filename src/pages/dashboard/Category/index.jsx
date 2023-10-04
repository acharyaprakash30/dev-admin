import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  Badge,
  Card,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import Breadcrumb from '../../../layout/breadcrumb';
import actions from './redux/actions';
//import Table from 'components/Table/TableWithAPI';
import Table from 'components/Table/Table';
import { useHistory } from 'react-router-dom';
import paths from 'route/paths';
import { absImageUrl } from 'utils/url';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //Categories
  const categoriesState = useSelector((state) => state.Category);
  let categories = categoriesState.Category ? categoriesState.Category : [];
  const catWithChild = categoriesState.list;
  const catCount = categoriesState.count;
  const [searchText, setSearchText] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteId, setModalDeleteId] = useState(null);
  const [filterCategory, setFilterCategory] = useState(-1);
  const [filterActive, setFilterActive] = useState(-1);

  //**Setup number of data here */
  const tableSetting = {
    pageSize: 20,
  };

  //**state for all filters */
  const [filters, setFilters] = useState({
    skip: 0,
    limit: tableSetting.pageSize,
    order: 'orderColumn DESC',
  });

  /**For table starts*/
  const tableHeader = [
    {
      title: 'Order',
      dataIndex: 'orderColumn',
      search: true,
      sort: true,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      search: true,
      sort: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      search: true,
      sort: true,
      render(html) {
        return {
          children: (
            <div
              style={{ maxHeight: '100px', overflowX: 'auto' }}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          ),
        };
      },
    },
    {
      title: 'Parent Category',
      dataIndex: 'parentId',
      search: true,
      sort: true,
      align: 'center',
      // render(id) {
      //   return {
      //     children: <div> {id ? getCategoryName(id) : '-'}</div>
      //   };
      // }
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      align: 'center',
      render(icon) {
        return {
          props: {
            style: { maxWidth: '50px', maxHeight: '50px' },
          },
          children: (
            <div>
              {icon !== '-' ? (
                <img
                  src={icon}
                  style={{ maxWidth: '70px', maxHeight: '70px' }}
                />
              ) : (
                '-'
              )}
            </div>
          ),
        };
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      align: 'center',
      render(url) {
        return {
          props: {
            style: { maxWidth: '50px', maxHeight: '50px' },
          },
          children: (
            <div>
              {url !== '-' ? (
                <img
                  src={absImageUrl(url)}
                  style={{ maxWidth: '70px', maxHeight: '70px' }}
                />
              ) : (
                '-'
              )}
            </div>
          ),
        };
      },
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      sort: true,
      align: 'center',
      render(featured) {
        return (
          <Badge color={featured == 'Yes' ? 'info' : 'secondary'}>
            {featured === 'Yes' ? 'featured' : 'No'}
          </Badge>
        );
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      sort: true,
      align: 'center',
      render(active) {
        return (
          <Badge color={active == 'Yes' ? 'info' : 'secondary'}>
            {active === 'Yes' ? 'Yes' : 'No'}
          </Badge>
        );
      },
    },
  ];

  const pagination = {
    size: 'medium',
    pageSize: tableSetting.pageSize,
    position: ['bottomCenter'],
    showSizeChanger: false,
    total: catCount?.count ? catCount?.count : tableSetting.pageSize,
  };

  /** Execute all filters */
  useEffect(() => {
    //dispatch(actions.getCategoryReq(filters));
  }, [filters]);

  const handleTableChange = (pagination, filter, sorter) => {
    const { current, pageSize } = pagination;
    const { field, order } = sorter;
    setFilters({
      ...filters,
      skip: (current - 1) * pageSize,
      limit: pageSize,
      order: field
        ? field + ' ' + (order === 'ascend' ? 'ASC' : 'DESC')
        : filters.order,
    });
  };

  /**For table ends*/

  const showModal = (id) => {
    setModalDeleteId(id);
    setModalDelete(true);
  };

  const deleteCategory = (id) => {
    setModalDelete(false);
    dispatch(actions.dltCategoryReq(id));
  };

  useEffect(() => {
    if (filterCategory >= 0) {
      dispatch(
        actions.getCategoryReq({
          where: { or: [{ parentId: filterCategory }, { id: filterCategory }] },
        }),
      );
    } else if (filterActive !== -1) {
      dispatch(actions.getCategoryReq({ where: { isActive: filterActive } }));
    } else {
      //dispatch(actions.getCategoryReq(filters));
      dispatch(actions.getCategoryReq());
    }

    dispatch(actions.countCategory(filters));

    if (!catWithChild.length) {
      dispatch(actions.getCategoryWithChild());
    }
  }, [filterCategory, filterActive]);

  const findCategoryById = (parentId) => {
    if (!parentId) {
      return [];
    }
    return categories.filter((value) => value.id == parentId);
  };

  const getCategoryName = (parentId) => {
    if (findCategoryById(parentId) && findCategoryById(parentId).length > 0) {
      return findCategoryById(parentId)[0]?.name
        ? findCategoryById(parentId)[0].name
        : ' - ';
    }
    return ' - ';
  };

  categories = categories.map((cat) => {
    return { ...cat, parentId: getCategoryName(cat.parentId) };
  });

  const deleteCategoryState = useSelector(
    (state) => state?.Category?.deleteCategory,
  );
  return (
    <>
      <Modal
        isOpen={modalDelete}
        toggle={() => {
          setModalDelete(false);
        }}
      >
        <ModalHeader
          toggle={() => {
            setModalDelete(false);
          }}
        >
          Delete Banner
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this banner??</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setModalDeleteId(null);
              setModalDelete(false);
            }}
          >
            Close
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => deleteCategory(modalDeleteId)}
          >
            <i className="fa fa-trash"></i> Delete
          </Button>
        </ModalFooter>
      </Modal>
      <Breadcrumb parent="Users" title="All Categories" />
      <Container fluid={true}>
        <div className="feature-products">
          <Row>
            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                  }}
                  value={filterCategory}
                >
                  <option value={-1}>All Categories</option>
                  {catWithChild &&
                    catWithChild.map((cat) => {
                      return (
                        <option value={parseInt(cat.id)}>{cat.name}</option>
                      );
                    })}
                </select>
              </div>
            </Col>
            <Col xl="4" sm="4">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="search"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <i className="fa fa-search"></i>
                </FormGroup>
              </Form>
            </Col>
            <Col xl="3" sm="3" className="text-right">
              <div className="select2-drpdwn-product select-options ">
                <select
                  className="form-control btn-square"
                  name="select"
                  value={filterActive}
                  onChange={(e) => {
                    setFilterActive(e.target.value);
                  }}
                >
                  <option value={-1}>All</option>
                  <option value={true}>Active</option>
                  <option value={false}>Not Active</option>
                </select>
              </div>
            </Col>
            <Col>
              <Button
                xl="2"
                sm="2"
                className="mt-2 background--primary"
                onClick={() => history.push('/dashboard/category/create')}
              >
                Add Category
              </Button>
            </Col>
          </Row>
        </div>
        <div className="edit-profile">
          <Row>
            <Col md="12">
              <Card>
                <Table
                  searchText={searchText}
                  tableHeader={tableHeader}
                  tableData={categories ? categories : []}
                  loading={
                    categoriesState?.loading || deleteCategoryState?.loading
                  }
                  editUrl={paths.editCategory}
                  showModal={showModal}
                  handleTableChange={handleTableChange}
                  pagination={pagination}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default CategoriesList;
