import { Project } from '@/lib/types';

export const mapApiProject = (data: any): Project => {
  const mappedProject: Project = {
    id: data.id,
    name: data.name,
    description: data.description,
    account_id: data.account_id,
    is_public: data.is_public || false,
    created_at: data.created_at,
    updated_at: data.updated_at || data.created_at, // Add missing required field
    sandbox: data.sandbox || {
      status: 'inactive'
    }
  };
  
  return mappedProject;
};
