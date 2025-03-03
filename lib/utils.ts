import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addWidgetSchema } from "./validators";
import { z } from "zod";
import { WidgetType } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Convert prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatError(error) {
  if (error.name === "ZodError") {
    //Handle Zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    //Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else {
    //Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function chartConfig(
  data: z.infer<typeof addWidgetSchema>,
  widgetType: WidgetType[]
) {
  const widget = JSON.parse(
    JSON.stringify(widgetType.find((widget) => data.widgetType === widget.id)!)
  );
  if (widget.name === "LineChart") {
    return {
      ...widget.config,
      legend: {
        data: data.groupName.map((group) => ({
          name: group.name,
          icon: "diamond",
        })),
      },
      xAxis: {
        type: "category",
        data: data.items.map((item) => item.name),
        splitLine: {
          show: true,
        },
      },
      series: data.groupValueFields.map((group, index) => {
        return {
          name: data.groupName[index].name,
          type: "line",
          data: group.values.map((value) => Number(value)),
        };
      }),
    };
  } else if (widget.name === "RadarChart") {
    console.log("output", data)
    console.log("widddddddddd", widget.config)
    return {
      ...widget.config,
      legend: {
        data: data.groupName.map((group) => ({
          name: group.name,
          icon: "diamond",
        })),
      },
      radar: {
        ...widget.config.radar,
        indicator: data.items.map((item) => ({
          name: item.name,
          max: Number(data.maxValue),
        })),
       
      },
      series: [
        {
          type: "radar",
          data: data.groupValueFields.map((group, index) => ({
            name: data.groupName[index].name,
            value: group.values.map((value) => Number(value)),
            areaStyle:{},
          })),
        },
      ],
    };
  } else if (widget.name === "PieChart") {
    return {
      ...widget.config,
      legend: {
        data: data.groupName.map((group) => group.name),
      },
      series: [
        {
          ...widget.config.series[0],
          name: data.groupName[0].name,
          type: "pie",
          data: data.items.map((item, index) => ({
            name: data.items[index].name,
            value: Number(data.groupValueFields[0].values[index]),
          })),
        },
      ],
    };
  }
}
