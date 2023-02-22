import { DRAWER_WIDTH } from "@/constants";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import { AgentChat } from "@/components/AgentChat";

export function Main() {
  return (
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
        <Route path={":agentSlug"} element={<AgentChat />} />
      </Routes>
    </Box>
  );
}
