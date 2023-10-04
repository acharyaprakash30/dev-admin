import React, { useState, useEffect } from 'react';
import { Input, Switch, Alert, Modal, Form, Select, Button } from 'antd';
import { addNewWard, getDistrict, getMunicipality } from 'api/shipping';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../pages/dashboard/Shipping/redux/actions';

const ModalAddressForm = ({ provinces, isModalOpen, setIsModalOpen, type }) => {
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState([]);
  const areasuccess = useSelector((state) => state.Shipping?.areas?.success);
  const [municipalities, setMunicipalities] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [municipalityId, setMunicipalityId] = useState();
  const [provinceId, setProvinceId] = useState();

  useEffect(() => {
    getDistrict({ id: provinceId }).then((response) =>
      setDistricts(response?.data),
    );
  }, [provinceId]);

  useEffect(() => {
    getMunicipality({ id: districtId }).then((response) =>
      setMunicipalities(response?.data?.data),
    );
  }, [districtId]);

  const onFinish = (data) => {
    data.status = data?.status ? true : false;
    delete data.province;

    if (type === 'Area') {
      delete data.districtId;
      data.delivery_price = +data?.delivery_price;
      dispatch(actions.addNewArea(data));
      setIsModalOpen(false);
    } else if (type === 'Municipality') {
      dispatch(actions.addNewMunicipality(data));
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      title={`Add ${type}`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {type === 'Area' && (
          <Form.Item label="Price" name="delivery_price">
            <Input type="number" />
          </Form.Item>
        )}

        <Form.Item
          label="Province"
          name="province"
          rules={[
            {
              required: true,
              message: 'Please provide province name!',
            },
          ]}
        >
          <Select
            onChange={(e) => setProvinceId(e)}
            placeholder="Select province"
            name="province"
          >
            {provinces &&
              provinces.length > 0 &&
              provinces.map((province) => (
                <Select.Option value={province.id}>
                  {province.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="District"
          name="districtId"
          rules={[
            {
              required: true,
              message: 'Please provide district name!',
            },
          ]}
        >
          <Select
            disabled={!provinceId}
            onChange={(e) => setDistrictId(e)}
            placeholder="Select District"
            name="district"
          >
            {districts &&
              districts.length > 0 &&
              districts.map((district) => (
                <Select.Option value={district.id}>
                  {district.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        {type === 'Area' && (
          <Form.Item
            label="Municipality"
            name="municipalityId"
            rules={[
              {
                required: true,
                message: 'Please provide municipality name!',
              },
            ]}
          >
            <Select
              disabled={!districtId}
              onChange={(e) => setMunicipalityId(e)}
              placeholder="Select Municipality"
              name="municipalityId"
            >
              {municipalities &&
                municipalities.length > 0 &&
                municipalities.map((municipality) => (
                  <Select.Option value={municipality.id}>
                    {municipality.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Status" name="status">
          <Switch></Switch>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddressForm;
