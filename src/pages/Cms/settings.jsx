import { Helmet as Head } from "react-helmet";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "@cms-sections/settings/settings-notifications";
import { SettingsPassword } from "@cms-sections/settings/settings-password";
import { Layout as DashboardLayout } from "@layouts/cms/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings | CreateStories</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
