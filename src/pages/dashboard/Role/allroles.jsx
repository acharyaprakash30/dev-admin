import React, { Fragment, useEffect, useState, useRef } from 'react';
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs';
import { FaUserAlt, FaUserTag } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import ModalForm from '../../../components/Modal/Modal';
import WidgetGlance from '../../../components/Widget/WidgetGlance';
import {
  Delete,
  Edit,
  RolesTableHeader,
  RolesTableTitle,
} from '../../../constant';
import Breadcrumb from '../../../layout/breadcrumb';
import SearchBox from '../../../layout/search-box/index';
import actions from './redux/actions';
import DataTable from 'react-data-table-component';
import TableBasicActions from 'components/TableBasicActions';
import { ConfirmDeleteDialogue } from 'utils/Dialogue';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Allroles = (props) => {
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentRole, setCurrentRole] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  // const [filteredData,setFilteredData] = useState({})
  const roles = useSelector((state) => state.Role.Role);
  let [filteredData, setFilteredData] = useState(roles);
  let searchResult = useSelector((state) => state.Role.result);
  const [filterValue, setFilterValue] = useState('');

  const getRoleRef = useRef();
  const deleteRoleRef = useRef();
  const editRoleRef = useRef();

  deleteRoleRef.current = (id) => {
    // dispatch(actions.deleteRolesReq(id));
  };

  editRoleRef.current = (data) => {
    dispatch(actions.editRolesReq(modelObj.dataObj.id, data));
  };

  // get roles
  const getRoles = () => {
    dispatch(actions.getRolesReq());
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    dispatch(actions.getRolesReq());
  }, []);

  useEffect(() => {
    setTableData(roles);
  }, []);

  useEffect(() => {
    let filtered = roles;

    if (filterValue) {
      filtered = roles.filter((item) => item.type === filterValue);
      setFilteredData(filtered);
    }
  }, [filterValue, roles]);

  const toggleEdit = (roledata) => {
    setModelObj({
      ...modelObj,
      dataObj: {
        id: roledata.id,
        name: roledata.name,
        permissions: roledata.permissions,
      },
    });

    setShow(true);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch(actions.searchRoleReq(value));
    setFilteredData(searchResult);
  };

  const datas = [
    {
      title: 'Total Roles',
      value: Object.keys(tableData).length,
      icon: FaUserAlt,
    },
    {
      title: 'Total Admin',
      value: Object.values(tableData).filter(
        (row) => row.type !== 'vendor' && row.type !== 'customer',
      ).length,
      icon: GrAddCircle,
    },
    {
      title: 'Total Vendors',
      value: Object.values(tableData).filter(
        (row) => row.type !== 'application' && row.type !== 'customer',
      ).length,
      icon: BsHouseDoorFill,
    },
    {
      title: 'Total Customers',
      value: Object.values(tableData).filter(
        (row) => row.type !== 'application' && row.type !== 'vendor',
      ).length,
      icon: FaUserTag,
    },
  ];

  const closeModelHandler = () => setShow(false);
  const [modelObj, setModelObj] = useState({
    title: 'Role',
  });

  const deleteRole = (id) => {
    ConfirmDeleteDialogue('role').then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteRolesReq(id));
      }
    });
  };

  const handleSave = (data) => {
    const roleArr = data.permissions;
    let reqObj = {
      name: data.name,
      permissions: roleArr,
    };
    dispatch(actions.editRolesReq(modelObj.dataObj.id, reqObj));
    dispatch(actions.getRolesReq());
  };

  const columns = React.useMemo(
    () => [
      {
        name: 'Role Name',
        selector: 'name',
        sortable: true,
        cell: (row) => row.name,
      },
      {
        name: 'Type',
        selector: 'featured',
        sortable: true,
        cell: (row) => row.name,
      },
      // ! as roles are pre-defined no role management
      // {
      //   name: 'Actions',
      //   selector: 'actions',
      //   sortable: false,
      //   cell: (item) => (
      //     <TableBasicActions
      //       // handleDelete={() => deleteRole(item.id)}
      //       handleEdit={() => toggleEdit(item)}
      //       //viewUrl={`/dashboard/brand/${item.id}/edit`}
      //     />
      //   ),
      // },
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
      <Breadcrumb parent="Users" title="Manage Roles" />
      <Container fluid={true}>
        <WidgetGlance data={datas} />
        <div className="feature-products">
          <div className="feature-products">
            <SearchBox
              handleInput={handleSearch}
              setStatus={searching}
              placeholder={'Search by role name'}
              handleStatus={(value) => setSearching(value)}
              // buttonText="Add Role"
              value={searchTerm}
              buttonLink="/dashboard/role/create"
              onChange={(e) => setFilterValue(e.target.value)}
              options={Array.from(new Set(roles?.map((item) => item.type)))}
            />
          </div>

          <div className="edit-profile">
            <DataTable
              title={<p className="m-0 p-0">Roles List</p>}
              noHeader={true}
              columns={columns}
              data={filteredData}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Allroles;
