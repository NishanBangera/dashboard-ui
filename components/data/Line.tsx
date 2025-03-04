import ReactECharts from "echarts-for-react";
const Line = ({ data }) => {
  const formattedOption = {
    legend: {
      data: data.groupName.map((group) => ({
        name: group.name,
        icon: "diamond",
      })),
    },
    color: ["#0f5209", "#f09e07", "#bfbbba", "#456ad9", "#8a28bf", "#bf28a9"],
    tooltip: {
      trigger: "axis",
      padding: 0,
      borderWidth: 0,
      borderRadius: 20,
      backgroundColor: "transparent",
      show: true,
      showContent: true,
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
    xAxis: {
      type: "category",
      data: data.items.map((item) => item.name),
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "${value}",
      },
      interval: 200,
      splitLine: {
        show: false,
      },
    },
    grid: {
      show: true,
      backgroundColor: "#ffffff",
    },
    series: data.groupValueFields.map((group, index) => {
      return {
        name: data.groupName[index].name,
        type: "line",
        data: group.values.map((value) => Number(value)),
      };
    }),
  };
  return (
    <>
      <ReactECharts
        option={formattedOption}
        style={{ width: "100%", height: "100%" }}
        className="px-5"
      />
    </>
  );
};

export default Line;
