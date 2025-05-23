import { useState, useEffect } from 'react';
import { DeleteOperationContextType } from '@/contexts/DeleteOperationContext';

// Fixed version of the status overlay component
export function StatusOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Mock implementation since we don't have the actual context
  const deleteOperation: DeleteOperationContextType = {
    isDeleting: false,
    itemToDelete: null,
    setItemToDelete: () => {},
    startDelete: () => {},
    confirmDelete: async () => {},
    cancelDelete: () => {}
  };

  useEffect(() => {
    setIsVisible(deleteOperation.isDeleting);
  }, [deleteOperation.isDeleting]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Processing...</h2>
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
