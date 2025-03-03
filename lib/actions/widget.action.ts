"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export async function fetchAllWidgets() {
  try {
    const widgets = await prisma.widgetType.findMany();
    return { success: true, data: widgets };
  } catch (error) {
    return {success: false, error: formatError(error)};
  }
}
