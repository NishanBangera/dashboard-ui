"use client";

import RadarChart from "./data/Radar";

import { Responsive, WidthProvider } from "react-grid-layout";
import Line from "./data/Line";
import Pie from "./data/Pie";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllDashboards } from "@/lib/actions/dashboard.action";
import { LayoutConfig, updateLayoutConfig } from "@/lib/actions/layout.action";
import { Card } from "./ui/card";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardGrid = () => {
  const queryClient = useQueryClient();
  const {data} = useQuery({
    queryKey: ["fetchDashboards"],
    queryFn: () => fetchAllDashboards("d1d26628-8052-466a-9c33-0f67a56e1119")
  })

  const updateLayout = useMutation({
    mutationFn: (data) => updateLayoutConfig(data, "2514d2c7-a01e-4df5-a1df-25ed9f7654bf"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });


   
  
  if(!data?.data) return <div></div>;
  console.log("dashboards",data)
  const strucutredData = {
    ...data.data[0],
    layouts: [{ config: data.data[0].layouts[0].config as LayoutConfig }]
  }
  // data.data[0].layouts[0].config = data?.data[0]?.layouts[0].config as LayoutConfig

  const handleLayoutChange = (layout, layouts) => {
    console.log("layout", layout);
    console.log("layouts", layouts);
    updateLayout.mutate(layouts)

  };
    // const option = {
    //   title: {
    //     text: 'Stacked Line'
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     backgroundColor: '#000000'
    //   },
    //   legend: {
    //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {}
    //     }
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     splitArea: {
    //       show: true,
    //       areaStyle:{
    //         color: ["#ffffff", "rgba(200,200,200,0.13)"]
    //       }
    //     }
    //   },
    //   yAxis: {
    //     type: 'value',

    //   },
    //   series: [
    //     {
    //       name: 'Email',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [520, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: 'Union Ads',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: 'Video Ads',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //       name: 'Direct',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //       name: 'Search Engine',
    //       type: 'line',
    //       stack: 'Total',
    //       data: [820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // };

  // const option1 = {
  //   legend: {
  //     data: [
  //       { name: "Test1", icon: "diamond" },
  //       { name: "Test2", icon: "diamond" },
  //     ],
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     padding: 0,
  //     borderWidth: 0,
  //     borderRadius: 20,
  //     backgroundColor: "transparent",
  //     formatter: function (params) {
  //       let content = `
  //         <div class="relative bg-black shadow-lg rounded-lg p-3 border border-gray-200">
  //           <div class="font-semibold text-white pb-1 mb-2">${params[0].axisValue}</div>
  //           <div class="flex flex-col space-y-1">`;

  //       params.forEach((item) => {
  //         content += `
  //           <div class="flex items-center space-x-3">
  //           <div class="flex items-center">
  //             <span class="w-3 h-3 rounded-full" style="background:${item.color}"></span>
  //             <span class="ml-2 text-slate-500 ">${item.seriesName}:</span>
  //           </div>
  //             <span class="ml-auto font-bold text-white">$${item.value}</span>
  //           </div>`;
  //       });

  //       content += `</div>
  //         <div class="absolute -right-3 top-1/12 transform -translate-x-1/2 w-4 h-4 bg-black border-gray-200 rotate-45"></div>
  //         </div>`;

  //       return content;
  //     },
  //     show: true,
  //     showContent: true,
  //   },
  //   xAxis: {
  //     type: "category",
  //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  //     splitLine: {
  //       show: true,
  //     },
  //   },
  //   yAxis: {
  //     type: "value",
  //     axisLabel: {
  //       formatter: "${value}",
  //     },
  //     interval: 200,
  //     splitLine: {
  //       show: false,
  //     },
  //   },
  //   grid: {
  //     show: true,
  //     backgroundColor: "#ffffff",
  //   },
  //   series: [
  //     {
  //       name: "Test1",
  //       data: [150, 230, 224, 218, 135, 147, 260],
  //       type: "line",
  //     },
  //     {
  //       name: "Test2",
  //       data: [350, 230, 224, 218, 135, 147, 260],
  //       type: "line",
  //     },
  //   ],
  // };

// const option2  = {
//     title: {
//       text: 'Basic Radar Chart'
//     },
//     legend: {
//       data: ['Allocated Budget']
//     },
//     radar: {
//       // shape: 'circle',
//       indicator: [
//         { name: 'Sales', max: 6500 },
//         { name: 'Administration', max: 16000 },
//         { name: 'Information Technology', max: 30000 },
//         { name: 'Customer Support', max: 38000 },
//         { name: 'Development', max: 52000 },
//         { name: 'Marketing', max: 25000 }
//       ],
//       axisName: {
//         formatter: function(value, indicator) {
//           // Get the corresponding data value for this indicator
//           const echartsInstance = chartRef.current.getEchartsInstance();
//           const seriesData = option.series[0].data[0].value;
//           const index = indicator.index;

//           // Return both the indicator name and the data value below it
//           return `{a|${value}}\n{b|${seriesData[index]}}`;
//         },
//          rich: {
//           a: {
//             color: '#333',
//             fontSize: 14,
//             lineHeight: 20
//           },
//           b: {
//             color: '#666',
//             fontSize: 12,
//             lineHeight: 20
//           }
//         }
//       },
//       startAngle:0,
//       splitNumber:2,
//       splitLine:{
//         show:true,
//       },
//       splitArea:{
//         show:false
//       }
//     },
//     series: [
//       {
//         name: 'Budget vs spending',
//         type: 'radar',
//         data: [
//           {
//             value: [4200, 3000, 20000, 35000, 50000, 18000],
//             name: 'Allocated Budget',
//             areaStyle: {},
//             label:{show:true}
//           },
//           // {
//           //   value: [5000, 14000, 28000, 26000, 42000, 21000],
//           //   name: 'Actual Spending',

//           // }
//         ],
//       }
//     ]
//   };

console.log("finallllllll",strucutredData.layouts[0]?.config.layouts)
  return (
    // <div></div>
    <ResponsiveGridLayout
      className="grid gap-5"
      layouts={strucutredData.layouts[0]?.config.layouts ? strucutredData?.layouts[0]?.config.layouts : {lg:[]}}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      isDraggable={true}
      isResizable={true}
      onLayoutChange={handleLayoutChange}
    >
      {data?.data[0].widgets.map((widget) => {
        return (
          <Card key={widget.id} className="">
            {widget.widgetType.name === "LineChart" && <Line options={widget.config}/>}
            {widget.widgetType.name === "RadarChart" && <RadarChart options={widget.config}/>}
            {widget.widgetType.name === "PieChart" && <Pie options={widget.config}/>}
          </Card>
        )
      })}
      
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;

// import React, { useRef, useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";

// const RadarChart = () => {
//   const chartRef = useRef(null);
  //Radar
  // const [option, setOption] = useState({
  //   title:{
  //     text:"Sales By Region",
  //     textStyle:{
  //       color:"#000000",
  //       fontSize:14
  //   }},
  //   radar: {
  //     indicator: [
  //       { name: "Sales", max: 6500 },
  //       { name: "Administration", max: 16000 },
  //       { name: "Information Technology", max: 30000 },
  //       { name: "Customer Support", max: 38000 },
  //       { name: "Development", max: 52000 },
  //       { name: "Marketing", max: 25000 },
  //     ],
  //     startAngle: 0,
  //     splitNumber: 2,
  //     splitArea: {
  //       show: false,
  //   }},
  //   series: [
  //     {
  //       name: "Budget vs spending",
  //       type: "radar",
  //       data: [
  //         {
  //           value: [4200, 3000, 20000, 35000, 50000, 18000],
  //           name: "Allocated Budget",
  //           areaStyle: {
  //             opacity: 0.2,
  //           },
  //         },
  //         // {
  //         //   value: [5000, 14000, 28000, 26000, 42000, 21000],
  //         //   name: 'Actual Spending'
  //         // }
  //       ],
  //     },
  //   ],
  //   color: ["#0d6904", "#91cc75"],
    
  // });

  // useEffect(() => {
    // Only run after initial render when chartRef exists
    // if (chartRef.current && chartRef.current.getEchartsInstance) {
    //   const echartsInstance = chartRef.current.getEchartsInstance();

    //   // Get current series data after chart is rendered
    //   const allSeriesData = echartsInstance.getOption().series[0].data;
    //   const indicators = echartsInstance.getOption().radar[0].indicator;

    //   const indicatorNames = indicators.map((ind) => ind.name);
    //   // console.log("nisaaaaaaaaa", seriesData)

    //   // Update the option with formatter that can access the series data
    //   setOption((prevOption) => ({
    //     ...prevOption,
    //     radar: {
    //       ...prevOption.radar,
    //       axisName: {
    //         formatter: function (value) {
    //           const index = indicatorNames.indexOf(value);
    //           if (index !== -1) {
    //             let result = `{a|${value}}\n`;

    //             // Add values from all series
    //             if (allSeriesData.length > 1) {
    //               allSeriesData.forEach((series, i) => {
    //                 result += `{b${i}|${series.name}: ${series.value[index]}}\n`;
    //               });
    //             } else {
    //               result += `{b|${allSeriesData[0].value[index]}}\n`;
    //             }

    //             return result;
    //           }
    //           return value;
    //         },
    //         rich: {
    //           a: { color: "#BCBCBC", fontSize: 14, padding: 4, align: "right" },
    //           b: {
    //             color: "#000000",
    //             fontSize: 17,
    //             padding: 4,
    //             fontWeight: "bold",
    //           },
    //           b0: { color: "#5470c6", padding: 4, fontSize: 12 },
    //           b1: { color: "#91cc75", padding: 4, fontSize: 12 },
    //         },
    //       },
       
    //     },
    //   }));
    // }

  // }, []);

  //Pie
  // const [option, setOption] = useState({
  //   tooltip: {
  //     trigger: 'item'
  //   },
  //   legend: {
  //     orient: 'vertical',
  //     left: 'left'
  //   },
  //   series: [
  //     {
  //       name: 'Sales Data',
  //       type: 'pie',
  //       radius: '50%',
  //       data: [
  //         { value: 1048, name: 'Product A' },
  //         { value: 735, name: 'Product B' },
  //         { value: 580, name: 'Product C' },
  //         { value: 484, name: 'Product D' },
  //         { value: 300, name: 'Product E' }
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)'
  //         }
  //       }
  //     }
  //   ]
  // });

  // useEffect(() => {
  //   if (chartRef.current && chartRef.current.getEchartsInstance) {
  //     const echartsInstance = chartRef.current.getEchartsInstance();
  //     const currentOption = echartsInstance.getOption();
  //     const seriesData = currentOption.series[0].data;
      
  //     setOption(prevOption => ({
  //       ...prevOption,
  //       series: [{
  //         ...prevOption.series[0],
  //         label: {
  //           show: true,
  //           formatter: function(params) {
  //             // Format to show both name and value
  //             return `{a|${params.name}}\n{b|${params.value}}`;
  //           },
  //           rich: {
  //             a: {
  //               color: '#333',
  //               fontSize: 14,
  //               lineHeight: 20,
  //               fontWeight: 'bold',
  //               align: 'center'
  //             },
  //             b: {
  //               color: '#666',
  //               fontSize: 12,
  //               lineHeight: 20,
  //               align: 'center'
  //             }
  //           }
  //         }
  //       }]
  //     }));
  //   }
  // }, []);

//   return (
//     <div className="w-3/6">
//     <ReactECharts
//       ref={chartRef}
//       option={option}
//       style={{ height: "400px", width: "100%" }}
//     />
//     </div>
//   );
// };

// export default RadarChart;
