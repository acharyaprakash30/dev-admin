import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Container,
} from 'reactstrap';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import EmailTemplateForm from '../components/EmailtemplateForm';
import EditTemplate from '../components/EditTemplate';
import fetcher from '../../../api/fetcher';
import { ConfirmDeleteDialogue } from 'utils/Dialogue';
import { deleteEmailApi } from 'api/emailTemplate/emailTemplate';

const EmailTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  const [id, setId] = useState("1");
 
  const { data: templates, mutate } = useSWR(['/emails'], fetcher);

 const clickEdit = (id) => {
  setId(id);
  setIsEditModel(true);
}

const deleteEmail = (id) => {
  ConfirmDeleteDialogue("Template").then((result) => {
    if(result.isConfirmed) {
  deleteEmailApi({id})
  .then((response) => {
    message.success("Email Template Deleted Successfully")
   mutate()
  })
  .catch((err) => {
    message.error("Failed To Delete Email Template")
  })
}

})
}
  return (
    <>
      <Container fluid className="m-0 p-0">
        <Card>
          <CardHeader className="m-3">
            <h6>View Email Template</h6>
          </CardHeader>
          <CardBody>
            <CardTitle>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-success text-white rounded"
              >
                <i class="bi bi-plus"></i>
                Add New
              </Button>
            </CardTitle>
            <Table>
              <>
                <thead>
                  <tr>
                    <th> #</th>
                    <th>Title</th>
                    <th>Code</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(templates ?? []).map((temp) => {
                    return (
                      <>
                        <tr key={temp.id}>
                          <td> {temp.id} </td>
                          <td>{temp.title} </td>
                          <td>{temp.code} </td>
                          <td>
                            <Button type="primary" shape="circle"
                            onClick= {(id) => clickEdit(temp?.id)}
                            >
                              <i className="fa fa-pencil "></i>
                            </Button>
                            
                            <Button type="primary" danger shape="circle" className='m-2'
                            onClick={() => deleteEmail(temp?.id)}
                             >
                              <i className="fa fa-trash"></i>
                            </Button>
                            
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </>
            </Table>
          </CardBody>
        </Card>
        {isModalOpen && (
          <EmailTemplateForm
            isModalOpen={isModalOpen}
            onDiscard={() => setIsModalOpen(false)}
            onSuccess={() => {
              mutate();
              setIsModalOpen(false);
            }}
          />
        )}

        {isEditModel && (
          <EditTemplate
          id={id}
          isEditModel={isEditModel}
          onDiscard={() => setIsEditModel(false)}
          onSuccess={() => {
            mutate();
            setIsEditModel(false);
          }}
          />
        )}
      </Container>
    </>
  );
};

export default EmailTemplate;
