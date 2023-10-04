import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,

  Container,
  Col,
  Row,

} from 'reactstrap';
import DataTable from 'react-data-table-component';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import PushNotificationTemplateForm from './PushNotificationTemplateForm';
import { deletePushNotification } from '../../../components/Push-Notification/services/template';
import Breadcrumb from '../../../layout/breadcrumb';
import axios from '../../../api/axios'
import { useHistory } from 'react-router-dom';
import { getNotifications } from 'api/pushNotification';

const PushNotificationTemplate = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [pushData, setPushData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    getNotifications().then((response)=>{
      setPushData(response?.data)
    })
  },[])

  const columns = React.useMemo(() => [
    {
      name: '#',
      selector: row => row?.id,
    },
    {
      name: 'Title',
      selector: row => row?.title,

    },
     {
      name: 'Message',
      selector: row => row?.body,

    },
    {

      name: 'Key',
      selector: row => row.key,
    },
    {
      name: 'Values',
      selector: row => row?.value,
    },
    {
      name: 'Status',
      selector: row => row?.status,
    },
    {
      name: 'Actions',
      selector: 'actions',
      sortable: false,
      cell: item => (
        <>
          <button 
          
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            <AiOutlineEdit fontSize={18} /></button>
          <button onClick={ () => {
            setIsDelete( deletePushNotification(item.id));
            setIsDelete(false)
          }
          }
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            <AiOutlineDelete fontSize={18} /></button>

        </>
      )
    }], []);

  return (
    <>
      <Breadcrumb parent="Dashboard" title="Push Notifications" />
      <Container fluid className='m-0 p-0'>
        <div className="feature-products">
          <Row>
            <Col xl="2" sm="2" className='mt-1'>
              <Button onClick={() => history.push('/push-notification/add')} className="btn-primary">
                <i class="bi bi-plus"></i>
                Add New
              </Button>
            </Col>
            <Col xl="3" sm="3" className='mt-1'></Col>
          </Row>
        </div>
        <Card className='mt-2'>
          <DataTable
            noHeader={true}
            columns={columns}
            data={pushData}
            pagination
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 200, 500]}
          />
        </Card>
      </Container>
    </>
  );
};

export default PushNotificationTemplate;










