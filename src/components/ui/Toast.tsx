"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, type = "success", onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 flex items-center w-full max-w-sm p-4 bg-white border border-stone-200 shadow-xl rounded-none font-sans"
        >
          <div className="flex items-start w-full">
            <div className="shrink-0">
              {type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {type === "error" && <AlertCircle className="h-5 w-5 text-gold-500" />}
              {type === "info" && <Info className="h-5 w-5 text-gold-500" />}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-primary-900 uppercase tracking-wide">
                {type === "success" && "Action Successful"}
                {type === "error" && "An Error Occurred"}
                {type === "info" && "Notice"}
              </p>
              <p className="mt-1 text-xs text-stone-700 font-normal leading-relaxed">{message}</p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-none text-stone-400 hover:text-stone-500 focus:outline-none cursor-pointer"
              >
                <span className="sr-only">Close</span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
