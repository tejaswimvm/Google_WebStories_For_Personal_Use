import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useAuth } from "@hooks/cms/use-auth";
import { useAuthContext } from "@contexts/auth-context";
import axiosInstance from "src/apiFetch";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const { user } = useAuthContext();

  const handleSignOut = useCallback(() => {
    onClose?.();
    auth.signOut();
    navigate("/auth/login");
  }, [onClose, auth, location]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
