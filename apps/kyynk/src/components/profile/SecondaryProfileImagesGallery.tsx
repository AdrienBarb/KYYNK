'use client';

import React, { FC, useState } from 'react';
import useApi from '@/hooks/requests/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import Text from '@/components/ui/Text';
import axios from 'axios';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/Button';
import { ProfileImageType } from '@/types/profile-images';
import UserImage from '../UserImage';
import { useUser } from '@/hooks/users/useUser';
import { FormLabel } from '../ui/Form';

const SecondaryProfileImagesGallery: FC = () => {
  const { usePost } = useApi();
  const { user, refetch } = useUser();
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: createProfileImage } = usePost('/api/profile-images', {
    onSuccess: () => {
      refetch();
      toast.success('Profile image uploaded successfully!');
    },
    onError: () => {
      toast.error('Failed to upload profile image');
    },
  });

  const profileImages = user?.profileImages || [];

  const handleUpload = async (file: File) => {
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

      createProfileImage({
        imageId: fileKey,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during the upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (profileImageId: string) => {
    try {
      await axios.delete(`/api/profile-images/${profileImageId}`);
      refetch();
      toast.success('Profile image deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete profile image');
    }
  };

  return (
    <div className="w-full">
      <FormLabel>Secondary Profile Pictures</FormLabel>

      <div className="border border-custom-black/20 rounded-lg p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {/* Upload button */}
          <div
            className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer items-center justify-center bg-primary hover:bg-primary/80 text-gray-600 flex flex-col gap-1 border-2 border-dashed border-gray-300 transition-colors"
            onClick={() => {
              if (isUploading) return;

              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/png, image/jpeg, image/jpg';
              input.onchange = (event) => {
                const target = event.target as HTMLInputElement;
                const file = target.files ? target.files[0] : null;
                if (file) {
                  handleUpload(file);
                }
              };
              input.click();
            }}
          >
            {isUploading ? (
              <Loader size={20} />
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} size="sm" />
                <Text className="text-xs font-medium">Add</Text>
              </>
            )}
          </div>

          {profileImages.map((profileImage: ProfileImageType) => (
            <div
              key={profileImage.id}
              className="flex-shrink-0 w-24 h-24 relative group overflow-hidden rounded-md"
            >
              <UserImage imageId={profileImage.imageId} size={96} />

              {/* Delete button overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
                <Button
                  variant="destructive"
                  size="sm"
                  className="p-1 h-auto"
                  onClick={() => handleDelete(profileImage.id)}
                  type="button"
                >
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryProfileImagesGallery;
