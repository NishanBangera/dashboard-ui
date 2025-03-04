"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function fetchUserDashboard(id) {
  if (!id) {
    return { success: false };
  }
  try {
    const dashboards = await prisma.dashboard.findFirst({
      where: {
        userId: id,
      },
      include: {
        widgets: {
          include: {
            widgetType: true,
          },
        },
      },
    });
    return { success: true, data: dashboards };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

export async function updateDashboardLayout(config, id) {
  try {
    const updateLayout = await prisma.dashboard.update({
      where: {
        id,
      },
      data: {
        layouts: [config],
      },
    });
    return { success: true, data: updateLayout };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

