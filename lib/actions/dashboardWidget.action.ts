"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { Layout } from "@/types";

export async function createWidget(data) {
  try {
    await prisma.$transaction(async(tx) => {
      const dashboardWidget = await tx.dashboardWidget.create({
        data: {
          title: data.title,
          data: data.data,
          dashboardId: data.dashboardId,
          widgetTypeId: data.widgetTypeId,
        },
      });

      const dashboard = await tx.dashboard.findFirst({
        where:{
          id: dashboardWidget.dashboardId
        }
      })

      if (dashboard === null) {
        return { success: false, error: "Dashboard not found" };
      }

      const formattedDashboard = {...dashboard,layouts:dashboard.layouts as Layout[]} 
      await tx.dashboard.update({
        where:{
          id: dashboard?.id
        },
        data:{
          layouts:[{lg:[...formattedDashboard.layouts[0].lg, {i:dashboardWidget.id,x:0,y:0,w:5,h:7}]}]
        }
      })
    })
    return { success: true };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function deleteDashboardWidget(dashboardWidgetId, dashboardId) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.dashboardWidget.delete({
        where: { id: dashboardWidgetId },
      });

      //remove deleted widget position from layout
      const dashboard = await tx.dashboard.findFirst({
        where: {
          id: dashboardId,
        },
      });
      const layoutData = { layouts: dashboard?.layouts as Layout[] };
      const filteredGridLayout = layoutData?.layouts[0].lg.filter(
        (item) => item.i !== dashboardWidgetId
      );
      await prisma.dashboard.update({
        where: {
          id: dashboardId,
        },
        data: {
          layouts: [{lg:filteredGridLayout}],
        },
      });
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function updateDashboardWidget(data,id){
  try {
    await prisma.dashboardWidget.update({
      where:{
        id
      },
      data:{
        title:data.title,
        data:data.data
      }
    })
    return {success:true}
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}
