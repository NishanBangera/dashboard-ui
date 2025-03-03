"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LayoutConfig } from "./layout.action";

export async function createWidget(data) {
  try {
    const widget = await prisma.dashboardWidget.create({
      data: {
        title: data.title,
        config: data.config,
        dashboardId: data.dashboardId,
        widgetTypeId: data.widgetTypeId,
      },
    });
    const structureData = convertToPlainObject(widget);
    return { success: true, data: structureData };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function deleteDashboardWidget(dashboardWidgetId, layoutId) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.dashboardWidget.delete({
        where: { id: dashboardWidgetId },
      });

      //remove deleted widget position from layout
      const layout = await tx.layout.findFirst({
        where: {
          id: layoutId,
        },
      });
      const layoutData = { ...layout, config: layout?.config as LayoutConfig };
      const filteredGridLayout = layoutData?.config.layouts.lg.filter(
        (item) => item.i !== dashboardWidgetId
      );
      await prisma.layout.update({
        where: {
          id: layoutId,
        },
        data: {
          config: { ...layoutData.config, layouts: { lg: filteredGridLayout } },
        },
      });
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
