import React, {useState} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { politicalData } from './mock';

const processDataForCharts = (data) => {
  const statusSummary = {};
  const partySummary = {};
  const districtSummary = {};

  data.forEach((item) => {
    const { Status, Party, District } = item;
    statusSummary[Status] = (statusSummary[Status] || 0) + 1;
    partySummary[Party] = (partySummary[Party] || 0) + 1;
    districtSummary[District] = (districtSummary[District] || 0) + 1;
  });

  return {
    pieChartData: Object.keys(statusSummary).map(status => ({
      name: status,
      y: statusSummary[status]
    })),
    barChartData: Object.keys(partySummary).map(party => {
      return (
        ({
          name: party,
          y: partySummary[party]
        })
      )
    }),
    districtBarChartData: Object.keys(districtSummary).map(district => ({
      name: district,
      y: districtSummary[district]
    }))
  };
};

const { pieChartData, barChartData, districtBarChartData } = processDataForCharts(politicalData);

const barChartOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Candidate Distribution by Party'
  },
  xAxis: {
    categories: barChartData.map(data => data.name)
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Candidates'
    },
    gridLineWidth: 1,
    gridLineColor: '#e6e6e6',
    gridLineDashStyle: 'Solid'
  },
  series: [{
    name: 'Candidates',
    data: barChartData
  }]
};

const districtBarChartOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Candidate Distribution by District'
  },
  xAxis: {
    categories: districtBarChartData.map(data => data.name)
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of Candidate'
    },
  },
  series: [{
    name: 'Candidate',
    data: districtBarChartData
  }]
};


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

const pieChartOptions = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Candidate Distribution by Status'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Status',
    colorByPoint: true,
    data: pieChartData
  }]
};


const columns = [
  { field: 'Candidate', headerName: 'Candidate', width: 200, filterable: true, type: 'text' },
  { field: 'Title', headerName: 'Title', width: 200, filterable: true, type: 'text' },
  { field: 'Status', headerName: 'Status', width: 120, filterable: true, type: 'singleSelect', valueOptions: ['Incumbent', 'Challenger', 'Open Seat', 'Write-in Candidate'] },
  { field: 'Party', headerName: 'Party', width: 150, filterable: true, type: 'singleSelect', valueOptions: ['Republican', 'Democrat', 'Independent', 'Other'] },
  { field: 'Office', headerName: 'Office', width: 250, filterable: true, type: 'text' },
  { field: 'District', headerName: 'District', width: 150, filterable: true, type: 'text' },
  { field: 'Address', headerName: 'Address', width: 250, filterable: true, type: 'text' },
  { field: 'City', headerName: 'City', width: 150, filterable: true, type: 'text' },
  { field: 'State', headerName: 'State', width: 120, filterable: true, type: 'singleSelect', valueOptions: ['State A', 'State B', 'State C', 'State D'] },
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ height: '50%', width: '100%' }}>
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
            filterModel={filterModel}
            onFilterModelChange={(newModel) => setFilterModel(newModel)}
          />
        </div>
        <div style={{ height: '50%', display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30%' }}>
            <HighchartsReact highcharts={Highcharts} options={barChartOptions}/>
          </div>
          <div style={{ width: '30%' }}>
            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
          </div>
          <div style={{ width: '30%' }}>
            <HighchartsReact highcharts={Highcharts} options={districtBarChartOptions}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MyDataGridComponent;