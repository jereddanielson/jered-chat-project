import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { LoginPage } from "@/components/LoginPage";
import { Main } from "@/components/Main";
import { agentsContext, userContext } from "@/contexts";
import { auth, database } from "@/firebase";
import { Agents } from "@/types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { onAuthStateChanged, User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [agents, setAgents] = useState<Agents>({});
  const uid = userData?.uid;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUserData(user);
    });
  }, []);

  useEffect(() => {
    if (uid)
      onValue(ref(database, "agents"), (snapshot) => {
        setAgents(snapshot.val());
      });
  }, [uid]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <agentsContext.Provider value={agents}>
      <userContext.Provider value={userData}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {userData ? <Main /> : <LoginPage />}
        </Box>
      </userContext.Provider>
    </agentsContext.Provider>
  );
}

export default App;
