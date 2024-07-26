import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import attachement from "../../../public/img/cloud-computing.png";
import Image from "next/image";
import cloud from "../../../public/img/cloud-computing.png";
import { useEdgeStore } from "../../lib/edgestore";
import axios from "axios";
// import socket from "../../lib/Socket"; 
import socket from "../../lib/Socket"


export function Attachement({
  conversationId,
  receiver,
}: {
  conversationId: any;
  receiver: any;
}
) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const senderId=localStorage.getItem("userid")
  const token=localStorage.getItem("token")
  const [file, setFile] = React.useState<File>();
  const [isOpen, setIsOpen] = React.useState(false);
  console.log("hjvgkzdfshvgajhsdfhjfdghjdf",  conversationId,

  receiver,);


  
  const { edgestore } = useEdgeStore();

  const handleUpload = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          
          console.log(progress);
        },
      });
      socket.emit("sendMessage", {
        conversationId: conversationId,
        senderId: senderId,
        receiverId: receiver,
        message: res.url,
        timestamp: new Date().toISOString(),
      });
      console.log("receiver", receiver);
      const data = {
        message: res.url,
        senderId: senderId,
        reciverId: receiver,
        conversationId: conversationId,
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/addAttachentToChat`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response) {
          console.log("response>>attachemnt", response.data);
        }
      } catch (error) {
        console.log(error);
      }

      // Close the dialog
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setIsOpen(true)}>
            <Image
              height={35}
              width={35}
              className="pt-3"
              src={attachement}
              alt=""
            />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-custom-zinc">
          <DialogHeader>
            <DialogTitle className="text-white">
              Upload Attachements
            </DialogTitle>
            <DialogDescription className="text-white">
              Here Where You can Add Images
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-80 bg-chat ml-5 h-48 "
            >
              <div className="ml-28 mt-10">
                <Image src={cloud} alt="" height={90} width={70} />
                <input
                  type="file"
                  id="image"
                  className="bg-slate-100 rounded-lg py-3 px-3 hidden"
                  ref={fileRef}
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                />
              </div>
              <p className="text-center text-white">
                Select this and add a file Here
              </p>
            </div>
            <button
              onClick={handleUpload}
              className="bg-sky-500 px-3 py-3 text-white"
              type="submit"
            >
              Save changes
            </button>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
