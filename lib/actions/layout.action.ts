"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

type Layout = {
  lg: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }[];
};

export type LayoutConfig = {
  layouts: Layout;
  rowHeight: number;
  cols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
};

// export async function fetchAllLayouts() {
//     try {
//         const layouts = await prisma.layout.findFirst({
//             where:{
//                 dashboardId: ""
//             }
//         });
//         return { success: true, data: layouts };
//     } catch (error) {
//         return {success: false, error: formatError(error)};

//     }
// }

export async function addLayoutConfig(data, id) {
  // console.log("layoutData", data)
  console.log("layoutId", id);
  try {
    const layout = await prisma.layout.findFirst({
      where: {
        id: id,
      },
    });
    if (!layout) {
      return { success: false, error: "Layout not found" };
    }
    console.log("layout", layout.config);
    const layoutData = { ...layout, config: layout?.config as LayoutConfig };
    console.log("layoutData", layoutData.config.layouts);
    const addLayout = await prisma.layout.update({
      where: {
        id: id,
      },
      data: {
        config: {
          ...layoutData.config,
          layouts: { lg: [...layoutData.config.layouts.lg, data] },
        },
      },
    });
    console.log("addLayout", addLayout);
    return { success: true, data: addLayout };
  } catch (error) {
    console.log("error", { error: formatError(error) });
    return { success: false, error: formatError(error) };
  }
}

export async function updateLayoutConfig(config, id) {
  try {
    const layout = await prisma.layout.findFirst({
      where: {
        id: id,
      },
    });
    if (!layout) {
      return { success: false, error: "Layout not found" };
    }

    const layoutData = { ...layout, config: layout?.config as LayoutConfig };

    const updateLayout = await prisma.layout.update({
      where: {
        id: id,
      },
      data: {
        config: { ...layoutData.config, layouts: config },
      },
    });
    return { success: true, data: updateLayout };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
