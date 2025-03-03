import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDashboardWidget } from "@/lib/actions/dashboardWidget.action";

const RemoveWidget = ({dashboardWidgetId,layoutId}:{dashboardWidgetId:string;layoutId: string;}) => {
      const [open,setOpen] = useState(false)
      const queryClient = useQueryClient()

      const deleteDashboardWidgetQuery = useMutation({
        mutationFn: () =>
          deleteDashboardWidget(dashboardWidgetId,layoutId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["fetchDashboards"] });
        },
      });
    return ( 
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="flex-1 no-drag" type="button">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="no-drag">Cancel</AlertDialogCancel>
            <Button className="no-drag" variant="destructive" size="sm" onClick={() => deleteDashboardWidgetQuery.mutate()}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     );
}
 
export default RemoveWidget;