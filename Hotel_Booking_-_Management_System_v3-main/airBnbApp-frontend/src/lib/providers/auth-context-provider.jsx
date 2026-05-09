import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import { getEncodedRedirectUrl } from '@/lib/utils';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useQuery from '../hooks/useQuery';
import { AppLoader } from '@/components/ui/loader';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const WithAuthProvider = () => {
  const location = useLocation();
  const { authenticatedUser, authChecked } = useAuthContext();

  if (!authChecked) {
    return <AppLoader />;
  }

  if (!authenticatedUser.isAuthenticated) {
    const redirectUrl = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`${PATHS.SIGN_IN}?${getEncodedRedirectUrl(redirectUrl)}`}
        replace
      />
    );
  }

  if (!authenticatedUser.user) {
    return <AppLoader />;
  }

  return <Outlet />;
};

const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = React.useState({
    isAuthenticated: false,
    user: null,
  });
  const [authChecked, setAuthChecked] = React.useState(false);

  const {
    data,
    error,
    pending,
    refetchQuery: refetchCurrentUser,
  } = useQuery({
    url: API_CONFIG.USER.PROFILE,
  });

  React.useEffect(() => {
    if (data) {
      setAuthenticatedUser({ isAuthenticated: true, user: data });
      setAuthChecked(true);
    } else if (error) {
      setAuthenticatedUser({ isAuthenticated: false, user: null });
      setAuthChecked(true);
    }
  }, [data, error]);

  const contextValue = {
    authenticatedUser,
    setAuthenticatedUser,
    refetchCurrentUser,
    authChecked,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
}

export { useAuthContext, WithAuthProvider };
export default AuthContextProvider;
