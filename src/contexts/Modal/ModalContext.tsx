import { Modal, ModalOverlay } from "@chakra-ui/react";
import { IModalItem, IModalPayload, IModalProps } from "commons/types/Modal";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";

export interface ModalProviderProps {
  modals: IModalItem[];
  children: ReactNode | ReactNode[];
}

interface ModalContextType {
  showModal: (name: string, payload?: IModalPayload) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider: React.FC<ModalProviderProps> = ({
  modals,
  children,
}) => {
  const [ActiveModal, setActiveModal] = useState<React.FC<IModalProps> | null>(
    null
  );
  const [payload, setPayload] = useState<IModalPayload | {}>({});

  const showModal = useCallback(
    (name: string, payload?: IModalPayload) => {
      const modalExists = modals.find((modal) => modal.name === name);
      if (!modalExists) {
        throw new Error("Modal not found!");
      }

      setActiveModal(() => modalExists.component);
      setPayload(payload === undefined ? {} : payload);
    },
    [setActiveModal, setPayload, modals]
  );

  const hideModal = useCallback(() => {
    setPayload({});
    setActiveModal(null);
  }, [setPayload, setActiveModal]);

  const value = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        isOpen={ActiveModal !== null ? true : false}
        onClose={() => hideModal()}
      >
        <ModalOverlay />
        {ActiveModal && <ActiveModal payload={payload} />}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
