import { AgentChat } from "@/components/AgentChat";
import { Info } from "@/components/Info";
import { DRAWER_WIDTH } from "@/constants";
import { useUser } from "@/hooks";
import { i18n } from "@/utils/i18n";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import { SideBar } from "../Sidebar";

export function Main() {
  const userData = useUser();

  return (
    <>
      <SideBar userEmail={userData?.email || i18n.gettext("Log out")} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Routes>
          <Route path={"/"} element={<Info />} />
          <Route path={":agentSlug"} element={<AgentChat />} />
        </Routes>
      </Box>
    </>
  );
}
