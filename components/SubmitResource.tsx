"use client";

import React, { cloneElement, ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import SubmitResourceForm from "./SubmitResourceForm";
import ButtonPopover from "./buttons/ButtonPopover";

const SubmitResource = ({
  hasPopover = true,
  children,
}: {
  hasPopover?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setPreview(false);
  };

  const triggerContent = React.isValidElement(children)
    ? cloneElement(children as ReactElement, { onClick: handleOpen })
    : children;

  return (
    <Dialog
      onOpenChange={(open) => {
        setIsOpen(open);
        setPreview(false);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        {hasPopover ? (
          <ButtonPopover content="Suggest Resource">
            {triggerContent}
          </ButtonPopover>
        ) : (
          triggerContent
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!hasChanged) {
            setIsOpen(false);
            setPreview(false);
            return;
          }

          const result = window.confirm(
            "Are you sure you want to close this dialog? All changes will be lost.",
          );

          if (result) {
            setIsOpen(false);
            setPreview(false);
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-1 text-2xl">
            {preview ? "Preview Resource" : "Suggest a Resource"}
          </DialogTitle>
          <DialogDescription>
            {preview
              ? "View how the resource will appear on the site."
              : "Have a great resource to share? Submit the link below, and we'll review it before adding it to the platform."}
          </DialogDescription>
        </DialogHeader>
        <SubmitResourceForm
          setHasChanged={setHasChanged}
          preview={preview}
          setPreview={setPreview}
          setOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SubmitResource;
