import React, { createContext } from 'react';
import { isAdmin } from '../utils';
import { useAuthContext } from './auth-context-provider';
import { Navigate, Outlet, useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import { AppLoader } from '@/components/ui/loader';

const AdminContext = createContext();

const WithAdminProvider = () => {
  const { authenticatedUser } = useAuthContext();
  const isAdmin2 = isAdmin(authenticatedUser.user);

  console.log('admin provider', authenticatedUser.user);

  if (!isAdmin2) return <Navigate to={'/'} />;

  return <Outlet />;
};

const AdminContextProvider = ({ children }) => {
  const { hotelId } = useParams();
  const { data, pending, error } = useQuery({
    url: `/admin/hotels/${hotelId}`,
  });

  const contextValue = {
    hotel: data,
    isLoading: pending,
    error,
  };

  if (pending) return <AppLoader />;

  return <AdminContext value={contextValue}>{children}</AdminContext>;
};

function useAdminContext() {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error(
      'useAdminContext must be used within a AdminContextProvider'
    );
  }
  return context;
}

export { WithAdminProvider, AdminContextProvider, useAdminContext };
