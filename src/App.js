import React from 'react';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { politicalData } from './mock';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}/>
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#3399ff',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#99ccff' : '#3399ff',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

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

export default function MyDataGridComponent() {

  const filterColumns = ({ field, columns, currentFilters }) => {
    const filteredFields = currentFilters?.map((item) => item.field);
    return columns
      .filter(
        (colDef) =>
          colDef.filterable &&
          (colDef.field === field || !filteredFields.includes(colDef.field)),
      )
      .map((column) => column.field);
  };

  const getColumnForNewFilter = ({ currentFilters, columns }) => {
    const filteredFields = currentFilters?.map(({ field }) => field);
    const columnForNewFilter = columns
      .filter(
        (colDef) => colDef.filterable && !filteredFields.includes(colDef.field),
      )
      .find((colDef) => colDef.filterOperators?.length);
    return columnForNewFilter?.field ?? null;
  };
  const [showTable, setShowTable] = React.useState(true);

  const handleChange = (event) => {
    setShowTable(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 3 }}
            checked={showTable}
            onChange={handleChange} />}
        label={showTable ? "Table" : "Chart"}
      />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {showTable ?
          <div style={{ height: '70%', width: '100%' }}>
            <DataGridPro
              rows={politicalData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
              slotProps={{
                filterPanel: {
                  filterFormProps: {
                    filterColumns,
                  },
                  getColumnForNewFilter,
                },
              }}
            />
          </div>
          :
          <Box m={10}>
            <div style={{ height: '50%', display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ width: '30%' }}>
                <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
              </div>
              <div style={{ width: '30%' }}>
                <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
              </div>
              <div style={{ width: '30%' }}>
                <HighchartsReact highcharts={Highcharts} options={districtBarChartOptions} />
              </div>
            </div>
          </Box>
        }
      </div>
    </ThemeProvider>
  );
}

