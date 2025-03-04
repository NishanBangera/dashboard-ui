/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import RemoveWidget from "./RemoveWidget";
import AddWidget from "./AddWidget";

const WidgetMenu = ({
  dashboardWidgetId,
  dashboardId,
  data,
  title
}: {
  dashboardWidgetId: string;
  dashboardId: string;
  data: any;
  title:string
}) => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(false);
  };
  console.log("hulkkkkkkkkkkkkkkkkkkkkkk",data)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Ellipsis
          className="cursor-pointer no-drag"
          onClick={() => setOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 space-y-3">
        <h2 className="text-center font-semibold">Remove or Update Widget</h2>
        <div className="flex justify-center gap-3">
          <AddWidget
            dashboardWidgetId={dashboardWidgetId}
            handleMenu={handleMenu}
            data={data}
            title={title}
          />
          <RemoveWidget
            dashboardWidgetId={dashboardWidgetId}
            dashboardId={dashboardId}
            handleMenu={handleMenu}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WidgetMenu;
