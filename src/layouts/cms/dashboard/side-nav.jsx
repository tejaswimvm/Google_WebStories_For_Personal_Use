import { Link as ReactLink } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { items, otherItems } from "./config";
import { SideNavItem } from "./side-nav-item";
import { usePathname } from "@hooks/cms/use-pathname";
import { Scrollbar } from "@cms-components/scrollbar";
import { Logo } from "@cms-components/logo";

export const SideNav = (props) => {
  const { open, onClose, onOpen } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <Scrollbar
      onMouseOver={onOpen}
      onMouseOut={onClose}
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={ReactLink}
            to="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
            {/* {otherItems.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })} */}
          </Stack>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: open ? "flex" : "none",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="inherit" variant="subtitle1">
              CreateStories
            </Typography>
            <Typography color="neutral.400" variant="body2">
              Production
            </Typography>
          </div>
          <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
            <ChevronUpDownIcon />
          </SvgIcon>
        </Box>
        <div style={{ display: open ? "block" : "none" }}>
          <Divider sx={{ borderColor: "neutral.700" }} />
          <Box
            sx={{
              px: 2,
              py: 3,
            }}
          >
            <Typography color="neutral.100" variant="subtitle2">
              Need more features?
            </Typography>
            <Typography color="neutral.500" variant="body2">
              Check out our Pro membership.
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                mx: "auto",
                width: "160px",
                "& img": {
                  width: "100%",
                },
              }}
            >
              <img alt="Go to pro" src="./assets/devias-kit-pro.png" />
            </Box>
            <Button
              component="a"
              endIcon={
                <SvgIcon fontSize="small">
                  <ArrowTopRightOnSquareIcon />
                </SvgIcon>
              }
              fullWidth
              href="https://praveenchaudhary.in/"
              sx={{ mt: 2 }}
              target="_blank"
              variant="contained"
            >
              Contact Me
            </Button>
          </Box>
        </div>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: open ? 280 : 70,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  console.log("openNav", open, "islarge", lgUp);

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: open ? 280 : 70,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
};
