"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modal/card-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
    </>
  );
};

// this will protect this from hydration errors, and only run on the client side
