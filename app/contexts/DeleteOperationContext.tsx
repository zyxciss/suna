import { createContext, useContext, useState, ReactNode } from 'react';

export interface DeleteOperationContextType {
  isDeleting: boolean;
  itemToDelete: string | null;
  setItemToDelete: (id: string | null) => void;
  startDelete: (id: string) => void;
  confirmDelete: () => Promise<void>;
  cancelDelete: () => void;
}

const DeleteOperationContext = createContext<DeleteOperationContextType | undefined>(undefined);

export function DeleteOperationProvider({ children }: { children: ReactNode }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const startDelete = (id: string) => {
    setItemToDelete(id);
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    // This is a placeholder for actual delete logic
    // In a real implementation, this would call an API
    console.log(`Deleting item: ${itemToDelete}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsDeleting(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setItemToDelete(null);
  };

  return (
    <DeleteOperationContext.Provider
      value={{
        isDeleting,
        itemToDelete,
        setItemToDelete,
        startDelete,
        confirmDelete,
        cancelDelete,
      }}
    >
      {children}
    </DeleteOperationContext.Provider>
  );
}

export function useDeleteOperation() {
  const context = useContext(DeleteOperationContext);
  if (context === undefined) {
    throw new Error('useDeleteOperation must be used within a DeleteOperationProvider');
  }
  return context;
}
