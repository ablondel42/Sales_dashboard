import React from 'react';
import { useTheme, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { useGetUserPerformanceQuery } from 'state/api';
import { useSelector } from 'react-redux';
import CustomColumnMenu from 'components/CustomColumnMenu';

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);
  console.log('🚀 ~ file: index.jsx:11 ~ Performance ~ data:', data);
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      sortable: false,
      renderCell: (params) => params.value.length,
      flex: 0.5,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      flex: 1,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header
        title='PERFORMANCE'
        subtitle='Track your affiliate sales performances'
      />
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
