import { HashRouter as Router, Routes, Route } from "react-router-dom";
// Website / Main Landing Page
import Home from "./pages/HomePage/Home";
// CMS Pages
import PageNotFound from "./pages/Cms/404";
import Companies from "./pages/Cms/companies";
import Customers from "./pages/Cms/customers";
import Settings from "./pages/Cms/settings";
import Account from "./pages/Cms/account";
import CmsHome from "./pages/Cms/index";
import Login from "./pages/Cms/auth/login";
import Register from "./pages/Cms/auth/register";
// Layouts
import { Layout as DashboardLayout } from "@layouts/cms/dashboard/layout";
import { Layout as AuthLayout } from "@layouts/cms/auth/layout";

import { Helmet as Head } from "react-helmet";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ProgressBar from "@hooks/cms/use-nprogress";
import { createTheme } from "@theme/cms";
import { createEmotionCache } from "@utils/cms/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { AuthProvider, AuthConsumer } from "@contexts/auth-context";
import { DashboardPage } from "./pages/Dashboard/directIndex";
import { EditorSettings } from "@components/story-dashboard/components/editorSettings";
// Routes

const CmsRoutes = () => {
  // useNProgress();
  return (
    <Router
    // basename="/webstories"
    >
      <ProgressBar />
      <Routes>
        {/* <DashboardLayout> */}
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard"
          element={
            <DashboardLayout>
              {/* <CmsHome /> */}
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="customers"
          element={
            <DashboardLayout>
              <Customers />
            </DashboardLayout>
          }
        />
        <Route
          path="story-dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="editor-settings"
          element={
            <DashboardLayout>
              <EditorSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="companies"
          element={
            <DashboardLayout>
              <Companies />
            </DashboardLayout>
          }
        />
        <Route
          path="account"
          element={
            <DashboardLayout>
              <Account />
            </DashboardLayout>
          }
        />
        <Route
          path="auth/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="auth/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="templates-gallery"
          element={
            <DashboardLayout>
              {/* <CmsHome /> */}
              <DashboardPage />
            </DashboardLayout>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

// Configuration
const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const WebStoriesCms = () => {
  const theme = createTheme();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>CreateStories</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthConsumer>
              {(auth) => (auth.isLoading ? <SplashScreen /> : <CmsRoutes />)}
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default WebStoriesCms;
