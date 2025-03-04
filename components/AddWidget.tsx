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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { addWidgetSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createWidget,
  updateDashboardWidget,
} from "@/lib/actions/dashboardWidget.action";

const AddWidget = ({
  dashboardWidgetId,
  handleMenu,
  data: dataValues,
  title,
}: {
  dashboardWidgetId?: string;
  handleMenu?: () => void;
  data?: z.infer<typeof addWidgetSchema>;
  title?: string;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const dashboard: any = queryClient.getQueryData(["fetchDashboards"]);

  const { data } = useQuery({
    queryKey: ["widgets"],
    queryFn: fetchAllWidgets,
    gcTime: 1000,
  });

  const pieWidget = data?.data?.find((widget) => widget.name === "PieChart");

  const { mutateAsync: createDashboardWidget } = useMutation({
    mutationFn: createWidget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  const updateWidget = useMutation({
    mutationFn: (data) => updateDashboardWidget(data, dashboardWidgetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
    },
  });

  const form = useForm({
    resolver: zodResolver(addWidgetSchema),
    defaultValues:
      dataValues && title
        ? { ...dataValues, title }
        : {
            widgetType: "",
            groupName: [{ name: "" }],
            maxValue: "",
            title: "",
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


  const onSubmit: SubmitHandler<z.infer<typeof addWidgetSchema>> = async (
    values
  ) => {
    const strucutredData = {
      title: values.title,
      data: values,
      widgetTypeId: values.widgetType,
      dashboardId: dashboard.data.id,
    };
    if (dataValues && handleMenu) {
      updateWidget.mutate(strucutredData as any);
      handleMenu();
    } else {
      await createDashboardWidget(strucutredData);
    }
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && handleMenu) {
          handleMenu();
        }
        form.reset()
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {dataValues ? (
          <Button className="no-drag" onClick={() => setOpen(true)}>
            Edit
          </Button>
        ) : (
          <Button
            variant="outline"
            className="py-0 has-[>svg]:px-1 h-6 gap-1 border-t-2 border-gray-300"
            onClick={() => setOpen(true)}
          >
            <LayoutGrid size={14} className="text-slate-500" />

            <span className="text-[10px] text-slate-500">Customize Widget</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px] max-h-[90vh] overflow-auto no-drag">
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
                      <Select
                        onValueChange={(value) => {
                          form.setValue("groupName", [{ name: "" }]);
                          form.setValue("groupValueFields", [{ values: [""] }]);
                          form.setValue("items", [{ name: "" }]);
                          form.setValue("maxValue", "");
                          form.setValue("title", "");
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-max"
                          placeholder="Enter title..."
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    groupAppend({ name: "" });
                    const values = Array.from(
                      " ".repeat(groupValueFields[0].values.length)
                    ).map((val) => val.trim());
                    addGroupValueField({
                      values,
                    });
                  }}
                  variant="outline"
                  disabled={watchWidgetType === pieWidget?.id}
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
                          <FormMessage />
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
              {watchWidgetType === pieWidget?.id && (
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* Values */}
              <div className="grid gap-3 grid-cols-2">
                {groupValueFields.map((group, groupIndex) => (
                  <div key={group.id} className="grid gap-3">
                    <h2>Group {groupIndex + 1}</h2>
                    {group.values.map((_, valueIndex) => (
                      <FormField
                        control={form.control}
                        key={`${groupIndex}-${valueIndex}`}
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
                            <FormMessage />
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
