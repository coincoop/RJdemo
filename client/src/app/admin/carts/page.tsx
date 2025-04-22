'use client'

import adminAPI from '@/apis/adminApi';
import Loading from '@/components/common/Loading';
import { ImageKey } from '@/constants';
import React from 'react'
import EnhancedTable from '@/components/dashboard/DashboardTableCollapse';

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

interface ProductData {
    _id: string;
    name: string;
    price: number;
    description: string;
    img: ImageKey;
    item_no: string;
    scale: string;
    marque: string;
    status: string;
}

interface CartItemData {
    _id: string;
    id_cart: string;
    id_product: ProductData;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

interface SubTableCell {
    id: keyof CartItemData | keyof ProductData ;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}

interface MergedCartData extends CartData {
    items: CartItemData[];
}

const cartHeadCells: readonly HeadCell[] = [
    { id: '_id', label: 'Cart ID', numeric: false, disablePadding: true },
    { id: 'id_user', label: 'User ID', numeric: false, disablePadding: false },
    { id: 'createdAt', label: 'Created At', numeric: false, disablePadding: false },
    { id: 'updatedAt', label: 'Updated At', numeric: false, disablePadding: false },
];

const cartItemHeadCells: readonly SubTableCell[] = [
    { id: 'name', label: 'Product Name', numeric: false,disablePadding: true }, 
    { id: 'quantity', label: 'Quantity', numeric: true,disablePadding: false },
    { id: 'price', label: 'Price (Unit)', numeric: true ,disablePadding: false},
    { id: 'createdAt', label: 'Added At', numeric: false,disablePadding: false },
];

const sub = 'name'

const nameData: (keyof CartData)[] = ['_id', 'id_user', 'createdAt', 'updatedAt']
const nameDataItem:(keyof CartItemData | keyof ProductData)[] = [
    'name', 
    'quantity',
    'price',
    'createdAt',
];
const CartDashboard = () => {
    const [mergedCartData, setMergedCartData] = React.useState<MergedCartData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDataAndMerge = async () => {
            setIsLoading(true);
            try {
                const [cartRes, cartItemRes] = await Promise.all([
                    adminAPI.handleAdmin('/carts', 'get'),
                    adminAPI.handleAdmin('/cart-items', 'get')
                ]);

                const carts: CartData[] = cartRes.data.all_cart || [];
                const cartItems: CartItemData[] = cartItemRes.data.all_cart_item || [];

                const cartItemsMap = new Map<string, CartItemData[]>();
                cartItems.forEach(item => {
                    if (item.id_cart) {
                        const items = cartItemsMap.get(item.id_cart) || [];
                        items.push(item);
                        cartItemsMap.set(item.id_cart, items);
                    } else {
                        console.warn("Cart item missing id_cart:", item);
                    }
                });

                const mergedData = carts.map(cart => ({
                    ...cart,
                    items: cartItemsMap.get(cart._id) || []
                }));

                console.log("Merged Data:", mergedData);
                setMergedCartData(mergedData);

            } catch (error) {
                console.error("Error fetching or merging cart data:", error);
                setMergedCartData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAndMerge();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <EnhancedTable
                headCells={cartHeadCells}
                tableTitle="Carts Management"
                subTableTitle="Cart Items"
                subHeadCells={cartItemHeadCells}
                nameData={nameData}
                nameDataItem={nameDataItem}
                data={mergedCartData}
                subKey={sub}
            />
        </div>
    )
}

export default CartDashboard;