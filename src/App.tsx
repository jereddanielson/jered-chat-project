import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { LoginPage } from "@/components/LoginPage";
import { Main } from "@/components/Main";
import { SideBar } from "@/components/Sidebar";
import { agentsContext } from "@/contexts";
import { auth, database } from "@/firebase";
import { Agents } from "@/types";
import { i18n } from "@/utils/i18n";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [agents, setAgents] = useState<Agents>({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUserData(user);
    });
  }, []);

  useEffect(() => {
    onValue(ref(database, "agents"), (snapshot) => {
      setAgents(snapshot.val());
    });
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <agentsContext.Provider value={agents}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {userData ? (
          <>
            <SideBar userEmail={userData.email || i18n.gettext("Log out")} />
            <Main />
          </>
        ) : (
          <LoginPage />
        )}
      </Box>
    </agentsContext.Provider>
  );
}

export default App;
