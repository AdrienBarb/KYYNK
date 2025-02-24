import React, { FC, useState } from 'react';

import MediasGallery from '@/components/nudes/MediasGallery';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import Text from '@/components/ui/Text';
import type { Media } from '@prisma/client';

interface GalleryModalProps {
  setOpen: (e: boolean) => void;
  open: boolean;
  setSelectedMedia: (media: Media) => void;
  selectedMedia: Media | null;
}

const GalleryModal: FC<GalleryModalProps> = ({
  setOpen,
  open,
  setSelectedMedia,
  selectedMedia,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleClickOnSelect = () => {
    setOpen(false);
  };

  const closeModal = () => {
    if (uploading) {
      toast.error(
        'Please wait until the upload is complete before closing the modal.',
      );
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent
        className="h-[100vh] sm:h-[80vh] flex flex-col"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Text className="text-2xl text-custom-black">
              {uploadProgress}%
            </Text>
            <Text className="text-center text-custom-black mt-4">
              Please do not refresh the screen or you will lose the upload.
            </Text>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Gallery</DialogTitle>
              <DialogDescription>
                Here you can manage your videos. You can upload new videos,
                delete existing ones, and select a video to use.
              </DialogDescription>
            </DialogHeader>

            <MediasGallery
              setUploading={setUploading}
              setUploadProgress={setUploadProgress}
              setSelectedMedia={setSelectedMedia}
              selectedMedia={selectedMedia}
            />

            <DialogFooter>
              <Button
                onClick={handleClickOnSelect}
                disabled={!selectedMedia}
                className="w-full"
              >
                Select
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
