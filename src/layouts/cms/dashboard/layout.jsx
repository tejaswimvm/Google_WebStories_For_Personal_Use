import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { usePathname } from "@hooks/cms/use-pathname";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { useSearchParams } from "react-router-dom";

const SIDE_NAV_WIDTH = 70;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
  "& [data-testid='dashboard-left-rail']": {
    top: "64px !important",
  },
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      console.log("closing on path change");
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    console.log("pathname changed", pathname);
    handlePathnameChange();
  }, [pathname]);

  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  console.log("id layout searchParams", id, searchParams);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        onOpen={() => {
          setOpenNav(true);
        }}
      />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
});
