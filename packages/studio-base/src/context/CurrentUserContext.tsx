// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { signIn, signUp, signOut, getCurrentUser } from "@foxglove/studio-base/services/auth";

export type User = {
  id: string;
  avatarImageUrl?: string | null; // eslint-disable-line no-restricted-syntax
  email: string;
  orgId: string;
  orgDisplayName: string | null; // eslint-disable-line no-restricted-syntax
  orgSlug: string;
  orgPaid: boolean | null; // eslint-disable-line no-restricted-syntax
  org: {
    id: string;
    slug: string;
    displayName: string;
    isEnterprise: boolean;
    allowsUploads: boolean;
    supportsEdgeSites: boolean;
  };
};

interface CurrentUserContextType {
  currentUser: User | undefined;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const contextSignIn = async (username: string, password: string) => {
    const user = await signIn(username, password);
    setCurrentUser(user);
  };

  const contextSignUp = async (username: string, password: string) => {
    await signUp(username, password);
    await contextSignIn(username, password);
  };

  const contextSignOut = async () => {
    await signOut();
    setCurrentUser(undefined);
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    signIn: contextSignIn,
    signUp: contextSignUp,
    signOut: contextSignOut,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
}

export function useCurrentUser(): CurrentUserContextType {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}

export type UserType =
  | "unauthenticated"
  | "authenticated-free"
  | "authenticated-team"
  | "authenticated-enterprise";

export function useCurrentUserType(): UserType {
  const user = useCurrentUser();
  if (user.currentUser == undefined) {
    return "unauthenticated";
  }

  if (user.currentUser.org.isEnterprise) {
    return "authenticated-enterprise";
  }

  if (user.currentUser.orgPaid === true) {
    return "authenticated-team";
  }

  return "authenticated-free";
}

// ts-prune-ignore-next
export { CurrentUserContext };
