"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";

export async function createWidget(data) {
    try {
        const widget = await prisma.dashboardWidget.create({
            data:{
                title:data.title,
                config:data.config,
                dashboardId: data.dashboardId,
                widgetTypeId: data.widgetTypeId,
            }
        })
        const structureData = convertToPlainObject(widget)
        return {success: true, data: structureData};
    } catch (error) {
        return {success: false, error: formatError(error)};
        
    }
    
}