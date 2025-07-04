'use client';

import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from 'react';
import { NudeWithPermissions } from '@/types/nudes';

interface ConversationModalsContextType {
  openPrivateNudeModal: boolean;
  setOpenPrivateNudeModal: (open: boolean) => void;
  isNudeModalOpen: boolean;
  setNudeModalOpen: (open: boolean) => void;
  selectedNude: NudeWithPermissions | null;
  setSelectedNude: (nude: NudeWithPermissions | null) => void;
}

const ConversationModalsContext = createContext<
  ConversationModalsContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const ConversationModalsProvider: FC<Props> = ({ children }) => {
  const [openPrivateNudeModal, setOpenPrivateNudeModal] = useState(false);
  const [isNudeModalOpen, setNudeModalOpen] = useState(false);
  const [selectedNude, setSelectedNude] = useState<NudeWithPermissions | null>(
    null,
  );

  return (
    <ConversationModalsContext.Provider
      value={{
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
