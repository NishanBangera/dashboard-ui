/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { fetchAllWidgets } from "@/lib/actions/widget.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { addWidgetSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { chartConfig } from "@/lib/utils";
import { createWidget } from "@/lib/actions/dashboardWidget.action";
import { addLayoutConfig } from "@/lib/actions/layout.action";

const AddWidget = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["widgets"],
    queryFn: fetchAllWidgets,
  });

  const { mutateAsync: createDashboardWidget } = useMutation({
    mutationFn: (data) => createWidget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  const addLayout = useMutation({
    mutationFn: (data) =>
      addLayoutConfig(data, "2514d2c7-a01e-4df5-a1df-25ed9f7654bf"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  const form = useForm({
    resolver: zodResolver(addWidgetSchema),
    defaultValues: {
      widgetType: "",
      groupName: [{ name: "" }],
      maxValue: "",
      title:"",
      items: [{ name: "" }],
      groupValueFields: [{ values: [""] }],
    },
  });

  const watchWidgetType = form.watch("widgetType");

  const {
    fields: groupFields,
    append: groupAppend,
    remove: groupRemove,
  } = useFieldArray({
    control: form.control,
    name: "groupName",
  });

  const {
    fields: itemFields,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const {
    fields: groupValueFields,
    append: addGroupValueField,
    update: updateGroupValueField,
    remove: removeGroupValueField,
  } = useFieldArray({
    control: form.control,
    name: "groupValueFields",
  });
  console.log("groupValueFields", groupValueFields);
  console.log("groupFieldsLength", groupValueFields[0].values.length);

  const onSubmit: SubmitHandler<z.infer<typeof addWidgetSchema>> = async (
    values
  ) => {
    console.log("values", values);
    console.log("data", data?.data);
    if (data?.data) {
      console.log("1111111");
      const config = chartConfig(values, data.data);
      const strucutredData = {
        title: values.title,
        config,
        widgetTypeId: values.widgetType,
        dashboardId: "0c98b537-fbc0-47e4-a9ac-396e0b19664c",
      };
      console.log("22222222222");
      const newWidget = await createDashboardWidget(strucutredData as any);
      console.log("33333333333", newWidget);
      console.log("44444444444", newWidget?.data);
      if (newWidget?.data) {
        addLayout.mutate({
              i: newWidget.data.id,
              x: 0,
              y: 0,
              w: 6,
              h: 10,
            } as any)
      }
    }
    setOpen(false);
    form.reset()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="py-0 has-[>svg]:px-1 h-6 gap-1 border-t-2 border-gray-300"
          onClick={() => setOpen(true)}
        >
          <LayoutGrid size={14} className="text-slate-500" />
          <span className="text-[10px] text-slate-500">Customize Widget</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px] max-h-[90vh] overflow-auto">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Widget</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Widget Type */}
              <FormField
                control={form.control}
                name="widgetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Widget Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Widget Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data?.map((widget) => (
                            <SelectItem key={widget.id} value={widget.id}>
                              {widget.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Title */}
              <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-max"
                          placeholder="Enter title..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              {/* Group Name */}
              <div>
                <div className="grid gap-3 grid-cols-2">
                  {groupFields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`groupName.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="max-w-max">
                              Group {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="max-w-max"
                                placeholder="Enter Group Name..."
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                groupRemove(index);
                                removeGroupValueField(index);
                              }}
                            >
                              x
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    groupAppend({ name: "" });
                    addGroupValueField({
                      values: Array.from(
                        " ".repeat(groupValueFields[0].values.length)
                      ),
                    });
                  }}
                  variant="outline"
                  disabled={
                    watchWidgetType === "770f5cd2-9a70-4d50-aca9-cc60f0e01bec"
                  }
                  className="mt-2"
                >
                  Add Group
                </Button>
              </div>
              {}
              {/* Items */}
              <div>
                <div className="grid gap-3 grid-cols-2">
                  {itemFields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormLabel className="max-w-max">
                              Item {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="max-w-max"
                                placeholder="Enter Item Name..."
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                itemRemove(index);
                                groupValueFields.map((group, groupIndex) => {
                                  const values = group.values.filter(
                                    (ele, eleIndex) => eleIndex !== index
                                  );
                                  updateGroupValueField(groupIndex, {
                                    values,
                                  });
                                });
                              }}
                            >
                              x
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    itemAppend({ name: "" });

                    groupValueFields.map((group, groupIndex) => {
                      const currentGroup = groupValueFields[groupIndex];
                      const updatedValues = [...currentGroup.values, ""];
                      updateGroupValueField(groupIndex, {
                        values: updatedValues,
                      });
                    });
                  }}
                  variant="outline"
                  className="mt-2"
                >
                  Add Item
                </Button>
              </div>
              {watchWidgetType === "b1d28a0a-08f3-4422-b43e-3182c23c388b" && (
                <FormField
                  control={form.control}
                  name="maxValue"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormLabel>Max Value</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-max"
                          placeholder="Enter Max Value..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {/* Values */}
              <div className="grid gap-3 grid-cols-2">
                {groupValueFields.map((group, groupIndex) => (
                  <div key={group.id} className="grid gap-3">
                    <h2>Group {groupIndex + 1}</h2>
                    {group.values.map((value, valueIndex) => (
                      <FormField
                        control={form.control}
                        key={valueIndex}
                        name={`groupValueFields.${groupIndex}.values.${valueIndex}`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-2">
                              <FormLabel className="max-w-max">
                                Value {valueIndex + 1}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="max-w-max"
                                  placeholder="Enter Value..."
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidget;
