import React from 'react';
import { Dialog, DialogContent } from '../ui/Dialog';
import ApiVideoPlayer from '@api.video/react-player';
import NudeCard from '../nudes/NudeCard';
import BuyButton from '../nudes/BuyButton';
import { NudeWithPermissions } from '@/types/nudes';

interface NudeModalProps {
  isOpen: boolean;
  onClose: () => void;
  nude?: NudeWithPermissions | null;
  refetch: () => void;
  setSelectedNude: (nude: NudeWithPermissions | null) => void;
}

const NudeModal: React.FC<NudeModalProps> = ({
  isOpen,
  onClose,
  nude,
  refetch,
  setSelectedNude,
}) => {
  const handleAfterBuyAction = (newNude: NudeWithPermissions) => {
    setSelectedNude(newNude);
    refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="z-[1000] pt-12">
        {nude && nude.permissions.canView && nude.media?.videoId ? (
          <div className="rounded-md overflow-hidden">
            <ApiVideoPlayer
              video={{ id: nude.media.videoId }}
              style={{ height: '400px', width: '100%' }}
              hideTitle={true}
              controls={['play', 'progressBar', 'volume', 'fullscreen']}
            />
          </div>
        ) : (
          nude && <NudeCard nude={nude} />
        )}
        {nude && nude.permissions.canBuy && (
          <BuyButton nude={nude} afterBuyAction={handleAfterBuyAction} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NudeModal;
