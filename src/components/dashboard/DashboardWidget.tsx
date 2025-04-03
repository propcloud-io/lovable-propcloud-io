
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardWidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
  onExpand?: () => void;
  isExpandable?: boolean;
  id?: string;
};

const DashboardWidget = ({ 
  title, 
  children, 
  className = "", 
  onRemove,
  onExpand,
  isExpandable = true,
  id
}: DashboardWidgetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  };

  return (
    <Card className={`shadow-sm border transition-all ${isExpanded ? 'col-span-full row-span-2' : ''} ${className}`} id={id}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          {isExpandable && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleExpand}>
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Widget Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExpand} disabled={!isExpandable}>
                {isExpanded ? "Minimize" : "Maximize"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("#", "_blank")}>
                View Full Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                Print Widget
              </DropdownMenuItem>
              {onRemove && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500" onClick={onRemove}>
                    Remove Widget
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className={`${isExpanded ? 'max-h-[600px] overflow-auto' : ''}`}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardWidget;
