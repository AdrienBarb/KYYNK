'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '@/styles/Form.module.scss';
import { Button } from '@/components/ui/Button';
import CustomTextField from '@/components/Inputs/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { authenticate } from '../../server-actions/authenticate';
import { useQueryState } from 'nuqs';
import posthog from 'posthog-js';

const UserSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const [previousPath] = useQueryState('previousPath');

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('error.field_not_valid'))
      .required(t('error.field_required')),
    password: yup
      .string()
      .required(t('error.field_required'))
      .min(8, t('error.password_to_short')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await authenticate({
          email: values.email.toLowerCase(),
          password: values.password,
          previousPath,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <CustomTextField
          variant="standard"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CustomTextField
          variant="standard"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          label={t('common.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" isLoading={isLoading}>
          {t('common.signIn')}
        </Button>
      </form>
    </div>
  );
};

export default UserSignInForm;
