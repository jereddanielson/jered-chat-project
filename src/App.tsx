import { SideBar } from "@/components/Sidebar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Main } from "@/components/Main";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideBar />
      <Main />
    </Box>
  );
}

export default App;
