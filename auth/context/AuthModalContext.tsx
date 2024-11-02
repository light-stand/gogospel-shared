import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthModal from "../components/AuthModal";

const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
});

export const useAuthModal = () => useContext(ModalContext);

export const AuthModalProvider = ({ children }: { children: React.ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      <BottomSheetModalProvider>
        {children}
        <AuthModal ref={bottomSheetModalRef} closeModal={closeModal} />
      </BottomSheetModalProvider>
    </ModalContext.Provider>
  );
};
