import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiFileText } from "react-icons/fi";
import Image from 'next/image'

export function ImagePreview({ previewImage }: { previewImage: string }) {
  const renderPreview = (attachment: string) => {
    if (attachment.endsWith(".pdf")) {
      return (
        <embed
          src={attachment}
          type="application/pdf"
          width="500px"
          height="600px"
          className="rounded-lg ml-6"
        />
      );
    } else {      
      return (
        <Image
          alt="Preview"
          src={attachment}
          width={500}
          height={400}
          className="ml-10"
        />
      );
    }
  };
console.log("previewImage",previewImage);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {previewImage.endsWith(".pdf") ? (
          <div className="flex items-center cursor-pointer">
            <FiFileText size={24} />
            <span className="ml-2">View Document</span>
          </div>
        ) : (
          <Image
            alt="Preview"
            src={previewImage}
            width={100}
            height={100}
            className=""
          />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] bg-custom-zinc">
        <DialogHeader></DialogHeader>
        <div className="grid gap-4 py-4">{renderPreview(previewImage)}</div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
