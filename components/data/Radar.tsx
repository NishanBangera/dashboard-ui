import React, { useRef } from "react";
import ReactECharts from "echarts-for-react";

const RadarChart = ({options}) => {
  const chartRef = useRef<ReactECharts>(null);
  console.log("optionsRRRRR ", options)
  const indicatorNames = options.radar.indicator.map((ind) => ind.name);
  const allSeriesData = options.series[0].data
  console.log("bvvvvvvvv",allSeriesData)
  const formattedOptions = {
    ...options,
    radar:{
      ...options.radar,
      axisName:{
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
      splitArea:{
        show:true
      },
      splitLine: {
        lineStyle: {
            color: 'gray', // Change line color
            width: 2,      // Line width
            type: '' // Line style: 'solid', 'dashed', 'dotted'
        }
    },
      splitNumber:2
  }}
  console.log("formattedOptions", formattedOptions)
  return (
    <ReactECharts
      ref={chartRef}
      option={formattedOptions}
      style={{ width: "100%", height: "100%" }} 
      className="px-5"
    />
  );
};

export default RadarChart;
