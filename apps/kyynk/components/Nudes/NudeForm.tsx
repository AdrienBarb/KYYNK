'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { TagsType, tagList } from '@/constants/constants';
import { getMediaPrice } from '@/lib/utils/price/getMediaPrice';
import useApi from '@/lib/hooks/useApi';
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
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '@/components/ui/Text';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import type { Media, Nude } from '@prisma/client';
import { useUser } from '@/lib/hooks/useUser';
import { nudeSchema } from '@/schemas/nudeSchema';
import CustomSlider from '../CustomSlider';
import imgixLoader from '@/lib/imgix/loader';

interface Props {
  nude?: Nude;
}

const NudeForm: FC<Props> = ({ nude }) => {
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const { usePost, usePut } = useApi();
  const { getUser } = useUser();
  const user = getUser();
  const router = useRouter();

  const { mutate: createNude, isPending } = usePost(`/api/nudes`, {
    onSuccess: () => {
      // TODO: If user verified, redirect to success page
      router.push(`/${user?.slug}`);
    },
  });

  const { mutate: editNude, isPending: isEditLoading } = usePut(
    `/api/nudes/${nude?.id}`,
    {
      onSuccess: () => {
        router.push(`/${user?.slug}`);
      },
    },
  );

  const form = useForm<z.infer<typeof nudeSchema>>({
    resolver: zodResolver(nudeSchema),
    defaultValues: {
      description: nude?.description || '',
      price: nude?.fiatPrice || 0,
      tags: nude?.tags.map((tag) => ({ value: tag, label: tag })) || [],
    },
  });

  const { handleSubmit, setValue } = form;

  const totalPrice = getMediaPrice(form.watch('price') || 0);

  const onSubmit = handleSubmit((values) => {
    if (!nude && !selectedMedia) {
      toast.error('You forgot to upload a video');
      return;
    }

    const payload = {
      ...(selectedMedia && { mediaId: selectedMedia.id }),
      description: values.description,
      price: values.price,
      tags: values.tags,
    };

    if (nude) {
      editNude(payload);
    } else {
      createNude(payload);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col items-center w-full"
      >
        {!nude && (
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
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} className="mt-2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Price</FormLabel>
              <FormSubLabel>
                Either {totalPrice} credits. Credits are the currency of our
                platform.
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
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  className="w-full pt-2"
                  onChange={(selectedOptions) =>
                    field.onChange(selectedOptions)
                  }
                  options={tagList.map((currentTag) => ({
                    value: currentTag,
                    label: currentTag,
                  }))}
                  value={field.value}
                  classNamePrefix="react-select"
                  getOptionLabel={(el: TagsType) => el.label}
                  getOptionValue={(el: TagsType) => el.value}
                  closeMenuOnSelect={false}
                  placeholder="Select tags"
                  noOptionsMessage={() => <span>No Options</span>}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      outline: 'none',
                      border: '1px solid black',
                      ':hover': {
                        border: '1px solid black',
                      },
                    }),
                    option: (
                      styles,
                      { data, isDisabled, isFocused, isSelected },
                    ) => ({
                      ...styles,
                      backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                        ? '#d9d7f6'
                        : isFocused
                        ? '#d9d7f6'
                        : undefined,
                    }),
                    menuList: (styles) => ({
                      ...styles,
                      backgroundColor: '#fff0eb',
                      borderRadius: '6px',
                    }),
                    multiValue: (styles) => ({
                      ...styles,
                      backgroundColor: '#cecaff',
                    }),
                    multiValueLabel: (styles) => ({
                      ...styles,
                      color: 'white',
                    }),
                    multiValueRemove: (styles) => ({
                      ...styles,
                      color: 'white',
                    }),
                    noOptionsMessage: (styles) => ({
                      ...styles,
                      color: 'black',
                    }),
                    placeholder: (styles) => ({
                      ...styles,
                      color: 'rgba(0, 0, 0, 0.3)',
                    }),
                  }}
                  isMulti
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          isLoading={isPending || isEditLoading}
          className="w-full"
        >
          {nude ? 'Edit a nude' : 'Create a nude'}
        </Button>

        <GalleryModal
          open={openGalleryModal}
          setOpen={setOpenGalleryModal}
          setSelectedMedia={setSelectedMedia}
          selectedMedia={selectedMedia}
        />
      </form>
    </Form>
  );
};

export default NudeForm;
