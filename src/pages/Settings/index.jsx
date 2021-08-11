import { Box, Divider } from "@material-ui/core";
import { AccountBoxRounded, SettingsApplications } from "@material-ui/icons";
import { useState } from "react";
import { useAsideStyles } from "shared/components/Layout/styles";

import { useSettingsStyles } from "./styles";
import ProfileTab from "./tabs/ProfileTab";
import SettingsTab from "./tabs/SettingsTab";

const navItems = [
  {
    label: "Profile",
    icon: <AccountBoxRounded />,
    component: <ProfileTab />,
  },
  {
    label: "Settings",
    icon: <SettingsApplications />,
    component: <SettingsTab />,
  },
];

const Settings = () => {
  const asideClasses = useAsideStyles();
  const settingsClasses = useSettingsStyles();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box display="flex" width="100%">
      <Box className={asideClasses.aside}>
        <Box className={asideClasses.asideTitle}>Settings</Box>

        <Box my={2}>
          <Divider />
        </Box>

        {navItems.map((item, index) => (
          <Box
            key={index}
            className={`${settingsClasses.tabItem} ${
              tabIndex === index ? "active" : ""
            }`}
            onClick={() => setTabIndex(index)}
          >
            {item.icon} <Box ml={2}>{item.label}</Box>
          </Box>
        ))}
      </Box>

      <Box width="100%">{navItems[tabIndex].component}</Box>
    </Box>
  );
};

export default Settings;
