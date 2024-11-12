'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '@/styles/Form.module.scss';
import CustomTextField from '@/components/Inputs/TextField';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import useApi from '@/lib/hooks/useApi';
import { Button } from './Ui/Button';

const UserForgotPasswordForm = () => {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations();
  const { usePost } = useApi();
  const [isEmailSend, setIsEmailSend] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('error.field_not_valid'))
      .required(t('error.field_required')),
  });

  const { mutate: resetPasswordRequest, isLoading } = usePost(
    `/api/me/password/request`,
    {
      onSuccess: () => {
        setIsEmailSend(true);
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      resetPasswordRequest({
        ...values,
        locale,
      });
    },
  });

  if (isEmailSend) {
    return (
      <div className={styles.emailConfirmationWrapper}>
        <div className={styles.title}>{t('common.email_has_been_send')}</div>
        <div className={styles.email}>{formik.values.email}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <CustomTextField
          variant="standard"
          fullWidth
          id="email"
          name="email"
          label={t('common.email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" isLoading={isLoading}>
          {t('common.send')}
        </Button>
      </form>
    </div>
  );
};

export default UserForgotPasswordForm;
