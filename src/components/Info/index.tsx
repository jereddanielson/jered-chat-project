import { i18n } from "@/utils/i18n";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Info() {
  return (
    <Box>
      <Typography variant={"h3"}>
        {i18n.gettext("Chat Demonstration")}
      </Typography>
      <Typography paragraph>
        Welcome this chat demonstration. This webapp dynamically loads basic API
        interfaces from a Firebase instance and allows you to query them.
      </Typography>
      <Typography paragraph>
        Firebase also allows to save chat histories unique to each user, which
        are able to be stored and loaded dynamically from any browser as long as
        the user is logged in.
      </Typography>
      <Typography paragraph>
        Please select an API from the menu and start chatting!
      </Typography>
    </Box>
  );
}
