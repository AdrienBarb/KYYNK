import React, { FC, useState } from 'react';
import {
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
} from 'react-share';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/Dialog';

interface ShareModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ShareModal: FC<ShareModalProps> = ({ open, setOpen }) => {
  const [isLinkCopied, setIsLinkCopier] = useState(false);
  const pathname = usePathname();
  const { locale } = useParams();

  const t = useTranslations();

  const urlToShare = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${pathname}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(urlToShare);
      setIsLinkCopier(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent className="z-[1000] bg-secondary p-16">
        <div className="flex flex-wrap justify-around items-center gap-8">
          <TwitterShareButton
            url={urlToShare}
            title={t('profile.shareTitleSocialMedia')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                <TwitterIcon sx={{ color: '#FFF0EB' }} />
              </div>
              <p className="font-karla font-light text-xs text-custom-black">
                Twitter
              </p>
            </div>
          </TwitterShareButton>
          <FacebookShareButton
            url={urlToShare}
            title={t('profile.shareTitleSocialMedia')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                <FacebookIcon sx={{ color: '#FFF0EB' }} />
              </div>
              <p className="font-karla font-light text-xs text-custom-black">
                Facebook
              </p>
            </div>
          </FacebookShareButton>
          <TelegramShareButton
            url={urlToShare}
            title={t('profile.shareTitleSocialMedia')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
                <TelegramIcon sx={{ color: '#FFF0EB' }} />
              </div>
              <p className="font-karla font-light text-xs text-custom-black">
                Telegram
              </p>
            </div>
          </TelegramShareButton>
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={copyToClipboard}
          >
            <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full">
              <LinkIcon sx={{ color: '#FFF0EB' }} />
            </div>
            <p className="font-karla font-light text-xs text-custom-black">
              {isLinkCopied ? 'Lien copié' : 'Lien'}
            </p>
          </div>
        </div>
        <DialogClose className="absolute right-4 top-4">
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
