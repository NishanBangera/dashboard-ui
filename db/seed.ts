import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
// Create Widget
const widget = await prisma.widgetType.createMany({
  data: [
    {name: "LineChart"},
    {name: "PieChart"},
    {name: "RadarChart"},
  ]
})

// Create Dashboard
 const dashboard = await prisma.dashboard.create({
   data: {  
      name: "Dashboard1",
      description: "Overview of Dashboard1",
      isDefault: true,
      userId: "d1d26628-8052-466a-9c33-0f67a56e1119",
    },
  });



// await prisma.layout.create({
//     data: {
//       name: "Default",
//       dashboardId: "0c98b537-fbc0-47e4-a9ac-396e0b19664c",
//       config: {
//         cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//         rowHeight: 30,
//         layouts:{
//           lg:[]
//         }
//       },
//     },
//   });


  // Create widget types
  // const radarChartWidget = await prisma.widgetType.create({
  //   data: {
  //     name: "RadarChart",
  //     description: "Display data as a radar chart",
  //     icon: "RadarChart",
  //     config: {
  //       title: {
  //         text: "Basic Radar Chart",
  //       },
  //       color: [
  //         "#0f5209",
  //         "#f09e07",
  //         "#bfbbba",
  //         "#456ad9",
  //         "#8a28bf",
  //         "#bf28a9",
  //       ],
  //       radar: {
  //         startAngle: 0,
  //         splitNumber: 2,
  //         splitLine: {
  //           show: true,
  //         },
  //         splitArea: {
  //           show: false,
  //         },
  //       },
  //     },
  //   },
  // });

  // const lineChartWidget = await prisma.widgetType.create({
  //   data: {
  //     name: "LineChart",
  //     description: "Display data as a line chart",
  //     icon: "LineChart",
  //     config: {
  //       color: [
  //         "#0f5209",
  //         "#f09e07",
  //         "#bfbbba",
  //         "#456ad9",
  //         "#8a28bf",
  //         "#bf28a9",
  //       ],
  //       tooltip: {
  //         trigger: "axis",
  //         padding: 0,
  //         borderWidth: 0,
  //         borderRadius: 20,
  //         backgroundColor: "transparent",
  //         show: true,
  //         showContent: true,
  //       },
  //       xAxis: {
  //         splitLine: {
  //           show: true,
  //         },
  //       },
  //       yAxis: {
  //         type: "value",
  //         axisLabel: {
  //           formatter: "${value}",
  //         },
  //         interval: 200,
  //         splitLine: {
  //           show: false,
  //         },
  //       },
  //       grid: {
  //         show: true,
  //         backgroundColor: "#ffffff",
  //       },
  //       series: [],
  //     },
  //   },
  // });

  // const pieChartWidget = await prisma.widgetType.create({
  //   data: {
  //     name: "PieChart",
  //     description: "Display data as a pie chart",
  //     icon: "PieChart",
  //     config: {
  //       tooltip: {
  //         trigger: "item",
  //         formatter: "{a} <br/>{b}: {c} ({d}%)",
  //       },
  //       legend: {
  //         show: false,
  //       },
  //       color: [
  //         "#0f5209",
  //         "#f09e07",
  //         "#bfbbba",
  //         "#456ad9",
  //         "#8a28bf",
  //         "#bf28a9",
  //       ],
  //       series: [
  //         {
  //           name: "Traffic Source",
  //           type: "pie",
  //           radius: ["50%", "70%"],
  //           avoidLabelOverlap: true,
  //           label: {
  //             show: true,

  //             rich: {
  //               a: {
  //                 color: "#333",
  //                 fontSize: 14,
  //                 lineHeight: 20,
  //                 fontWeight: "bold",
  //                 align: "center",
  //               },
  //               b: {
  //                 color: "#666",
  //                 fontSize: 12,
  //                 lineHeight: 20,
  //                 align: "center",
  //               },
  //             },
  //           },
  //           labelLine: {
  //             lineStyle: {
  //               color: "black",
  //               width: 2,
  //               cap: "round",
  //             },
  //             length: 50,
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  // Create a test user
  // const user = await prisma.user.create({
  //   data: {
  //     email: "test@example.com",
  //     name: "Test User",
  //   },
  // });

  // Create a dashboard
  // const dashboard = await prisma.dashboard.create({
  //   data: {
  //     name: "Sales Overview",
  //     description: "Overview of sales performance",
  //     isDefault: true,
  //     userId: user.id,
  //   },
  // });

  // Create a layout
  // const layout = await prisma.layout.create({
  //   data: {
  //     name: "Default",
  //     dashboardId: dashboard.id,
  //     config: {
  //       cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  //       rowHeight: 30,
  //     },
  //   },
  // });

  // Add some widgets to the dashboard
  // await prisma.dashboardWidget.create({
  //   data: {
  //     title: 'Monthly Sales by Product',
  //     dashboardId: dashboard.id,
  //     widgetTypeId: barChartWidget.id,
  //     position: { x: 0, y: 0, w: 6, h: 7 },
  //     config: {
  //       type: 'bar',
  //       dataSource: 'sales',
  //       options: {
  //         showLegend: true,
  //       },
  //     },
  //   },
  // });

  // await prisma.dashboardWidget.create({
  //   data: {
  //     title: 'User Activity Trends',
  //     dashboardId: dashboard.id,
  //     widgetTypeId: lineChartWidget.id,
  //     position: { x: 6, y: 0, w: 6, h: 7 },
  //     config: {
  //       type: 'line',
  //       dataSource: 'userActivity',
  //       options: {
  //         areaStyle: {},
  //       },
  //     },
  //   },
  // });

  // await prisma.dashboardWidget.create({
  //   data: {
  //     title: 'Product Sales Distribution',
  //     dashboardId: dashboard.id,
  //     widgetTypeId: pieChartWidget.id,
  //     position: { x: 0, y: 7, w: 6, h: 8 },
  //     config: {
  //       type: 'pie',
  //       dataSource: 'sales',
  //     },
  //   },
  // });

  // Add sample data for charts
  // Sales data
  //   const products = ['Product A', 'Product B', 'Product C'];
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  //     for (const month of months) {
  //       await prisma.salesData.create({
  //         data: {
  //           month,
  //           year: 2024,
  //           amount: Math.floor(Math.random() * 10000) + 1000, // Random amount between 1000-11000

  //         },
  //       });
  //     }
  //   }

  //   // User activity data
  //   const today = new Date();
  //   for (let i = 30; i >= 0; i--) {
  //     const date = new Date(today);
  //     date.setDate(date.getDate() - i);

  //     await prisma.userActivity.create({
  //       data: {
  //         date,
  //         userCount: Math.floor(Math.random() * 1000) + 500, // Random count between 500-1500
  //         pageViews: Math.floor(Math.random() * 5000) + 2000, // Random views between 2000-7000
  //       },
  //     });
  //   }

  //   console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
