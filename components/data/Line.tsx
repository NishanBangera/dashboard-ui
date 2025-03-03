import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";
const Line = ({ options }) => {
  const chartRef = useRef(null);
  // const option = {
  //     legend: {
  //       data: [
  //         { name: "Test1", icon: "diamond" },
  //         { name: "Test2", icon: "diamond" },
  //       ],
  //     },
  //     tooltip: {
  //       trigger: "axis",
  //       padding: 0,
  //       borderWidth: 0,
  //       borderRadius: 20,
  //       backgroundColor: "transparent",
  //       formatter: function (params) {
  //         let content = `
  //           <div class="relative bg-black shadow-lg rounded-lg p-3 border border-gray-200">
  //             <div class="font-semibold text-white pb-1 mb-2">${params[0].axisValue}</div>
  //             <div class="flex flex-col space-y-1">`;

  //         params.forEach((item) => {
  //           content += `
  //             <div class="flex items-center space-x-3">
  //             <div class="flex items-center">
  //               <span class="w-3 h-3 rounded-full" style="background:${item.color}"></span>
  //               <span class="ml-2 text-slate-500 ">${item.seriesName}:</span>
  //             </div>
  //               <span class="ml-auto font-bold text-white">$${item.value}</span>
  //             </div>`;
  //         });

  //         content += `</div>
  //           <div class="absolute -right-3 top-1/12 transform -translate-x-1/2 w-4 h-4 bg-black border-gray-200 rotate-45"></div>
  //           </div>`;

  //         return content;
  //       },
  //       show: true,
  //       showContent: true,
  //     },
  //     xAxis: {
  //       type: "category",
  //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  //       splitLine: {
  //         show: true,
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       axisLabel: {
  //         formatter: "${value}",
  //       },
  //       interval: 200,
  //       splitLine: {
  //         show: false,
  //       },
  //     },
  //     grid: {
  //       show: true,
  //       backgroundColor: "#ffffff",
  //     },
  //     series: [
  //       {
  //         name: "Test1",
  //         data: [150, 230, 224, 218, 135, 147, 260],
  //         type: "line",
  //       },
  //       {
  //         name: "Test2",
  //         data: [350, 230, 224, 218, 135, 147, 260],
  //         type: "line",
  //       },
  //     ],
  //   };
  const formattedOption = {
    ...options,
    tooltip: {
      ...options.tooltip,
      formatter: function (params) {
        let content = `
            <div class="relative bg-black shadow-lg rounded-lg p-3 border border-gray-200">
              <div class="font-semibold text-white pb-1 mb-2">${params[0].axisValue}</div>
              <div class="flex flex-col space-y-1">`;

        params.forEach((item) => {
          content += `
              <div class="flex items-center space-x-3">
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full" style="background:${item.color}"></span>
                <span class="ml-2 text-slate-500 ">${item.seriesName}:</span>
              </div>
                <span class="ml-auto font-bold text-white">$${item.value}</span>
              </div>`;
        });

        content += `</div>
            <div class="absolute -right-3 top-1/12 transform -translate-x-1/2 w-4 h-4 bg-black border-gray-200 rotate-45"></div>
            </div>`;

        return content;
      },
    },
  };
  return (
    <>
      <ReactECharts
        ref={chartRef}
        option={formattedOption}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};

export default Line;
