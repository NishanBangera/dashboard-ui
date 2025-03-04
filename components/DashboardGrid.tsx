/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RadarChart from "./data/Radar";

import { Responsive, WidthProvider } from "react-grid-layout";
import Line from "./data/Line";
import Pie from "./data/Pie";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserDashboard,
  updateDashboardLayout,
} from "@/lib/actions/dashboard.action";
import { Card } from "./ui/card";
import WidgetMenu from "./WidgetMenu";
import { fetchUser } from "@/lib/actions/user.action";
import { useUser } from "@clerk/nextjs";
import { Layout } from "@/types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardGrid = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  console.log("userrrrr",user?.firstName)

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetchUser({
        id: user?.id || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        username: user?.firstName || "",
      }),
  });

  console.log("useeeeeeeeee", userData)

  const { data: dashboard } = useQuery({
    queryKey: ["fetchDashboards"],
    queryFn: () => fetchUserDashboard(userData?.data?.id),
    enabled:!!userData
  });

  const updateLayout = useMutation({
    mutationFn: (data) => updateDashboardLayout(data, dashboard?.data?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  if (!dashboard?.data) return <div></div>;
  console.log("dashboards", dashboard.data);
  const strucutredData = {
    ...dashboard.data,
    layouts: dashboard.data.layouts as Layout[],
  };

  const handleLayoutChange = (layout, layouts) => {
    console.log("layout", layout);
    console.log("layouts", layouts);
    const modifiedLayouts = {
      lg: layouts.lg.map((layout) => {
        return {
          i: layout.i,
          x: layout.x,
          y: layout.y,
          w: layout.w,
          h: layout.h,
        };
      }),
    };
    console.log(modifiedLayouts);

    updateLayout.mutate(modifiedLayouts as any);
  };
  console.log("finallllllll", strucutredData.layouts[0]);

  return (
    <ResponsiveGridLayout
      className="grid gap-5"
      layouts={
        strucutredData.layouts[0].lg.length
          ? strucutredData?.layouts[0]
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
      {dashboard.data.widgets.map((widget) => {
        return (
          <Card key={widget.id} className="">
            <div className="flex justify-between px-5">
              <p>{widget.title}</p>
              <WidgetMenu dashboardWidgetId={widget.id} dashboardId={dashboard?.data?.id || ''} />
            </div>
            {widget.widgetType.name === "LineChart" && (
              <Line data={widget.data} />
            )}
            {widget.widgetType.name === "RadarChart" && (
              <RadarChart data={widget.data} />
            )}
            {widget.widgetType.name === "PieChart" && (
              <Pie data={widget.data} />
            )}
          </Card>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;
