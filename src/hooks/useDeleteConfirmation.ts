import { useState } from 'react';

interface UseDeleteConfirmationReturn<T> {
  isDeleteModalOpen: boolean;
  itemToDelete: T | null;
  openDeleteModal: (item: T) => void;
  closeDeleteModal: () => void;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
}

export function useDeleteConfirmation<T>(): UseDeleteConfirmationReturn<T> {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (item: T) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return {
    isDeleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
    isDeleting,
    setIsDeleting,
  };
}