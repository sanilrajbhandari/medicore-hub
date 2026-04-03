import { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SlideDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

export const SlideDrawer = ({ open, onOpenChange, title, children, wide }: SlideDrawerProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="right" className={`${wide ? "sm:max-w-2xl w-full" : "sm:max-w-lg w-full"} p-0 flex flex-col`}>
      <SheetHeader className="px-6 py-4 border-b border-border shrink-0">
        <SheetTitle className="font-heading">{title}</SheetTitle>
      </SheetHeader>
      <ScrollArea className="flex-1 px-6 py-4">
        {children}
      </ScrollArea>
    </SheetContent>
  </Sheet>
);
