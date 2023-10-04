import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Card, Input, Image, Tag, message } from 'antd';
import { Button, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import actions from './redux/actions';
import { patchVendorCommissionApi } from '../../../api/fetchVendor'
import { useParams } from 'react-router-dom';


const VendorCommission = () => {
    const { id } = useParams();
    const vendors = useSelector((state) => state?.Vendor?.Vendor);
    const [edit, setEdit] = useState(false);
    const vendorDetail = vendors.filter((vendor) => vendor?.id === Number(id)) || [];
    const [value, setValue] = useState(vendorDetail[0]?.vendorDetail?.commission);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getVendorReq());
    }, []);



    const handleCommissionChange = () => {
        console.log("val", value)
        dispatch(actions.editCommissionReq(vendorDetail[0]?.id, { commission: +value }))
        setEdit(false)
    }



    return (
        <Fragment>

            <div className="productList vendorCard mt-3 d-flex flex-column">
                <div>
                    <Label>
                        <h5>Commission Detail</h5>
                    </Label>
                    <div className='d-flex justify-content-between  px-2' style={{ position: 'relative' }}>
                        <Label><p className='itemName' style={{ fontFamily: 'Poppins', fontSize: '15px' }}>Commission Percentage </p></Label>
                        {
                            vendorDetail?.length > 0 &&
                                !edit ?
                                <Label><p style={{ fontFamily: 'Poppins', fontSize: '15px' }}>{vendorDetail[0]?.vendorDetail?.commission} % </p></Label>
                                :
                                <div className='d-flex flex-row'>

                                    <Input placeholder='Commission Rate' type="number" defaultValue={value} onChange={(e) => setValue(e.target.value)}></Input>
                                    <Button className='mx-2' onClick={handleCommissionChange}>Submit</Button>
                                </div>
                        }
                    </div>
                    <Button disabled={edit} onClick={(e) => {
                        e.preventDefault()
                        setEdit(true)
                    }}>Edit Commission</Button>
                </div>
                {/* <div>
                    <DataTable
                        noHeader
                        data={products}
                        columns={columns}
                        paginationServer
                        pagination
                        paginationTotalRows={count}
                        onChangeRowsPerPage={(pageSize, page) => {
                            setPage(page);
                            setPageSize(pageSize);
                        }}
                        onChangePage={(page, totalRow) => setPage(page)}
                    />
                </div> */}
            </div>
        </Fragment>
    );
};

export default VendorCommission;
