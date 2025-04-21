'use client'



import adminAPI from '@/apis/adminApi';
import Loading from '@/components/common/Loading';
import { ImageKey } from '@/constants';
import React from 'react'
import EnhancedTable from '@/components/dashboard/DashboardTable';



interface CartData {
  _id: string;
  id_user: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof CartData;
    label: string;
    numeric: boolean;
}


const cartHeadCells: readonly HeadCell[] = [
  { id: '_id', label: 'Order ID', numeric: false, disablePadding: true },
  { id: 'id_user', label: 'User ID', numeric: false, disablePadding: false },
  { id: 'createdAt', label: 'Created At', numeric: false, disablePadding: false },
  { id: 'updatedAt', label: 'Updated At', numeric: false, disablePadding: false },
];

const nameData = ['_id', 'id_user', 'createdAt', 'updatedAt']

const CartDashboard = () => {
    const [listCart, setListCart] = React.useState<CartData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        try {
            const res = await adminAPI.handleAdmin('/carts', 'get')
            console.log(res.data);
            setListCart(res.data.all_cart)
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
                data={listCart}
                isLoading={isLoading}
                headCells={cartHeadCells}
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
export default CartDashboard