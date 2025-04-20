'use client'

import adminAPI from '@/apis/adminApi';
import Loading from '@/components/common/Loading';
import { ImageKey } from '@/constants';
import React from 'react'
import EnhancedTable from '@/components/dashboard/DashboardTable';

interface CustomerData {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof CustomerData;
    label: string;
    numeric: boolean;
}


const customerHeadCells: readonly HeadCell[] = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Password' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
];

const nameData = ['_id', 'name', 'email', 'password','role', 'createdAt', 'updatedAt']

const CustomerDashboard = () => {
    const [listCustomer, setListCustomer] = React.useState<CustomerData[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = async () => {
        try {
            const res = await adminAPI.handleAdmin('/customers', 'get')
            console.log(res.data);
            setListCustomer(res.data.all_customer)
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
                data={listCustomer}
                isLoading={isLoading}
                headCells={customerHeadCells}
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
export default CustomerDashboard