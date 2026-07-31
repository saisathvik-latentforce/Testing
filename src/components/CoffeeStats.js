import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Skeleton,
  LinearProgress,
  Fade,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';

import products from '../assets/coffee';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'typeOfCoffee', headerName: 'Type of Coffee', width: 170 },
  { field: 'price', headerName: 'Price ($)', width: 100 },
  { field: 'itemsSold', headerName: 'Items Sold', width: 120 },
];

const rows = products.map(p => ({
  id: p.id,
  typeOfCoffee: p.title,
  price: p.price,
  itemsSold: p.itemsSold,
}));

const CoffeeStats = () => {
  const [ready, setReady] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: 'include',
    ids: new Set(),
  });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  const displayedRows = useMemo(() => {
    if (rowSelectionModel.ids.size === 0) return rows;
    return rows.filter(row => rowSelectionModel.ids.has(row.id));
  }, [rowSelectionModel]);

  const totalUnitsSold = displayedRows.reduce((s, r) => s + r.itemsSold, 0);
  const totalRevenue = displayedRows.reduce((s, r) => s + r.itemsSold * r.price, 0);

  return (
    <Box sx={{ p: 3 }}>
      {!ready && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

      {/* Stat cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        {ready ? (
          <>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Units Sold
                </Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {totalUnitsSold}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Total Revenue
                </Typography>
                <Typography variant="h4" color="secondary" fontWeight="bold">
                  ${totalRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {[0, 1].map(i => (
              <Card key={i} sx={{ flex: 1 }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" sx={{ fontSize: '2rem' }} />
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Stack>

      <Fade in={ready} timeout={600}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            width: '100%',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 400,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'background.paper',
              p: 2,
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5]}
              checkboxSelection
              rowSelectionModel={rowSelectionModel}
              onRowSelectionModelChange={setRowSelectionModel}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 400,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {displayedRows.length > 0 && (
              <BarChart
                xAxis={[{ data: displayedRows.map(r => r.typeOfCoffee), scaleType: 'band' }]}
                series={[
                  { data: displayedRows.map(r => r.itemsSold), label: 'Items Sold' },
                  { data: displayedRows.map(r => r.itemsSold * r.price), label: 'Revenue ($)' },
                ]}
                height={300}
              />
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default CoffeeStats;
