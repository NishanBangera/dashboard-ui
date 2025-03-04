import ReactECharts from "echarts-for-react";

const RadarChart = ({ data }) => {
  const indicatorNames = data.items.map((item) => item.name);
  const allSeriesData = data.groupValueFields.map((group, index) => ({
    name: data.groupName[index].name,
    value: group.values.map((value) => Number(value)),
  }));

  const formattedOptions = {
    legend: {
      data: data.groupName.map((group) => ({
        name: group.name,
        icon: "diamond",
      })),
    },
    color: ["#0f5209", "#f09e07", "#bfbbba", "#456ad9", "#8a28bf", "#bf28a9"],
    radar: {
      indicator: data.items.map((item) => ({
        name: item.name,
        max: Number(data.maxValue),
      })),
      startAngle: 0,
      splitNumber: 2,
      splitLine: {
        lineStyle: {
          color: "gray", 
          width: 2,
          type: "solid",
        },
      },
      splitArea: {
        show: false,
      },
      axisName: {
        formatter: function (value) {
          const index = indicatorNames.indexOf(value);
          if (index !== -1) {
            let result = `{a|${value}}\n`;

            // Add values from all series
            if (allSeriesData.length > 1) {
              allSeriesData.forEach((series, i) => {
                result += `{b${i}|${series.name}: ${series.value[index]}}\n`;
              });
            } else {
              result += `{b|${allSeriesData[0].value[index]}}\n`;
            }

            return result;
          }
          return value;
        },
        rich: {
          a: { color: "#BCBCBC", fontSize: 14, padding: 4, align: "right" },
          b: {
            color: "#000000",
            fontSize: 17,
            padding: 4,
            fontWeight: "bold",
          },
          b0: { color: "#5470c6", padding: 4, fontSize: 12 },
          b1: { color: "#91cc75", padding: 4, fontSize: 12 },
        },
      },
    },
    series: [
      {
        type: "radar",
        data: data.groupValueFields.map((group, index) => ({
          name: data.groupName[index].name,
          value: group.values.map((value) => Number(value)),
          areaStyle:{},
        })),
      },
    ],
  };

  return (
    <ReactECharts
      option={formattedOptions}
      style={{ width: "100%", height: "100%" }}
      className="px-5"
    />
  );
};

export default RadarChart;
