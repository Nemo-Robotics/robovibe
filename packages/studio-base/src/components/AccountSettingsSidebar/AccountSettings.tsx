// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// src/components/AccountSettings.tsx

import { useCurrentUser } from "@foxglove/studio-base/context/CurrentUserContext";

import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

export function AccountSettings(): JSX.Element {
  const { currentUser } = useCurrentUser();

  return <div>{currentUser ? <SignOut /> : <SignIn />}</div>;
}
