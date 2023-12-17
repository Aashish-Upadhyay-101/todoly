"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modal/card-modal";
import { ProModal } from "../modal/pro-modal";

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
      <ProModal />
    </>
  );
};

// this will protect this from hydration errors, and only run on the client side
