import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon from '../ui/Icon';
import { format, sub } from 'date-fns';


function Row(props: {subKey: string, subHeadCells: readonly any[], subTableTitle: string, row: any, nameData: any[], nameDataItem: any[] }) {
    const {subKey, subHeadCells, row, nameData, nameDataItem, subTableTitle } = props;
    const [open, setOpen] = React.useState(false);

    const formatDate = (dateInput: Date | string | undefined | null): string => {
        // ... (hàm formatDate giữ nguyên) ...
        if (!dateInput) return 'N/A';
        try {
            const dateObject = new Date(dateInput);
            if (isNaN(dateObject.getTime())) return 'Invalid Date';
            return format(dateObject, 'dd/MM/yyyy HH:mm');
        } catch (error) { return String(dateInput); }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <Icon icon="up_arrow" /> : <Icon icon="down_arrow" />}
                    </IconButton>
                </TableCell>
                {
                    nameData.map((key) => (
                        <TableCell key={key}>
                            {key === 'createdAt' || key === 'updatedAt'
                                ? formatDate(row[key])
                                : String(row[key]) /* Chuyển đổi các giá trị khác thành chuỗi */}
                        </TableCell>
                    ))
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {subTableTitle}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            subHeadCells.map((headCell) => (
                                                <TableCell
                                                    key={headCell.id}
                                                    align={headCell.numeric ? 'right' : 'left'}
                                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                                >
                                                    {headCell.label}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item: any) => (
                                        <TableRow key={item._id}>
                                            {
                                                nameDataItem.map((itemData) => (
                                                    <TableCell key={itemData}>
                                                        {
                                                            itemData === 'createdAt' || itemData === 'updatedAt'
                                                                ? formatDate(item[itemData])
                                                                : itemData === subKey 
                                                                    ? String(item.id_product[itemData as keyof any] ?? '') 
                                                                    : String(item[itemData as keyof any] ?? '') 
                                                        }
                                                    </TableCell>
                                                ))


                                            }
                                        </TableRow>


                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable({subKey, headCells, tableTitle, subTableTitle, subHeadCells, nameData, nameDataItem, data }: {
    headCells: readonly any[];
    tableTitle: string;
    subHeadCells: readonly any[];
    nameData: any[];
    nameDataItem: any[];
    data: any[];
    subTableTitle: string;
    subKey: string;
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>

                        <TableCell>{tableTitle}</TableCell>
                        {
                            headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row._id} subKey={subKey} subHeadCells={subHeadCells} subTableTitle={subTableTitle} nameData={nameData} nameDataItem={nameDataItem} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
