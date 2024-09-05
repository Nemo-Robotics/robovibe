// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { ButtonBase, Link, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
  },
}));

type SignInPromptProps = {
  onSignInClick: () => void;
  onDismiss: () => void;
};

export function SignInPrompt({ onSignInClick, onDismiss }: SignInPromptProps): JSX.Element {
  const { classes } = useStyles();

  const handleSignInClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onSignInClick();
  };

  return (
    <ButtonBase className={classes.root} onClick={handleSignInClick}>
      <Typography align="left" className={classes.title} variant="body2">
        <Link color="inherit" onClick={handleSignInClick} underline="always">
          Sign in
        </Link>{" "}
        to sync layouts across multiple devices, and share them with your organization.
        <Link color="inherit" onClick={onDismiss} underline="always" style={{ marginLeft: "8px" }}>
          (Dismiss)
        </Link>
      </Typography>
    </ButtonBase>
  );
}
