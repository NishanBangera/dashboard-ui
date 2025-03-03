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
import WidgetMenu from "./WidgetMenu";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardGrid = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["fetchDashboards"],
    queryFn: () => fetchAllDashboards("d1d26628-8052-466a-9c33-0f67a56e1119"),
  });

  const updateLayout = useMutation({
    mutationFn: (data) =>
      updateLayoutConfig(data, "2514d2c7-a01e-4df5-a1df-25ed9f7654bf"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  if (!data?.data) return <div></div>;
  console.log("dashboards", data);
  const strucutredData = {
    ...data.data[0],
    layouts: [{ ...data.data[0].layouts[0],config: data.data[0].layouts[0].config as LayoutConfig }],
  };

  const layoutId = strucutredData.layouts[0].id

  const handleLayoutChange = (layout, layouts) => {
    console.log("layout", layout);
    console.log("layouts", layouts);
    const modifiedLayouts = {
      lg: layouts.lg.map(layout => { return {i:layout.i,x:layout.x,y:layout.y,w:layout.w,h:layout.h}})
    }
    console.log(modifiedLayouts)
    updateLayout.mutate(modifiedLayouts as any);
  };
  console.log("finallllllll", strucutredData.layouts[0]?.config.layouts);
  return (
    <ResponsiveGridLayout
      className="grid gap-5"
      layouts={
        strucutredData.layouts[0]?.config.layouts
          ? strucutredData?.layouts[0]?.config.layouts
          : { lg: [] }
      }
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      isDraggable={true}
      isResizable={true}
      draggableCancel=".no-drag"
      onLayoutChange={handleLayoutChange}
    >
      {data?.data[0].widgets.map((widget) => {
        return (
          <Card key={widget.id} className="">
            <div className="flex justify-between px-5">
              <p>{widget.title}</p>
              <WidgetMenu dashboardWidgetId={widget.id} layoutId={layoutId} />
            </div>
            {widget.widgetType.name === "LineChart" && (
              <Line options={widget.config} />
            )}
            {widget.widgetType.name === "RadarChart" && (
              <RadarChart options={widget.config} />
            )}
            {widget.widgetType.name === "PieChart" && (
              <Pie options={widget.config} />
            )}
          </Card>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;
