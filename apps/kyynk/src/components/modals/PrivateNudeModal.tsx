import React, { FC, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { privateNudeSchema } from '@/schemas/nudeSchema';
import { useForm } from 'react-hook-form';
import { getCreditsWithFiat } from '@/utils/prices/getMediaPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubLabel,
} from '@/components/ui/Form';
import Text from '@/components/ui/Text';
import type { Media } from '@prisma/client';
import { Textarea } from '../ui/TextArea';
import CustomSlider from '../CustomSlider';
import { z } from 'zod';
import toast from 'react-hot-toast';
import imgixLoader from '@/lib/imgix/loader';
import useApi from '@/hooks/requests/useApi';
import { useParams } from 'next/navigation';
import MediasGallery from '../nudes/MediasGallery';

interface Props {
  setOpen: (e: boolean) => void;
  open: boolean;
  refetch: () => void;
}

export type PrivateNudeStepsType = 'form' | 'gallery' | 'uploading' | 'success';

const PrivateNudeModal: FC<Props> = ({ setOpen, open, refetch }) => {
  const [step, setStep] = useState<PrivateNudeStepsType>('form');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const { id: conversationId } = useParams();

  const form = useForm<z.infer<typeof privateNudeSchema>>({
    resolver: zodResolver(privateNudeSchema),
    defaultValues: {
      description: '',
      price: 0,
    },
  });

  const { handleSubmit, setValue, reset } = form;
  const { creditPrice } = getCreditsWithFiat(form.watch('price') || 0);
  const { usePost } = useApi();
  const { mutate: createPrivateNudeMessage, isPending } = usePost(
    `/api/conversations/${conversationId}/messages/nudes`,
    {
      onSuccess: () => {
        setOpen(false);
        setSelectedMedia(null);
        setStep('form');
        reset();
        refetch();
      },
    },
  );

  const onSubmit = handleSubmit((values) => {
    if (!selectedMedia) {
      toast.error('You forgot to upload a video');
      return;
    }

    createPrivateNudeMessage({
      mediaId: selectedMedia.id,
      description: values.description,
      price: values.price * 100,
    });
  });

  const renderStepContent = () => {
    switch (step) {
      case 'form':
        return (
          <DialogContent className="h-[100dvh] sm:h-[80dvh] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Send a private nude</DialogTitle>
              <DialogDescription>
                Here you can send a private nude to the user.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form className="space-y-8 flex flex-col items-center w-full">
                <FormItem className="w-full">
                  <FormLabel>Video*</FormLabel>
                  {selectedMedia && selectedMedia.thumbnailId ? (
                    <div className="aspect-[4/5] relative rounded-md overflow-hidden">
                      <Button
                        size="icon"
                        onClick={() => setStep('gallery')}
                        className="absolute top-2 right-2 z-10"
                      >
                        <Pencil color="white" strokeWidth={3} />
                      </Button>
                      <Image
                        src={imgixLoader({
                          src: selectedMedia.thumbnailId,
                          width: 300,
                          quality: 80,
                        })}
                        alt={`media`}
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                        priority
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-md border-dashed border border-black mt-2 cursor-pointer aspect-[4/5] flex items-center justify-center text-center flex-col gap-2"
                      onClick={() => setStep('gallery')}
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" />
                      <Text className="text-custom-black">Add a video</Text>
                    </div>
                  )}
                </FormItem>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price</FormLabel>
                      <FormSubLabel>
                        Either {creditPrice} credits. Credits are the currency
                        of our platform.
                      </FormSubLabel>
                      <FormControl>
                        <div className="mt-14 px-4">
                          <CustomSlider
                            setValue={(value: number) =>
                              setValue('price', value)
                            }
                            fetchedPrice={field.value}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Message*</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          {...field}
                          className="mt-2 text-base"
                          placeholder="Type your message..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  onClick={onSubmit}
                  className="w-full"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  Send
                </Button>
              </form>
            </Form>
          </DialogContent>
        );
      case 'gallery':
        return (
          <DialogContent
            className="h-[100dvh] sm:h-[80dvh] flex flex-col"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            isClosable={false}
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
            <DialogFooter className="gap-2">
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
            className="h-[100dvh] sm:h-[80dvh] flex flex-col"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {renderStepContent()}
    </Dialog>
  );
};

export default PrivateNudeModal;
