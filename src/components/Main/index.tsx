import { DRAWER_WIDTH } from "@/constants";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, Route, Routes } from "react-router-dom";

function MainPage() {
  return <Box>Hello, world</Box>;
}

function OtherPage() {
  return (
    <Box>
      <Box>Goodbye, world</Box>
      <Box>
        <Link to="/">Return</Link>
      </Box>
    </Box>
  );
}

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
        <Route path="/" element={<MainPage />} />
        <Route path="/other" element={<OtherPage />} />
      </Routes>
    </Box>
  );
}
