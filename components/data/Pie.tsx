import { useRef } from "react";
import ReactECharts from "echarts-for-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
const Pie = ({ data }) => {
  const chartRef = useRef(null);
  // const option = {
  //   tooltip: {
  //     trigger: "item",
  //     formatter: "{a} <br/>{b}: {c} ({d}%)",
  //   },
  //   legend: {
  //   //   orient: 'vertical',
  //   //   // right: 10,
  //   //   top: 'center',
  //   //   data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  //   //   textStyle: {
  //   //     color: '#999',
  //   //     fontSize: 12
  //   //   },
  //   //   itemWidth: 8,
  //   //   itemHeight: 8,
  //   //   itemGap: 12,
  //     show: false,
  //   },
  //   color: ["#0f5209", "#f09e07", "#bfbbba", "#456ad9", "#8a28bf", "#bf28a9"],
  //   series: [
  //     {
  //       name: "Traffic Source",
  //       type: "pie",
  //       radius: ["50%", "70%"],
  //       // center: ['30%', '50%'],
  //       avoidLabelOverlap: true,
  //       label: {
  //         show: true,
  //         formatter: function (params) {
  //           // Format to show name and percentage on separate lines
  //           // with percentage at the bottom
  //           return `{a|${params.name}}\n{b|${params.percent}%}`;
  //         },
  //         rich: {
  //           a: {
  //             color: "#333",
  //             fontSize: 14,
  //             lineHeight: 20,
  //             fontWeight: "bold",
  //             align: "center",
  //           },
  //           b: {
  //             color: "#666",
  //             fontSize: 12,
  //             lineHeight: 20,
  //             align: "center",
  //           },
  //         },
  //       },
  //       labelLine: {
  //         lineStyle: {
  //           color: "black",
  //           width: 2,
  //           cap: "round",
  //         },
  //         length: 50,
  //       },

  //       data: [
  //         { value: 335, name: "Direct" },
  //         { value: 310, name: "Email" },
  //         { value: 234, name: "Ad Networks" },
  //         { value: 135, name: "Video Ads" },
  //         { value: 1548, name: "Search Engines" },
  //       ],
  //     },
  //   ],
  // };
  console.log("checxxxxxxxxxxx", data)
  const formattedOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      data: data.groupName.map((group) => group.name),
    },
    color: ["#0f5209", "#f09e07", "#bfbbba", "#456ad9", "#8a28bf", "#bf28a9"],
    series: [
      {
        name: data.groupName[0].name,
        type: "pie",

        data: data.items.map((item, index) => ({
          name: data.items[index].name,
          value: Number(data.groupValueFields[0].values[index]),
        })),
        radius: ["50%", "70%"],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: function (params) {
            // Format to show name and percentage on separate lines
            // with percentage at the bottom
            return `{a|${params.name}}\n{b|${params.percent}%}`;
          },
          rich: {
            a: {
              color: "#333",
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "bold",
              align: "center",
            },
            b: {
              color: "#666",
              fontSize: 12,
              lineHeight: 20,
              align: "center",
            },
          },
        },
        labelLine: {
          lineStyle: {
            color: "black",
            width: 2,
            cap: "round",
          },
          length: 50,
        },
      },
    ],
    // series: [
    //   {
    //     ...options.series[0],
    //     label: {
    //       ...options.series[0].label,
    //       formatter: function (params) {
    //         // Format to show name and percentage on separate lines
    //         // with percentage at the bottom
    //         return `{a|${params.name}}\n{b|${params.percent}%}`;
    //       },
    //     },
    //   },
    // ],
  };

  return (
    <ReactECharts
      ref={chartRef}
      option={formattedOption}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Pie;
