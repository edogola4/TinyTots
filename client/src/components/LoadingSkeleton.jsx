import React from 'react';
import { 
  Box, 
  Skeleton, 
  Grid, 
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';

const StatCardSkeleton = () => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width={100} height={24} sx={{ ml: 2 }} />
      </Box>
      <Skeleton variant="text" width="60%" height={32} />
      <Skeleton variant="text" width="40%" height={20} />
    </CardContent>
  </Card>
);

const TableRowSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((row) => (
      <Box key={row} sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
        <Skeleton variant="text" width="40%" height={20} />
        <Box sx={{ flexGrow: 1 }} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>
    ))}
  </>
);

export const DashboardSkeleton = () => (
  <Box sx={{ width: '100%' }}>
    <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
    
    {/* Stats Grid */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[1, 2, 3, 4].map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <StatCardSkeleton />
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3}>
      {/* Recent Orders */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
            <Divider sx={{ mb: 2 }} />
            <TableRowSkeleton />
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Users */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
            <Divider sx={{ mb: 2 }} />
            <TableRowSkeleton />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default DashboardSkeleton;
