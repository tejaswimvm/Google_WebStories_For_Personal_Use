import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import PropTypes from "prop-types";
import apiFetch from "src/apiFetch";
import axiosInstance from "src/apiFetch";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: true,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: true,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.error(
        "failed to retrieve user and session from local storage",
        err
      );
    }

    if (user) {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    console.log("initializing", initialized);
    initialize();
  }, []);

  const skip = () => {
    const email = "test@gmail.com";
    const password = "Password123!";
    signIn(email, password);
  };

  const signIn = async (email, password) => {
    try {
      const userdata = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (userdata?.status !== 200) {
        throw new Error(
          userdata?.statusText || "Please check your email and password"
        );
      }
      console.log("userdata?.data", userdata?.data);

      const user = userdata?.data?.user;
      try {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(user?.token));
      } catch (err) {
        console.log("failed while setting to local storage");
      }

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error(error.response.data?.message);
          // You can access the error message in the response body with error.response.data
        } else {
          // Handle other types of errors here
          console.error("Other error:", error);
          throw new Error(error);
        }
      } else {
        // Handle network errors or other issues
        console.error("Network error:", error);
        throw new Error(error);
      }
    }
  };

  const signUp = async (email, name, password) => {
    try {
      const dataCreated = await apiFetch.post("/auth/register", {
        name: name,
        email,
        password,
      });
      console.log("dataCreated", dataCreated);
    } catch (error) {
      console.log("error", error);
    }
  };

  const signOut = async () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }
    await axiosInstance.post("/auth/signout");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
