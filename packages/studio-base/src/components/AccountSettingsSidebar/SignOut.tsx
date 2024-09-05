// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Button } from "@mui/material";

import { useCurrentUser } from "@foxglove/studio-base/context/CurrentUserContext";

export function SignOut(): JSX.Element {
  const { signOut, currentUser } = useCurrentUser();

  return (
    <Button variant="contained" color="primary" onClick={signOut}>
      Sign Out {currentUser?.email}
    </Button>
  );
}
