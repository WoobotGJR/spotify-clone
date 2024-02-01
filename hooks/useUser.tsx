import { UserDetails } from '@/types';
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';
import { Subscription, User } from '@supabase/gotrue-js';
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// create user context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

// create user context provider
export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trailing', 'active'])
      .single();

  useEffect(() => {
    (async () => {
      try {
        if (user && !isLoadingData && !userDetails && !subscription) {
          setIsLoadingData(true);

          const [userDetailsPromise, subscriptionPromise] =
            await Promise.allSettled([getUserDetails(), getSubscription()]);

          if (
            userDetailsPromise.status === 'fulfilled' &&
            subscriptionPromise.status === 'fulfilled'
          ) {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
        } else if (!user && !isLoadingData && !userDetails && !subscription) {
          setUserDetails(null);
          setSubscription(null);
        }
      } catch (err) {
        console.log(
          `Error getting user data in useUser.tsx from Supabase: ${err}`
        );
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, [user, isLoadingUser]);

  // setTimeout(() => {
  //   console.log(subscription, userDetails);
  // }, 1000);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

// useUser hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
