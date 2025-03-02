export const dashboardWidgets = [
    {
        id:"dashWid1",
        title: 'User Activity Trends',
        dashboardId: "1",
        widgetTypeId: "1",
        position: { x: 6, y: 0, w: 6, h: 7 },
        config: {
          type: 'line',
          dataSource: 'userActivity',
          options: {
            areaStyle: {},
          },
        },
      },
      {
        id:"dashWid2",
        title: 'Product Sales Distribution',
        dashboardId: "1",
        widgetTypeId: "2",
        position: { x: 0, y: 7, w: 6, h: 8 },
        config: {
          type: 'pie',
          dataSource: 'sales',
        },
      },
      {
        id:"dashWid3",
        title: 'Monthly Sales by Product',
        dashboardId: 1,
        widgetTypeId: 3,
        position: { x: 0, y: 0, w: 6, h: 7 },
        config: {
          type: 'bar',
          dataSource: 'sales',
          options: {
            showLegend: true,
          },
        },
      },
]