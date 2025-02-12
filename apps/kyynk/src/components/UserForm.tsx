'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Form.module.scss';
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
import { uploadToS3 } from '@/utils/s3Uploader';
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

const UserForm = () => {
  //router
  const router = useRouter();

  //traduction
  const t = useTranslations();

  const { user, refetch } = useUser();

  const profilInput = useRef<HTMLInputElement>(null);

  const { usePut } = useApi();

  const { mutate: doPost, isPending } = usePut('/api/me', {
    onSuccess: async (user: User) => {
      refetch();

      router.push(`/${user?.slug}`);
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
    description: z.string().optional(),
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

    try {
      const imageKey = await uploadToS3({ file, folder: 'medias' });

      setProfileImageId({ profileImageId: imageKey });
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center w-full"
      >
        <div className="relative self-center ">
          <Avatar
            size={164}
            imageId={user?.profileImageId}
            pseudo={user?.pseudo}
          />

          <input
            ref={profilInput}
            onChange={(e) => handleFileUpload(e)}
            type="file"
            style={{ display: 'none' }}
            multiple={false}
            accept="image/png, image/jpeg"
          />

          <div
            className={clsx(styles.photoIcon, 'right-[10px] bottom-[10px]')}
            onClick={() => {
              profilInput.current?.click();
            }}
          >
            <EditIcon sx={{ color: '#FFF0EB' }} fontSize="small" />
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('db.description')}</FormLabel>
              <FormControl>
                <Textarea {...field} />
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

        <Button className="w-full" type="submit" isLoading={isPending}>
          {t('common.validate')}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
