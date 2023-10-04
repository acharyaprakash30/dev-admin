import Breadcrumbs from 'layout/breadcrumb'
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Input } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Label, Media, Spinner } from 'reactstrap'
import { fileURLReader } from 'utils'
import NoImage from '../../../assets/images/noImg.png'
import { fetchProductsApi } from 'api/products'
import DataTable from 'react-data-table-component'
import coverImg from '../../../assets/images/avtar/coverImg.jpg'

const ViewShop = () => {
    let { id } = useParams();
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [perpage, setPerpage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null)

    let shops = useSelector((state) => state.Shop.Shop);
    useEffect(() => {
        if (id && shops) {
            setShop(shops.filter((item) => +item.id === +id)[0] || {})
            setLoading(false);
        }
    }, [id, shops]);

    useEffect(() => {
        if (search) {
            fetchProductsApi({ page, perpage, id, search }).then((response) => setProducts(response.data.products))
        }
        else {
            fetchProductsApi({ page, perpage, id }).then((response) => setProducts(response.data.products))
        }
    }, [search, page, perpage, id])

    let columns = [
        {
            name: 'ID',
            width: '70px',
            cell: (row) => row.id
        },
        {
            name: 'Name',
            cell: (row) => row?.name
        },
        {
            name: 'Category',
            cell: (row) => row?.category?.name || "N/A"
        }, {
            name: 'Brand',
            width: '70px',
            cell: (row) => row?.brand?.name || "N/A"
        },
        {
            name: 'Price',
            width: '90px',
            cell: (row) => <span>NPR{' '}{row?.salePrice}</span>
        }

    ]


    return (
        <Fragment>
            <Breadcrumbs title="View Shop" parent="Shops"></Breadcrumbs>
            <Container fluid className='mb-2'>
                {
                    !loading ?
                        <div className='d-flex flex-wrap shopView'>
                            <div className='col-md-4 col-sm-12 col-lg-4 rounded-3 '>
                                <Card className="card hovercard text-center">
                                    <Media
                                        height={'250px'}
                                        width="100%"
                                        className='relative coverImg'
                                        src={shop?.shopProfileImage?.url ? fileURLReader(shop?.shopProfileImage?.url) : coverImg}
                                    ></Media>
                                    <img className='profileImg' width="80px" height={"80px"} src={shop?.shopProfileImage?.url ? fileURLReader(shop?.shopProfileImage?.url) : NoImage}></img>
                                    <div className='shopDetail d-flex flex-column justify-center'>
                                        <Label><strong>{shop?.name.toUpperCase() || "N/A"}</strong></Label>
                                        <Label>{shop?.address1.toUpperCase()},{' '}{shop?.country.toUpperCase()}</Label>
                                        <Label>{shop?.phone}</Label>
                                    </div>

                                </Card>

                            </div>
                            <div className='col-md-8 col-sm-12 col-lg-8'>
                                <Card >
                                    <div className='d-flex flex-row justify-content-center align-items-center mb-3'>
                                        <Label className='col-md-3 title' >Products</Label>
                                        <Input className='col-md-9' placeholder="Search Product" onChange={(e) => setSearch(e.target.value)}></Input>
                                    </div>
                                    <DataTable
                                        onChangePage={(page, perpage) => {
                                            setPage(page);
                                            setPerpage(perpage);
                                        }}
                                        onChangeRowsPerPage={
                                            (perpage, page) => {
                                                setPage(page);
                                                setPerpage(perpage);
                                            }}
                                        noHeader responsive pagination paginationServer columns={columns} data={products}></DataTable>
                                </Card>
                            </div>

                        </div>
                        :
                        <Spinner></Spinner>
                }
            </Container>

        </Fragment>
    )
}

export default ViewShop