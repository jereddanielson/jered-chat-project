import { auth, database } from "@/firebase";
import { useAgents, useUser } from "@/hooks";
import { i18n } from "@/utils/i18n";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export function MenuContents({
  setIsMobileOpen,
  userEmail,
}: {
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
}) {
  const [nameMapping, setNameMapping] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const agents = useAgents();
  const user = useUser();

  const agentSlugs = useMemo(() => Object.keys(agents), [agents]);

  useEffect(() => {
    onValue(ref(database, `userData/${user?.uid}`), (snapshot) => {
      const val = snapshot.val();

      const newNameMapping: { [key: string]: string } = {};
      Object.keys(val).forEach((k) => {
        if (val[k].name) {
          newNameMapping[k] = val[k].name;
        }
      });

      setNameMapping(newNameMapping);
    });
  }, [user?.uid]);

  return (
    <>
      <Toolbar>
        <Button
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const didConfirmLogout = confirm(i18n.gettext("Confirm log out?"));

            if (didConfirmLogout) auth.signOut();
          }}
        >
          {userEmail}
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {agentSlugs.map((ea) => (
          <ListItem key={ea} disablePadding>
            <ListItemButton
              onClick={() => {
                setIsMobileOpen(false);
                navigate(ea);
              }}
            >
              <ListItemText primary={nameMapping[ea] || agents[ea].name} />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                const newName = prompt(
                  i18n.gettext("Please enter new name for %1", agents[ea].name)
                );

                set(ref(database, `userData/${user?.uid}/${ea}/name`), newName);
              }}
              sx={{ flexGrow: 0, opacity: 0.75 }}
              title={i18n.gettext("Rename %1", agents[ea].name)}
            >
              <EditIcon />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
