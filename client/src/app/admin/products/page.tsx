'use client'

import adminAPI from '@/apis/adminApi';
import Loading from '@/components/common/Loading';
import { ImageKey } from '@/constants';
import React from 'react'
import EnhancedTable from '@/components/dashboard/DashboardTable';

interface ProductData {
    _id: string;
    name: string;
    description: string;
    price: number;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
    img: ImageKey;
    img_more: ImageKey[];
    createdAt: Date;
    updatedAt: Date;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof ProductData;
    label: string;
    numeric: boolean;
}


const productHeadCells: readonly HeadCell[] = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
    { id: 'item_no', numeric: false, disablePadding: false, label: 'Item Number' },
    { id: 'scale', numeric: false, disablePadding: false, label: 'Scale' },
    { id: 'marque', numeric: false, disablePadding: false, label: 'Marque' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'img', numeric: false, disablePadding: false, label: 'Image' },
    { id: 'img_more', numeric: false, disablePadding: false, label: 'Sub Image' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
];

const nameData = ['_id', 'name', 'description', 'price','item_no','scale','marque','status','img', 'img_more', 'createdAt', 'updatedAt']

const ProductDashboard = () => {
    const [listProduct, setListProduct] = React.useState<ProductData[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        getBrands()
    }, [])

    const getBrands = async () => {
        try {
            const res = await adminAPI.handleAdmin('/products', 'get')
            console.log(res.data);
            setListProduct(res.data.all_product)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>

            <EnhancedTable
                nameData={nameData}
                data={listProduct}
                isLoading={isLoading}
                headCells={productHeadCells}
                tableTitle="Customers Management"
                idField="_id"
                initialOrderBy="name"
                onDeleteSelected={() => {
                    console.log('hello')
                }}
            />
        </div>
    )

}
export default ProductDashboard