import { auth } from "@/firebase";
import { useAgents } from "@/hooks";
import { i18n } from "@/utils/i18n";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function MenuContents({
  setIsMobileOpen,
  userEmail,
}: {
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
}) {
  const navigate = useNavigate();
  const agents = useAgents();

  const agentSlugs = useMemo(() => Object.keys(agents), [agents]);

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
              <ListItemText primary={agents[ea].name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
