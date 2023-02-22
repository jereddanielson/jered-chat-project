import { DRAWER_WIDTH } from "@/constants";
import { i18n } from "@/utils/i18n";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useCallback, useState } from "react";
import { MenuContents } from "../MenuContent";

export function SideBar({ userEmail }: { userEmail: string }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={i18n.gettext("Open Agents menu")}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label={i18n.gettext("Agents menu")}
      >
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          <MenuContents
            setIsMobileOpen={setIsMobileOpen}
            userEmail={userEmail}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <MenuContents
            setIsMobileOpen={setIsMobileOpen}
            userEmail={userEmail}
          />
        </Drawer>
      </Box>
    </>
  );
}
