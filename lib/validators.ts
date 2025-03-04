import z from "zod";

export const groupValueFieldsSchema = z.object({});

export const addWidgetSchema = z.object({
  widgetType: z.string().nonempty({
    message:"WidgetType is required"
  }),
  groupName: z.array(
    z.object({
      name: z.string().min(3, "Group name must be atleast of 3 characters"),
    })
  ),
  title: z.string().min(3, "Title must be atleast of 3 characters"),
  items: z.array(
    z.object({
      name: z.string().min(3, "Item name must be atleast of 3 characters"),
    })
  ),
  maxValue: z.optional(
    z
      .string()
      .min(3, "Max value is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Must be a number",
      })
  ),
  groupValueFields: z.array(
    z.object({
      values: z.array(
        z.string().min(1,"Value is required").refine((val) => !isNaN(Number(val)), {
          message: "Must be a number",
        })
      ),
    })
  ),
});
