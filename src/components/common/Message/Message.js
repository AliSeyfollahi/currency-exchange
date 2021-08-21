import { IconButton, Snackbar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Close } from "@material-ui/icons";

export default function Message(props) {
  const [open, setOpen] = useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      message={props.message}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
}
