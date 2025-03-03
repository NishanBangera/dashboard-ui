"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function fetchAllDashboards(id) {
  try {
    const dashboards = await prisma.dashboard.findMany({
        where:{
            userId: id
        },
        include:{
            widgets:{
                include:{
                    widgetType:true
                }
            },
            layouts:true
        }
    });
    return { success: true, data: dashboards };
  } catch (error) {
    return {success: false, error: formatError(error)};
  }
}