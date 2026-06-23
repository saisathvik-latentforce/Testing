import React, { useState, useMemo } from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';


import products from '../assets/coffee';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'typeOfCoffee', headerName: 'Type of Coffee', width: 170 },
  { field: 'price', headerName: 'Price', width: 100 },
  { field: 'itemsSold', headerName: 'Items Sold', width: 120 },
];

const rows = products.map((product) => ({
  id: product.id,
  typeOfCoffee: product.title,
  price: product.price,
  itemsSold: product.itemsSold,
}));

const CoffeeStats = () => {
    const [rowSelectionModel, setRowSelectionModel] = useState({
        type: 'include',
        ids: new Set(), // empty initially
    });

    // Update handler
    const handleRowSelectionChange = (newModel) => {
        setRowSelectionModel(newModel);
    };

    // Displayed rows
    // const displayedRows =
    // rowSelectionModel.ids.size > 0
    //     ? rows.filter((row) => rowSelectionModel.ids.has(row.id))
    //     : rows;

    const displayedRows = useMemo(() => {
        if (rowSelectionModel.ids.size === 0) return rows; // all rows if nothing selected
        return rows.filter((row) => rowSelectionModel.ids.has(row.id));
    }, [rowSelectionModel]);

    const totalUnitsSold = displayedRows.reduce((sum, row) => sum + row.itemsSold, 0);
    const totalRevenue = displayedRows.reduce((sum, row) => sum + row.itemsSold * row.price, 0);


    return (
        <Box sx={{ p: 3 }}>
            {/* Top Cards */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
                <Card sx={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                    <Typography variant="h6">Total Units Sold</Typography>
                    <Typography variant="h4">{totalUnitsSold}</Typography>
                </CardContent>
                </Card>
                <Card sx={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                    <Typography variant="h6">Total Revenue</Typography>
                    <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
                </CardContent>
                </Card>
            </Stack>

            {/* Container Box */}
            <Box
                sx={{
                    display: 'flex',          //  horizontal layout
                    gap: 2,                   // space between boxes
                    alignItems: 'flex-start', // align tops
                    width: '100%',
                    mt: 2,
                }}
            >
                {/* DataGrid Box */}
                <Box
                    sx={{
                    flex: 1,
                    height: 400,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#fafafa',
                    p: 2,
                    }}
                >
                    {/* <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                    /> */}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={handleRowSelectionChange}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                    />
                </Box>

                {/* Chart Box */}
                <Box
                    sx={{
                    flex: 1,
                    height: 400,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                    boxShadow: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                >
                    {rows.length > 0 && (
                    <BarChart
                        xAxis={[{ data: displayedRows.map((r) => r.typeOfCoffee), scaleType: 'band' }]}
                        series={[
                            { data: displayedRows.map((r) => r.itemsSold), label: 'Items Sold' },
                            { data: displayedRows.map((r) => r.itemsSold * r.price), label: 'Revenue ($)' }
                        ]}
                        height={300}
                    />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CoffeeStats;
