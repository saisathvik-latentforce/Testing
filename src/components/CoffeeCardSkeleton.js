import React from 'react';
import { Card, CardContent, Skeleton, Box, Stack } from '@mui/material';

const CoffeeCardSkeleton = () => (
  <Card sx={{ maxWidth: 345, padding: 2, border: '2px solid transparent' }}>
    <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 1 }} />
    <CardContent sx={{ minHeight: 200 }}>
      <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="rounded" width={60} height={36} />
        <Skeleton variant="circular" width={36} height={36} />
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
        <Skeleton variant="rounded" width={70} height={24} />
        <Skeleton variant="rounded" width={90} height={24} />
      </Stack>
    </CardContent>
  </Card>
);

export default CoffeeCardSkeleton;
