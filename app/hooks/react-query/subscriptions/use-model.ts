import { useState, useEffect, useMemo } from 'react';

// Mock implementation for model selection hook
export const useModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState('qwen/qwen3-235b-a22b:free');
  
  const availableModels = useMemo(() => [
    {
      id: 'qwen/qwen3-235b-a22b:free',
      name: 'Qwen 3',
      description: 'Qwen 3 235B model',
      contextLength: 128000,
      pricing: 'Free'
    }
  ], []);
  
  return {
    selectedModel,
    setSelectedModel,
    availableModels
  };
};

export const useAvailableModels = () => {
  const models = useMemo(() => [
    {
      id: 'qwen/qwen3-235b-a22b:free',
      name: 'Qwen 3',
      description: 'Qwen 3 235B model',
      contextLength: 128000,
      pricing: 'Free'
    }
  ], []);
  
  return { models, isLoading: false, error: null };
};

export const useSubscription = () => {
  return {
    subscription: {
      tier: 'free',
      active: true,
      features: {
        models: ['qwen/qwen3-235b-a22b:free']
      }
    },
    isLoading: false
  };
};
