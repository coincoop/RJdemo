'use client'

import marquesAPI from '@/apis/marqueApi';
import Loading from '@/components/common/Loading';
import { ImageKey } from '@/constants';
import React from 'react'
import EnhancedTable from '@/components/dashboard/DashboardTable';

interface BrandData {
    _id: string;
    name: string;
    slug: string;
    logo: ImageKey;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof BrandData;
    label: string;
    numeric: boolean;
}


const brandHeadCells: readonly HeadCell[] = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Brand Name' },
    { id: 'slug', numeric: false, disablePadding: false, label: 'Slug' },
    { id: 'logo', numeric: false, disablePadding: false, label: 'Logo' },
    { id: 'url', numeric: false, disablePadding: false, label: 'Url' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
];

const nameData = ['_id', 'name', 'slug', 'logo','url', 'createdAt', 'updatedAt']

const MarqueDashboard = () => {
    const [listBrand, setListBrand] = React.useState<BrandData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getBrands()
    }, [])

    const getBrands = async () => {
        try {
            const res = await marquesAPI.handleMarque('/get-all-marque', 'get')
            console.log(res.data);
            setListBrand(res.data.all_marque)
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
                data={listBrand}
                isLoading={isLoading}
                headCells={brandHeadCells}
                tableTitle="Brands Management"
                idField="_id"
                initialOrderBy="name"
                onDeleteSelected={() => {
                    console.log('hello')
                }}
            />
        </div>
    )

}
export default MarqueDashboard