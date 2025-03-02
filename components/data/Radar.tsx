import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const RadarChart = () => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({
    radar: {
      indicator: [
        { name: "Indicator 1", max: 100 },
        { name: "Indicator 2", max: 100 },
        { name: "Indicator 3", max: 100 },
        { name: "Indicator 4", max: 100 },
        { name: "Indicator 5", max: 100 },
        { name: "Indicator 6", max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [80, 70, 60, 85, 90, 45],
            name: "Series 1",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    //Only run after initial render when chartRef exists
    if (chartRef.current && chartRef.current.getEchartsInstance) {
      const echartsInstance = chartRef.current.getEchartsInstance();

      // Get current series data after chart is rendered
      const allSeriesData = echartsInstance.getOption().series[0].data;
      const indicators = echartsInstance.getOption().radar[0].indicator;

      const indicatorNames = indicators.map((ind) => ind.name);
      // console.log("nisaaaaaaaaa", seriesData)

      // Update the option with formatter that can access the series data
      setOption((prevOption) => ({
        ...prevOption,
        title: {
          text: "Basic Radar Chart",
        },
        radar: {
          ...prevOption.radar,
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
          startAngle: 0,
          splitNumber: 2,
          splitLine: {
            show: true,
          },
          splitArea: {
            show: false,
          },
        },
      }));
    }
  }, []);

  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      style={{ width: "100%", height: "100%" }} 
    />
  );
};

export default RadarChart;
