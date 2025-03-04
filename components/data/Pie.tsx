import ReactECharts from "echarts-for-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
const Pie = ({ data }) => {
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

  };

  return (
    <ReactECharts
      option={formattedOption}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Pie;
