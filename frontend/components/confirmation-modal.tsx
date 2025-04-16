"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, XCircle, RefreshCw } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  actionType: "restart" | "kill";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  actionType,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-white text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            {actionType === "restart" ? (
              <RefreshCw className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Warning message - now directly below the title */}
        <div className="mx-6 mt-4 rounded-md bg-slate-800/80 p-4 flex items-start gap-3 border border-white/20">
          <AlertTriangle className="h-5 w-5 text-green-500 mt-0.5" />
          <div className="text-sm text-slate-300">
            {actionType === "restart"
              ? "This will temporarily interrupt the process. Any unsaved data may be lost."
              : "This action cannot be undone. The process will be terminated immediately."}
          </div>
        </div>

        {/* Description text - now below the warning */}
        <div className="px-6 py-4 text-slate-300 text-sm">{description}</div>

        <DialogFooter className="bg-slate-800/30 px-6 py-4 border-t border-white/20">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-slate-700 border-white/30 hover:bg-slate-600 text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={
              actionType === "restart"
                ? "bg-green-500 hover:bg-green-700 text-white border border-white/30"
                : "bg-red-600 hover:bg-red-700 text-white border border-white/30"
            }
          >
            {actionType === "restart" ? "Restart" : "Kill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
