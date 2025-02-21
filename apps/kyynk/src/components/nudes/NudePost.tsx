import React, { FC, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Button } from '../ui/Button';
import Text from '../ui/Text';
import { NudeType } from '@/types/nudes';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import NudeCard from './NudeCard';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ApiVideoPlayer from '@api.video/react-player';
import BuyButton from './BuyButton';
import DeleteConfirmationModal from '../modals/ConfirmationModal';

interface NudePostProps {
  nude: NudeType;
  refCallback: (el: HTMLDivElement | null) => void;
}

const NudePost: FC<NudePostProps> = ({ nude, refCallback }) => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const { usePut } = useApi();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const { mutate: archiveNude } = usePut(`/api/nudes/${nude.id}/archive`, {
    onSuccess: () => {
      queryClient.setQueryData(
        ['get', { url: `/api/users/${slug}/nudes`, params: {} }],
        (oldData: any) => {
          return oldData
            ? oldData.filter((item: NudeType) => item.id !== nude.id)
            : [];
        },
      );
    },
  });

  const handleDeleteNude = async () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await archiveNude({});
  };

  return (
    <>
      <div ref={refCallback} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link href={`/${nude.user.slug}`}>
            <div className="flex items-center gap-2">
              <Avatar
                size={48}
                imageId={nude?.user?.profileImageId}
                pseudo={nude?.user?.pseudo}
              />
              <div className="flex flex-col">
                <span className="text-base font-bold font-karla leading-none">
                  {nude?.user?.pseudo}
                </span>
                <span className="text-sm font-normal font-karla text-custom-black/50">
                  {formatDistanceToNow(new Date(nude.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </Link>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-md"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-base font-medium">
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-base font-medium font-karla"
                >
                  <Link href={`/contact-us`}>Report</Link>
                </DropdownMenuItem>
                {nude.permissions.canEdit && (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="text-base font-medium font-karla"
                    >
                      <Link href={`/account/nudes/${nude.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 text-base font-medium"
                      onClick={handleDeleteNude}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Text className="whitespace-pre-wrap">{nude.description}</Text>

        {nude.permissions.canView ? (
          <div className="rounded-md overflow-hidden">
            <ApiVideoPlayer
              video={{ id: nude.media?.videoId }}
              style={{ height: '400px', width: '100%' }}
              hideTitle={true}
              controls={['play', 'progressBar', 'volume', 'fullscreen']}
            />
          </div>
        ) : (
          <NudeCard nude={nude} />
        )}

        {nude.permissions.canBuy && <BuyButton nude={nude} />}
      </div>
      <DeleteConfirmationModal
        open={isConfirmationModalOpen}
        setOpen={setConfirmationModalOpen}
        onDeleteConfirm={handleConfirmDelete}
        text="This action cannot be undone. This will permanently delete this nude."
      />
    </>
  );
};

export default NudePost;
