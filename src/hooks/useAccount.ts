import { useState, useEffect } from 'react';
import { accountService, AccountResponse, CreateAccountRequest } from '@/services/api/account';

interface AccountState {
  data: AccountResponse | null;
  loading: boolean;
  error: Error | null;
}

export const useAccount = (id?: string) => {
  const [state, setState] = useState<AccountState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchAccount = async (accountId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await accountService.findById(accountId);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error as Error 
      }));
    }
  };

  const createAccount = async (data: CreateAccountRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await accountService.create(data);
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error as Error 
      }));
      throw error;
    }
  };

  const updateAccount = async (accountId: string, data: Partial<CreateAccountRequest>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await accountService.update(accountId, data);
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error as Error 
      }));
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchAccount(id);
    }
  }, [id]);

  return {
    ...state,
    createAccount,
    updateAccount,
    refetch: id ? () => fetchAccount(id) : undefined,
  };
};
