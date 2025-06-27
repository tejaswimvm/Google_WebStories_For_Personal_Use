import { PageHeading, Layout } from "@googleforcreators/dashboard";

export function EditorSettings() {
  return (
    <Layout.Provider>
      <div>
        <PageHeading heading={"Settings"} />
        <Layout.Scrollable>
          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EEE",
            }}
          >
            {"Settings"}
          </div>
        </Layout.Scrollable>
      </div>
    </Layout.Provider>
  );
}

export const leftRailRoutes = [
  {
    value: "/settings",
    label: "Settings",
  },
  {
    value: `https://googleforcreators.github.io/web-stories-wp/storybook/iframe.html?id=playground-dashboard--default&args=&viewMode=story#/`,
    label: "External link",
    isExternal: true,
  },
];
