'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/Dialog';
import { useNudeCreationModalStore } from '@/stores/NudeCreationModalStore';
import { Button } from '../ui/Button';
import MediasGallery from '../nudes/MediasGallery';
import Text from '../ui/Text';
import toast from 'react-hot-toast';
import type { Media } from '@prisma/client';
import CreateNudeForm from '@/components/nudes/CreateNudeForm';
import { NudeWithPermissions } from '@/types/nudes';
import NudeCard from '@/components/nudes/NudeCard';
import { TelegramShareButton, TwitterShareButton } from 'react-share';

const NudeCreationModal = () => {
  const { isOpen, closeModal } = useNudeCreationModalStore();
  const [step, setStep] = useState('form');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [createdNude, setCreatedNude] = useState<NudeWithPermissions | null>(
    null,
  );

  console.log('🚀 ~ NudeCreationModal ~ createdNude:', createdNude);

  const handleCloseModal = () => {
    if (step === 'uploading') {
      toast.error(
        'Please wait until the upload is complete before closing the modal.',
      );
      return;
    }

    setStep('form');
    setCreatedNude(null);
    setSelectedMedia(null);

    closeModal();
  };

  const renderStep = () => {
    switch (step) {
      case 'form':
        return (
          <DialogContent className="h-[100vh] sm:h-[80vh] overflow-y-scroll flex flex-col">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>Create a nude</DialogTitle>
              <DialogDescription>
                Here you can create a nude for your feed.
              </DialogDescription>
            </DialogHeader>

            <CreateNudeForm
              setStep={setStep}
              selectedMedia={selectedMedia}
              setCreatedNude={setCreatedNude}
            />
          </DialogContent>
        );
      case 'gallery':
        return (
          <DialogContent
            className="h-[100vh] sm:h-[80vh] flex flex-col"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault();
            }}
            isClosable={false}
            backAction={() => setStep('form')}
          >
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>Gallery</DialogTitle>
              <DialogDescription>
                Here you can manage your videos. You can upload new videos,
                delete existing ones, and select a video to use.
              </DialogDescription>
            </DialogHeader>

            <MediasGallery
              setStep={setStep}
              setUploadProgress={setUploadProgress}
              setSelectedMedia={setSelectedMedia}
              selectedMedia={selectedMedia}
            />

            <DialogFooter>
              <Button
                onClick={() => setStep('form')}
                className="w-full"
                variant="secondary"
              >
                Quit
              </Button>
              <Button
                onClick={() => setStep('form')}
                disabled={!selectedMedia}
                className="w-full"
              >
                Select
              </Button>
            </DialogFooter>
          </DialogContent>
        );
      case 'uploading':
        return (
          <DialogContent
            className="h-[100vh] sm:h-[80vh] flex flex-col"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault();
            }}
            isClosable={false}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <Text className="text-2xl text-custom-black">
                {uploadProgress}%
              </Text>
              <Text className="text-center text-custom-black mt-4">
                Please do not refresh the screen or you will lose the upload.
              </Text>
            </div>
          </DialogContent>
        );
      case 'success':
        return (
          <DialogContent className="h-[100vh] sm:h-[80vh] overflow-y-scroll flex flex-col">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>Success</DialogTitle>
              <DialogDescription>
                You can now share your nude with your followers.
              </DialogDescription>
            </DialogHeader>

            {createdNude && <NudeCard nude={createdNude} />}

            <div className="flex flex-col items-center justify-center w-full gap-2">
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/nudes/${createdNude?.id}`}
                title={
                  createdNude?.description ?? 'Come discover this nude on KYYNK'
                }
                style={{ width: '100%' }}
              >
                <Button className="w-full">Share on Twitter</Button>
              </TwitterShareButton>

              <TelegramShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/nudes/${createdNude?.id}`}
                title={
                  createdNude?.description ?? 'Come discover this nude on KYYNK'
                }
                style={{ width: '100%' }}
              >
                <Button className="w-full">Share on Telegram</Button>
              </TelegramShareButton>

              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="w-full"
              >
                Quit
              </Button>
            </div>
          </DialogContent>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      {renderStep()}
    </Dialog>
  );
};

export default NudeCreationModal;
