import z from "zod";


export const groupValueFieldsSchema = z.object({

})

export const addWidgetSchema = z.object({
    widgetType: z.string().nonempty(),
    groupName: z.array(z.object({
        name: z.string().nonempty()
    })),
    title: z.string().nonempty(),
    items: z.array(z.object({
        name: z.string().nonempty()
    })),
    maxValue: z.string().optional(),
    groupValueFields: z.array(z.object({
        values: z.array(z.string().refine((val) => !isNaN(Number(val)), {
            message: "Must be a number",
          }))
    }))
})