export const widgets = [
    {
        name: 'Bar Chart',
        description: 'Display data as a bar chart',
        icon: 'BarChart',
        config: {
          type: 'bar',
          options: {
            legend: { show: true },
            color: ['#4A6FDC', '#56B3B4', '#F7C244'],
          },
        },
      },
      {
        name: 'Line Chart',
        description: 'Display data as a line chart',
        icon: 'LineChart',
        config: {
          type: 'line',
          options: {
            smooth: true,
            color: ['#4A6FDC', '#56B3B4'],
          },
        },
      },
      {
        name: 'Pie Chart',
        description: 'Display data as a pie chart',
        icon: 'PieChart',
        config: {
          type: 'pie',
          options: {
            color: ['#4A6FDC', '#56B3B4', '#F7C244', '#E9573F', '#8CC152'],
          },
        },
      },
]