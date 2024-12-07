'use client';

import React, { useRef } from 'react';
import { useFormik } from 'formik';
import styles from '@/styles/Form.module.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import {
  BODY_TYPE,
  GENDER,
  HAIR_COLOR,
  ageValues,
  countries,
} from '@/constants/formValue';
import CustomTextField from '@/components/Inputs/TextField';
import EditIcon from '@mui/icons-material/Edit';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import useApi from '@/lib/hooks/useApi';
import InputWrapper from './InputWrapper';
import Select from 'react-select';
import { TAGS, TagsType, tagList } from '@/constants/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import '@uploadcare/react-uploader/core.css';
import { uploadDirect } from '@uploadcare/upload-client';
import Avatar from './Ui/Avatar';
import { Button } from './Ui/Button';

const UserForm = () => {
  //router
  const router = useRouter();

  //traduction
  const t = useTranslations();

  const { setUser, getUser } = useUser();
  const user = getUser();

  const { data: session } = useSession();

  const profilInput = useRef<HTMLInputElement>(null);

  const { usePut } = useApi();

  const { mutate: doPost, isLoading } = usePut('/api/me', {
    onSuccess: async (user) => {
      setUser(user);

      router.push(`/${user?.slug}`);
    },
  });

  const { mutate: setProfileImageId, isLoading: isProfileImageLoading } =
    usePut('/api/me', {
      onSuccess: async ({ profileImageId }) => {
        setUser({ profileImageId });
      },
    });

  const validationSchema = yup.object({
    pseudo: yup
      .string()
      .matches(/^[a-zA-Z0-9._-]{3,30}$/, t('error.pseudo_invalid'))
      .required('Pseudo is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pseudo: user?.pseudo ?? '',
      description: user?.description ?? '',
      age: user?.age ?? '',
      gender: user?.gender ?? '',
      bodyType: user?.bodyType ?? '',
      hairColor: user?.hairColor ?? '',
      country: user?.country ?? '',
      tags: [
        ...TAGS.filter((el) => user?.tags.includes(el.value)).map((c) => {
          return {
            value: c.value,
            label: t(`nudeCategories.${c.label}`),
          };
        }),
      ],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formValues = {
        description: values.description,
        pseudo: values.pseudo,
        age: typeof values.age === 'string' ? parseInt(values.age) : values.age,
        gender: values.gender,
        bodyType: values.bodyType,
        hairColor: values.hairColor,
        country: values.country,
        tags: values.tags.map((t: TagsType) => t.value),
      };

      doPost(formValues);
    },
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    const result = await uploadDirect(file, {
      publicKey: '1f9328108f2de93793ae',
      store: 'auto',
    });

    setProfileImageId({ profileImageId: result.uuid });
  };

  return (
    <>
      <div
        className={styles.formWrapper}
        style={{ backgroundColor: 'transparent' }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className={styles.form}
          style={{ marginTop: '2rem' }}
        >
          <div className="relative self-center ">
            <Avatar
              className="h-[10rem] w-[10rem]"
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

          <InputWrapper label={t('db.pseudo')}>
            <CustomTextField
              variant="outlined"
              fullWidth
              id="pseudo"
              name="pseudo"
              value={formik.values.pseudo}
              onChange={formik.handleChange}
              error={formik.touched.pseudo && Boolean(formik.errors.pseudo)}
              helperText={
                typeof formik.errors.pseudo === 'string' && formik.errors.pseudo
              }
            />
          </InputWrapper>

          <InputWrapper label={t('db.description')}>
            <CustomTextField
              variant="outlined"
              fullWidth
              id="description"
              name="description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                typeof formik.errors.description === 'string' &&
                formik.errors.description
              }
            />
          </InputWrapper>

          {session?.user?.userType === 'creator' && (
            <InputWrapper label={t('common.tags')}>
              <Select
                name="tags"
                className={styles.multiSelect}
                onChange={(selectedOptions) =>
                  formik.setFieldValue('tags', selectedOptions)
                }
                options={tagList.map((currentTag) => {
                  return {
                    value: currentTag,
                    label: t(`nudeCategories.${currentTag}`),
                  };
                })}
                value={formik.values.tags}
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                placeholder={t('common.selectTagPlaceholder')}
                noOptionsMessage={() => <span>{t('common.noOtpions')}</span>}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    outline: 'none',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
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
            </InputWrapper>
          )}

          <InputWrapper label={t('db.country')}>
            <FormControl
              variant="outlined"
              sx={{ minWidth: 200, width: '100%' }}
            >
              <CustomTextField
                select
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>{t('db.nothing')}</em>
                </MenuItem>
                {countries.map((el) => {
                  return (
                    <MenuItem key={el.value} value={el.value}>
                      {t(`db.${el.label}`)}
                    </MenuItem>
                  );
                })}
              </CustomTextField>
              {typeof formik.errors.country === 'string' &&
                formik.errors.country && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {formik.errors.country}
                  </FormHelperText>
                )}
            </FormControl>
          </InputWrapper>

          <div className={styles.selectWrapper}>
            <InputWrapper label={t('db.gender')}>
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200, width: '100%' }}
              >
                <CustomTextField
                  select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>{t('db.nothing')}</em>
                  </MenuItem>
                  {GENDER.map((gender: string, index: number) => {
                    return (
                      <MenuItem key={index} value={gender}>
                        {t(`db.${gender}`)}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
                {typeof formik.errors.gender === 'string' &&
                  formik.errors.gender && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {formik.errors.gender}
                    </FormHelperText>
                  )}
              </FormControl>
            </InputWrapper>
            <InputWrapper label={t('db.age')}>
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200, width: '100%' }}
              >
                <CustomTextField
                  select
                  id="age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>{t('db.nothing')}</em>
                  </MenuItem>
                  {ageValues.map((el) => {
                    return (
                      <MenuItem key={el} value={el}>{`${el} ans`}</MenuItem>
                    );
                  })}
                </CustomTextField>
                {typeof formik.errors.age === 'string' && formik.errors.age && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {formik.errors.age}
                  </FormHelperText>
                )}
              </FormControl>
            </InputWrapper>
          </div>
          <div className={styles.selectWrapper}>
            <InputWrapper label={t('db.body_type')}>
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200, width: '100%' }}
              >
                <CustomTextField
                  select
                  id="bodyType"
                  name="bodyType"
                  value={formik.values.bodyType}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>{t('db.nothing')}</em>
                  </MenuItem>
                  {BODY_TYPE.map((el) => {
                    return (
                      <MenuItem key={el} value={el}>
                        {t(`db.${el}`)}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
                {typeof formik.errors.bodyType === 'string' &&
                  formik.errors.bodyType && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {formik.errors.bodyType}
                    </FormHelperText>
                  )}
              </FormControl>
            </InputWrapper>
            <InputWrapper label={t('db.hair_color')}>
              <FormControl
                variant="outlined"
                sx={{ minWidth: 200, width: '100%' }}
              >
                <CustomTextField
                  select
                  id="hairColor"
                  name="hairColor"
                  value={formik.values.hairColor}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">
                    <em>{t('db.nothing')}</em>
                  </MenuItem>
                  {HAIR_COLOR.map((el) => {
                    return (
                      <MenuItem key={el} value={el}>
                        {t(`db.${el}`)}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
                {typeof formik.errors.hairColor === 'string' &&
                  formik.errors.hairColor && (
                    <FormHelperText sx={{ color: 'red' }}>
                      {formik.errors.hairColor}
                    </FormHelperText>
                  )}
              </FormControl>
            </InputWrapper>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            onClick={() => formik.handleSubmit()}
          >
            {t('common.validate')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
