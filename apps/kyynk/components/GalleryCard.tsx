import React, { FC } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Media } from '@/types/models/Media';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useApi from '@/lib/hooks/useApi';
import Text from './Text';
import { Loader2 } from 'lucide-react';

interface GalleryCardProps {
  media: Media;
  refetch: () => void;
}

const GalleryCard: FC<GalleryCardProps> = ({ media, refetch }) => {
  // traduction
  const t = useTranslations();

  const { usePut } = useApi();

  const { mutate: archiveMedia } = usePut(`/api/medias/${media.id}/archive`, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleClickOnTrash = async () => {
    await archiveMedia({});
  };

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-primary"
      // style={{ cursor: handleSelectMedia ? 'pointer' : 'inherit' }}
      // onClick={() => {
      //   if (handleSelectMedia) {
      //     handleSelectMedia(media);
      //   }
      // }}
    >
      {/* {handleSelectMedia && (
          <div
            className={clsx(
              'absolute top-2 left-2 z-10 w-6 h-6 bg-white border border-primary flex items-center justify-center rounded',
              isSelected && 'bg-primary text-white',
            )}
          >
            {isSelected && <FontAwesomeIcon icon={faCheck} />}
          </div>
        )} */}

      <div
        onClick={handleClickOnTrash}
        className="absolute top-0 right-0 z-10 p-2 text-primary cursor-pointer"
      >
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </div>

      {media.isReady ? (
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
          <Text className="text-background mt-2 text-center text-xs">
            We are formatting your media, it can take some time.
          </Text>
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
