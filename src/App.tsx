import { LoginPage } from "@/components/LoginPage";
import { Main } from "@/components/Main";
import { SideBar } from "@/components/Sidebar";
import { auth } from "@/firebase";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUserData(user);
    });
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {userData ? (
        <>
          <SideBar />
          <Main />
        </>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
}

export default App;
