import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { politicalData } from './mock';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
        },
        columnHeader: {
          backgroundColor: '#f5f5f5',
        },
        row: {
          '&.Mui-even': {
            backgroundColor: '#fafafa',
          },
        },
      },
    },
  },
});

const columns = [
  {
    field: 'Candidate', headerName: 'Candidate', width:
      200, filterable: true, type: 'text'
  },
  { field: 'Title', headerName: 'Title', width: 200, filterable: true, type: 'text' },
  { field: 'Status', headerName: 'Status', width: 120, filterable: true, type: 'singleSelect', valueOptions: ['A', 'N', 'E'] },
  { field: 'Party', headerName: 'Party', width: 150, filterable: true, type: 'singleSelect', valueOptions: ['Republican'] },
  {
    field

      : 'Office', headerName: 'Office', width: 250, filterable: true, type: 'text'
  },
  { field: 'District', headerName: 'District', width: 150, filterable: true, type: 'text' },
  { field: 'Address', headerName: 'Address', width: 250, filterable: true, type: 'text' },
  { field: 'City', headerName: 'City', width: 150, filterable: true, type: 'text' },
  { field: 'State', headerName: 'State', width: 120, filterable: true, type: 'singleSelect', valueOptions: ['CA'] },
  { field: 'ZipCode', headerName: 'ZipCode', width: 130, filterable: true, type: 'number' },
  { field: 'Email', headerName: 'Email', width: 200, filterable: true, type: 'text' },
  { field: 'Phone', headerName: 'Phone', width: 150, filterable: true, type: 'text' },
  {
    field: 'NOMIssueDate',
    headerName: 'Nomination Issue Date',
    width: 150,
    filterable: true,
    type: 'date',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'NOMFileDate',
    headerName: 'Nomination File Date',
    width: 150,
    filterable: true,
    type: 'date',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  }
];
const MyDataGridComponent = () => {
  const rows = politicalData.map((item, index) => ({ ...item, id: index }));

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
          getRowClassName={(params) => `Mui-even:${params.index % 2 === 0}`}
        />
      </div>
    </ThemeProvider>
  );
};

export default MyDataGridComponent;