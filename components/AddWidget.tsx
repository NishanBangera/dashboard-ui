"use client";

import { LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddWidget = () => {
  const [open, setOpen] = useState(false);
  const [legend, setLegend] = useState([{ name: "" }]);
  const [dataSet, setDataSet] = useState([{ values: [""] }]);
  const [items, setItems] = useState([""]);

  const handleLegendChange = (event:any, index:any) => {
    const data = [...legend];
    data[index]["name"] = event.target.value;
    setLegend(data);
  };

  const handleAddLegend = () => {
    setLegend([...legend, { name: "" }]);
    setDataSet([...dataSet, { values: [""] }]);
  };

  const handleItemsChange = (event, index) => {
    const data = [...items];
    data[index] = event.target.value;
    setItems(data);
  };

  const handleDataSetChange = (event, index1, index2) => {
    const data = [...dataSet];
    data[index2]["values"][index1] = event.target.value;
    setDataSet(data)

  };

  const handleDeleteItem = (index) => {
    console.log("cvvvvvvvv", dataSet)
    // const filterDataItems = items.filter((_, index2) => index !== index2);
    // const filterDataSet = dataSet.map((__, index2) => {
    //   const __.values = _.values.filter((_, index3) => index !== index3);
    //   console.log("xcccccc", data)
    // });
  };

  const handleAddItem = () => {
    setItems([...items,''])
    const modified = dataSet.map(_ => {return {values:[..._.values,""]}})
    setDataSet(modified)
  }

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
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Enter Group Name</Label>
          {legend.map((_, index) => (
            <div key={index}>
              <Input
                value={legend[index].name}
                onChange={(event) => handleLegendChange(event, index)}
              />
            </div>
          ))}
          <Button onClick={handleAddLegend}>Add Group</Button>
        </div>
        <div>
          <Label>Enter DataSet</Label>
          {items.map((name, index1) => (
            <div key={index1} className="flex">
              <Input
                placeholder="Enter Item Name"
                value={items[index1]}
                onChange={(event) => handleItemsChange(event, index1)}
              />
              {dataSet.map((_, index2) => (
                <Input
                  type="number"
                  key={index2}
                  placeholder="Enter value"
                  value={dataSet[index2]["values"][index1]}
                  onChange={(event) =>
                    handleDataSetChange(event, index1, index2)
                  }
                />
              ))}
              <Button onClick={() => handleDeleteItem(index1)}>Delete</Button>
            </div>
          ))}
          <Button onClick={handleAddItem}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidget;
