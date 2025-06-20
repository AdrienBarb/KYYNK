import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from 'react';
import { NudeWithPermissions } from '@/types/nudes';

interface ConversationModalsContextType {
  openNotEnoughCreditModal: boolean;
  setOpenNotEnoughCreditModal: (open: boolean) => void;
  openPrivateNudeModal: boolean;
  setOpenPrivateNudeModal: (open: boolean) => void;
  isNudeModalOpen: boolean;
  setNudeModalOpen: (open: boolean) => void;
  selectedNude: NudeWithPermissions | undefined | null;
  setSelectedNude: (nude: NudeWithPermissions | undefined | null) => void;
}

const ConversationModalsContext = createContext<
  ConversationModalsContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const ConversationModalsProvider: FC<Props> = ({ children }) => {
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const [openPrivateNudeModal, setOpenPrivateNudeModal] = useState(false);
  const [isNudeModalOpen, setNudeModalOpen] = useState(false);
  const [selectedNude, setSelectedNude] = useState<
    NudeWithPermissions | undefined | null
  >(null);

  return (
    <ConversationModalsContext.Provider
      value={{
        openNotEnoughCreditModal,
        setOpenNotEnoughCreditModal,
        openPrivateNudeModal,
        setOpenPrivateNudeModal,
        isNudeModalOpen,
        setNudeModalOpen,
        selectedNude,
        setSelectedNude,
      }}
    >
      {children}
    </ConversationModalsContext.Provider>
  );
};

export const useConversationModals = () => {
  const context = useContext(ConversationModalsContext);
  if (context === undefined) {
    throw new Error(
      'useConversationModals must be used within a ConversationModalsProvider',
    );
  }
  return context;
};
