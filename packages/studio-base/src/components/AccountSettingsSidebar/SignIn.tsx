// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// src/components/AccountSettingsSidebar/SignIn.tsx
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useCurrentUser } from "@foxglove/studio-base/context/CurrentUserContext";

export function SignIn(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useCurrentUser();

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        await signUp(username, password);
      } else {
        await signIn(username, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <Button
        onClick={() => {
          setIsSignUp(!isSignUp);
        }}
      >
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </Button>
    </div>
  );
}
