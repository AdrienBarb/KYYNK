import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import useApi from '@/lib/hooks/useApi';

import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/tailwind/cn';
import type { Media } from '@prisma/client';
import Text from '@/components/ui/Text';

interface GalleryCardProps {
  media: Media;
  refetch: () => void;
  setSelectedMedia: (media: Media) => void;
  selectedMedia: Media | null;
}

const GalleryCard: FC<GalleryCardProps> = ({
  media,
  refetch,
  setSelectedMedia,
  selectedMedia,
}) => {
  const { usePut } = useApi();

  const { mutate: archiveMedia } = usePut(`/api/medias/${media.id}/archive`, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleClickOnTrash = async () => {
    await archiveMedia({});
  };

  const isSelected = selectedMedia?.id === media.id;

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-primary cursor-pointer"
      onClick={() => {
        if (!media.isReady) {
          return;
        }

        setSelectedMedia(media);
      }}
    >
      {media.isReady && (
        <div
          className={cn(
            'absolute top-2 left-2 z-10 w-6 h-6 bg-white border border-primary flex items-center justify-center rounded',
            isSelected && 'bg-primary',
          )}
        >
          {isSelected && <FontAwesomeIcon icon={faCheck} color="#fff0eb" />}
        </div>
      )}

      <div
        onClick={handleClickOnTrash}
        className="absolute top-0 right-0 z-10 p-2 text-primary cursor-pointer"
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </div>

      {media.isReady && media.thumbnailId ? (
        <Image
          src={media.thumbnailId}
          alt={`media`}
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          className="object-cover object-center"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" color="#fff0eb" />
          <Text className="text-secondary mt-2 text-center text-xs">
            We are formatting your media, it can take some time.
          </Text>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
