// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// SignInModal.tsx
import { Modal, Box, TextField, Button, Typography, Link } from "@mui/material";
import React, { useState } from "react";

import { signIn, signUp } from "@foxglove/studio-base/services/auth";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

const SignInModal: React.FC<SignInModalProps> = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await signUp(email, password);
        setError("Sign up successful. Please check your email for confirmation.");
      } else {
        await signIn(email, password);
        console.log("Sign in successful");
        onClose();
      }
    } catch (err) {
      setError(`Failed to ${isSignUp ? "sign up" : "sign in"}. ${err}`);
      console.error(`Error ${isSignUp ? "signing up" : "signing in"}:`, err);
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            margin="normal"
            required
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
            required
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link component="button" variant="body2" onClick={toggleSignUp}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignInModal;
