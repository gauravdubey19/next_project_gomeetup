import React, { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => void;
  children: ReactNode;
  title: string;
  img: string;
  btnText: string;
  btnIcon: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  handleClick,
  children,
  title,
  img,
  btnText,
  btnIcon,
}: MeetingModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[80%] max-w-[520px] flex flex-col gap-6 border-none bg-dark-1 rounded-xl px-6 py-9 text-white ">
          <div className="flex flex-col gap-6 text-center">
            {img && (
              <div className="flex-center">
                <Image src={img} alt={title} width={72} height={72} />
              </div>
            )}
            <h1 className="w-full text-3xl font-bold text-center leading-[42px]">
              {title}
            </h1>
            {children}
            <Button
              className="bg-blue-1 focus-visible:right-0 focus-visible:ring-offset-0 flex gap-1 hover:bg-blue-500 active:translate-y-[1px] ease-in-out duration-300"
              onClick={handleClick}
            >
              {btnIcon && (
                <Image src={btnIcon} alt={"btn icon"} width={13} height={13} />
              )}{" "}
              {btnText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MeetingModal;
