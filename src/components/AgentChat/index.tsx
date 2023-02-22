import { i18n } from "@/utils/i18n";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo } from "react";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { database } from "@/firebase";
import { useUser } from "@/hooks";

function ChatMessage({
  avatar,
  isReversed,
  children,
}: {
  avatar: string;
  isReversed?: boolean;
  children?: ReactNode;
}) {
  return (
    <Grid
      container
      wrap={"nowrap"}
      spacing={2}
      sx={{ mb: 2 }}
      direction={isReversed ? "row-reverse" : "row"}
    >
      <Grid item>
        <Avatar>{avatar}</Avatar>
      </Grid>
      <Grid item>
        <Box
          sx={{
            bgcolor: isReversed ? "success.main" : "info.main",
            p: 2,
            borderRadius: 2,
            boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.25)",
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export function AgentChat() {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<any>(null);
  const user = useUser();
  const uid = user?.uid;
  const { agentSlug } = useParams();

  const agentAvatar = (agentSlug?.substring(0, 1) || "").toUpperCase();

  useEffect(() => {
    if (uid)
      onValue(ref(database, `userData/${uid}/${agentSlug}`), (snapshot) => {
        setConversation(snapshot.val());
      });
  }, [agentSlug, uid]);

  // Sort converation by timestamp just in case
  const sortedConversation = useMemo(() => {
    return conversation
      ? Object.keys(conversation)
          .map((timestamp) => ({
            timestamp: parseInt(timestamp),
            text: conversation[timestamp].text,
            userGenerated: conversation[timestamp].userGenerated,
          }))
          .sort((a, b) => a.timestamp - b.timestamp)
      : [];
  }, [conversation]);

  return (
    <Box>
      <ChatMessage avatar={agentAvatar}>
        {i18n.gettext(
          "Hello, I am %1. Please chat with me in the input below!",
          agentSlug
        )}
      </ChatMessage>
      {sortedConversation.map((ea) => (
        <ChatMessage
          avatar={ea.userGenerated ? "U" : agentAvatar}
          key={ea.timestamp}
          isReversed={ea.userGenerated}
        >
          {ea.text}
        </ChatMessage>
      ))}
      <Divider />
      <Box sx={{ pt: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setText("");
            set(ref(database, `userData/${uid}/${agentSlug}/${Date.now()}`), {
              userGenerated: true,
              text,
            });
          }}
        >
          <TextField
            label={i18n.gettext("Enter your message")}
            sx={{ width: "100%" }}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </form>
      </Box>
    </Box>
  );
}
