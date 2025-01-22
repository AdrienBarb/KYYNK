import React, { FC, useState } from 'react';

import MediasGallery from '@/components/MediasGallery';
import { Media } from '@/types/models/Media';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';
import Text from './Text';

interface GalleryModalProps {
  setOpen: (e: boolean) => void;
  open: boolean;
  setSelectedMedias: (medias: Media[]) => void;
  selectedMedias: Media[];
  multiple: boolean;
  mediaType: string[];
}

const GalleryModal: FC<GalleryModalProps> = ({
  setOpen,
  open,
  setSelectedMedias,
  selectedMedias,
}) => {
  //traduction
  const t = useTranslations();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleClickOnSelect = () => {
    setOpen(false);
  };

  const closeModal = () => {
    console.log('closeModal');
    if (uploading) {
      toast.error(
        'Please wait until the upload is complete before closing the modal.',
      );
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={closeModal} modal={true}>
      <DialogContent
        className="h-[100vh] sm:h-[80vh] z-[1000] flex flex-col"
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
              <DialogTitle>{t('common.gallery')}</DialogTitle>
            </DialogHeader>

            <MediasGallery
              setUploading={setUploading}
              setUploadProgress={setUploadProgress}
            />

            <DialogFooter>
              <Button
                onClick={handleClickOnSelect}
                disabled={selectedMedias.length === 0}
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
