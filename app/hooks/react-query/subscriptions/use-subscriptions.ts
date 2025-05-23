import { useState, useMemo } from 'react';

export const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const subscription = useMemo(() => ({
    tier: 'free',
    active: true,
    features: {
      models: ['qwen/qwen3-235b-a22b:free'],
      maxProjects: 5,
      maxThreads: 20,
      maxStorage: 1024 * 1024 * 100, // 100MB
      allowFileUploads: true,
      allowCustomModels: false
    },
    usage: {
      projects: 1,
      threads: 3,
      storage: 1024 * 512 // 512KB
    }
  }), []);
  
  return {
    subscription,
    isLoading,
    error: null
  };
};
