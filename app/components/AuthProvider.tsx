import React from 'react';

// Simplified auth provider hook
export function useAuth() {
  return {
    user: { id: 'user-1', name: 'Demo User' },
    isAuthenticated: true,
    isLoading: false,
    signIn: () => Promise.resolve(),
    signOut: () => Promise.resolve(),
    session: { 
      user: { id: 'user-1', name: 'Demo User' },
      access_token: 'dummy-token'
    }
  };
}
