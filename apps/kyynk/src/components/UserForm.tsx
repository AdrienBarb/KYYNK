'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  BODY_TYPE,
  GENDER,
  HAIR_COLOR,
  countries,
} from '@/constants/formValue';
import EditIcon from '@mui/icons-material/Edit';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/users/useUser';
import '@uploadcare/react-uploader/core.css';
import Avatar from './ui/Avatar';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { User } from '@prisma/client';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { isCreator } from '@/utils/users/isCreator';

const UserForm = () => {
  //router
  const router = useRouter();

  //traduction
  const t = useTranslations();

  const { user, refetch } = useUser();

  const profilInput = useRef<HTMLInputElement>(null);

  const { usePut } = useApi();

  const [isUploading, setIsUploading] = useState(false);

  const { mutate: doPost, isPending } = usePut('/api/me', {
    onSuccess: async () => {
      refetch();
      toast.success('Profile updated successfully!');
    },
  });

  const { mutate: setProfileImageId } = usePut('/api/me', {
    onSuccess: async ({ profileImageId }: Pick<User, 'profileImageId'>) => {
      refetch();
    },
  });

  const formSchema = z.object({
    pseudo: z
      .string()
      .min(3, { message: 'Pseudo must be at least 3 characters long.' })
      .max(12, { message: 'Pseudo must be at most 12 characters long.' })
      .regex(
        /^[a-zA-Z0-9](?!.*[_.-]{2})[a-zA-Z0-9._-]*[a-zA-Z0-9]$/,
        'Pseudo can only contain letters, numbers, "_", "-", ".", and must not start or end with special characters.',
      ),
    description: z
      .string()
      .max(200, { message: 'Description must be at most 200 characters long.' })
      .optional(),
    gender: z.string().optional(),
    bodyType: z.string().optional(),
    hairColor: z.string().optional(),
    country: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        pseudo: user.pseudo ?? '',
        description: user.description ?? '',
      });
    }
  }, [user, reset]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    doPost(values);
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      const response = await axios.post('/api/medias/signed-url', {
        fileType: file.type,
        folder: 'medias',
      });

      const { signedUrl, fileKey } = response.data;

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      setProfileImageId({ profileImageId: fileKey });
    } catch (err) {
      console.error('Error uploading file:', err);
      toast.error('Something went wrong!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center w-full"
      >
        <div className="relative self-center">
          <Avatar
            size={164}
            imageId={user?.profileImageId}
            pseudo={user?.pseudo}
          />

          <input
            ref={profilInput}
            onChange={(e) => handleFileUpload(e)}
            type="file"
            className="hidden"
            multiple={false}
            accept="image/png, image/jpeg"
          />

          <div className="absolute right-2.5 bottom-2.5 w-8 h-8">
            <Button
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                profilInput.current?.click();
              }}
              isLoading={isUploading}
            >
              <Pencil color="#fff0eb" />
            </Button>
          </div>
        </div>

        <FormField
          control={form.control}
          name="pseudo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('db.pseudo')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCreator({ user }) && (
          <>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t('db.description')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea {...field} className="text-base pr-16" />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                        {field.value?.length || 0}/200
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8 w-full">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{t('db.country')}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value! ?? user?.country}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('db.nothing')} />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((el) => {
                              return (
                                <SelectItem value={el.value} key={el.value}>
                                  {t(`db.${el.label}`)}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('db.gender')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value! ?? user?.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('db.nothing')} />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDER.map((el) => {
                            return (
                              <SelectItem value={el} key={el}>
                                {t(`db.${el}`)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-8 w-full">
              <FormField
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('db.body_type')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value! ?? user?.bodyType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('db.nothing')} />
                        </SelectTrigger>
                        <SelectContent>
                          {BODY_TYPE.map((el) => {
                            return (
                              <SelectItem value={el} key={el}>
                                {t(`db.${el}`)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hairColor"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('db.hair_color')}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value! ?? user?.hairColor}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('db.nothing')} />
                        </SelectTrigger>
                        <SelectContent>
                          {HAIR_COLOR.map((el) => {
                            return (
                              <SelectItem value={el} key={el}>
                                {t(`db.${el}`)}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <Button
          className="w-full"
          type="submit"
          isLoading={isPending}
          disabled={isPending}
        >
          {t('common.validate')}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
