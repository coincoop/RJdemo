import React from 'react'
import styles from '@/styles/DashboardFormCreate.module.css'
import TextField from '@mui/material/TextField';

const DashBoardFormCreate = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['items-container']}>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined"  />
                </div>
                <div className={styles['item']}>
                    <TextField type="text" label="Product Name" variant="outlined" />
                </div>

                {/* <TextField type="text" label="Description" variant="outlined" />
                <TextField type="number" label="Price" variant="outlined" />
                <TextField type="text" label="Item NO" variant="outlined" />
                <TextField type="text" label="Scale" variant="outlined" />
                <TextField type="text" label="Marque" variant="outlined" />
                <TextField type="text" label="Status" variant="outlined" />
                <TextField type="text" label="Image" variant="outlined" />
                <TextField type="text" label="Sub Image" variant="outlined" /> */}



            </div>
        </div>
    )
}

export default DashBoardFormCreate