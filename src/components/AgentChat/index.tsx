import { i18n } from "@/utils/i18n";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import { ChatMessage } from "../ChatMessage";
import { useAgentChatState } from "./logic";

export function AgentChat() {
  const {
    agentAvatar,
    agentName,
    sortedConversation,
    isThinking,
    setText,
    text,
    onSubmit,
  } = useAgentChatState();

  return (
    <Box>
      <ChatMessage avatar={agentAvatar}>
        {i18n.gettext(
          "Hello, I am %1. Please chat with me in the input below!",
          agentName
        )}
      </ChatMessage>
      {sortedConversation.map((ea) => (
        <ChatMessage
          avatar={ea.userGenerated ? "🙂" : agentAvatar}
          key={ea.timestamp}
          isReversed={ea.userGenerated}
          timestamp={ea.timestamp}
        >
          {ea.text}
        </ChatMessage>
      ))}
      {isThinking && (
        <ChatMessage avatar={agentAvatar}>
          <Skeleton variant={"text"} width={"8rem"} />
        </ChatMessage>
      )}
      <Divider />
      <Box sx={{ pt: 2 }}>
        <form onSubmit={onSubmit}>
          <TextField
            label={i18n.gettext("Enter your message")}
            sx={{ width: "100%" }}
            onChange={(e) => setText(e.target.value)}
            value={text}
            InputProps={{
              endAdornment: (
                <Button type={"submit"}>{i18n.gettext("Send")}</Button>
              ),
            }}
          />
        </form>
      </Box>
    </Box>
  );
}
