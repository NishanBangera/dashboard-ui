import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";
import RemoveWidget from "./RemoveWidget";

const WidgetMenu = ({
  dashboardWidgetId,
  dashboardId,
}: {
  dashboardWidgetId: string;
  dashboardId: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Ellipsis
          className="cursor-pointer no-drag"
          onClick={() => setOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 space-y-3">
        <h2 className="text-center font-semibold">Remove or Update Widget</h2>
        <div className="flex justify-between gap-2">
          <Button disabled>Edit</Button>
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
