import React, { FC, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import GalleryModal from '@/components/nudes/GalleryModal';
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

interface Props {
  setOpen: (e: boolean) => void;
  open: boolean;
  refetch: () => void;
}

const PrivateNudeModal: FC<Props> = ({ setOpen, open, refetch }) => {
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
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
        setOpenGalleryModal(false);
        setSelectedMedia(null);
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

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[100vh] sm:h-[80vh] overflow-y-scroll">
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
                      onClick={() => setOpenGalleryModal(true)}
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
                    onClick={() => setOpenGalleryModal(true)}
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
                      Either {creditPrice} credits. Credits are the currency of
                      our platform.
                    </FormSubLabel>
                    <FormControl>
                      <div className="mt-14 px-4">
                        <CustomSlider
                          setValue={(value: number) => setValue('price', value)}
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
              >
                Send
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <GalleryModal
        open={openGalleryModal}
        setOpen={setOpenGalleryModal}
        setSelectedMedia={setSelectedMedia}
        selectedMedia={selectedMedia}
      />
    </>
  );
};

export default PrivateNudeModal;
