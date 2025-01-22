'use client';

import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup'; // Vous pouvez supprimer cette ligne si vous n'utilisez plus Yup
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { TAGS, TagsType, tagList } from '@/constants/constants';
import { getMediaPrice } from '@/lib/utils/price/getMediaPrice';
import useApi from '@/lib/hooks/useApi';
import GalleryModal from '@/components/GalleryModal';
import GalleryCard from './GalleryCard';
import CustomSlider from './CustomSlider';
import CustomTextField from './Inputs/TextField';
import CustomLoadingButton from './Buttons/LoadingButton';
import InputWrapper from './InputWrapper';
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
import { Input } from '@/components/ui/Input';
import Media from '@/types/models/Media';

interface CreateNudeProps {}

const CreateNude: FC<CreateNudeProps> = () => {
  // Session
  const { data: session } = useSession();

  // Local state
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [selectedMedias, setSelectedMedias] = useState<Media[]>([]);
  const [fetchedPrice, setFetchedPrice] = useState<number>(0);

  // Hooks
  const { usePost, fetchData, usePut } = useApi();

  // Router and Params
  const { locale } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nudeId = searchParams.get('nudeId');

  // Traduction
  const t = useTranslations();

  // Mutations
  const { mutate: createNude, isLoading } = usePost(`/api/nudes`, {
    onSuccess: (nude) => {
      if (session?.user?.isAccountVerified) {
        router.push(
          `/dashboard/account/add/nudes/success?createdNudeId=${nude._id}`,
        );
      } else {
        router.push(`/dashboard/community/${session?.user?.id}`);
      }
    },
  });

  const { mutate: editNude, isLoading: isEditLoading } = usePut(
    `/api/nudes/${nudeId}`,
    {
      onSuccess: () => {
        router.push(`/dashboard/community/${session?.user?.id}`);
      },
    },
  );

  const formSchema = z.object({
    description: z
      .string({ required_error: t('error.field_required') })
      .min(1, {
        message: t('error.field_required'),
      })
      .max(300, {
        message: 'Description must be at most 300 characters long.',
      }),
    price: z.number().int(),
    tags: z.array(z.object({ value: z.string(), label: z.string() })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      price: 0,
      tags: [],
    },
  });

  const { reset, handleSubmit, setValue, formState } = form;
  const { errors } = formState;

  // Fonction pour récupérer les données existantes
  const getCurrentNude = async () => {
    try {
      const currentNude = await fetchData(`/api/nudes/${nudeId}`);

      reset({
        description: currentNude?.description || '',
        price: currentNude?.priceDetails.fiatPrice / 100 || 0,
        tags: TAGS.filter((el) => currentNude.tags.includes(el.value)).map(
          (c) => ({
            value: c.value,
            label: t(`nudeCategories.${c.label}`),
          }),
        ),
      });

      setFetchedPrice(currentNude.priceDetails.fiatPrice / 100 || 0);
      setSelectedMedias(currentNude.selectedMedias || []);
    } catch (error) {
      console.log(error);
      toast.error(t('error.failedToFetchNude'));
    }
  };

  useEffect(() => {
    if (nudeId) {
      getCurrentNude();
    }
  }, [nudeId]);

  const { isSubmitting } = formState;

  const totalPrice = getMediaPrice(form.watch('price') || 0);

  const onSubmit = handleSubmit((values) => {
    console.log('🚀 ~ onSubmit ~ values:', values);

    if (!nudeId && selectedMedias.length === 0) {
      toast.error(t('error.missingMedias'));
      return;
    }

    const payload = {
      description: values.description,
      price: values.price,
      tags: values.tags.map((t: TagsType) => t.value),
    };

    nudeId ? editNude(payload) : createNude(payload);
  });

  const handleClickOnDelete = (mediaId: string) => {
    setSelectedMedias((prev) => prev.filter((m: Media) => m._id !== mediaId));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-8 flex flex-col items-center w-full"
      >
        <FormItem className="w-full">
          <FormLabel>Video*</FormLabel>
          <div
            className="rounded-md border-dashed border border-black mt-2 cursor-pointer"
            onClick={() => setOpenGalleryModal(true)}
          >
            Add a video
          </div>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('common.descriptionForm')}</FormLabel>
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
              <FormLabel>{t('common.price')}</FormLabel>
              <FormSubLabel>
                {t('common.creditHelperText', { creditAmount: totalPrice })}
              </FormSubLabel>
              <FormControl>
                <div className="mt-14 px-4">
                  <CustomSlider
                    setValue={(value: number) => setValue('price', value)}
                    fetchedPrice={fetchedPrice}
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
              <FormLabel>{t('common.tags')}</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  className="w-full pt-2"
                  onChange={(selectedOptions) =>
                    field.onChange(selectedOptions)
                  }
                  options={tagList.map((currentTag) => ({
                    value: currentTag,
                    label: t(`nudeCategories.${currentTag}`),
                  }))}
                  value={field.value}
                  classNamePrefix="react-select"
                  getOptionLabel={(el: TagsType) => el.label}
                  getOptionValue={(el: TagsType) => el.value}
                  closeMenuOnSelect={false}
                  placeholder={t('common.selectTagPlaceholder')}
                  noOptionsMessage={() => <span>{t('common.noOptions')}</span>}
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
          isLoading={isLoading || isEditLoading}
          className="w-full"
        >
          {nudeId ? t('common.edit') : t('common.validate')}
        </Button>

        <GalleryModal
          open={openGalleryModal}
          setOpen={setOpenGalleryModal}
          setSelectedMedias={setSelectedMedias}
          selectedMedias={selectedMedias}
          multiple={true}
          mediaType={['image', 'video']}
        />
      </form>
    </Form>
  );
};

export default CreateNude;
