import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { usePathname } from "@hooks/cms/use-pathname";
import { useAuthContext } from "@contexts/auth-context";

export const AuthGuard = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const pathname = usePathname();

  const { isAuthenticated } = useAuthContext();
  console.log("isAuthenticated auth", isAuthenticated);
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    // if (!router.isReady) {
    //   return;
    // }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (true) {
      console.log("Not authenticated, redirecting");
      navigate({
        pathname: "/auth/login",
        // replace:true,
        search:
          pathname !== "/"
            ? createSearchParams({
                continueUrl: pathname,
              }).toString()
            : undefined,
      });
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
