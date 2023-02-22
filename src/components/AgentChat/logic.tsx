import { database } from "@/firebase";
import { useAgents, useUser } from "@/hooks";
import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

// For complex components, I prefer to consolidate logic in a custom hook.
// This allows for smaller file sizes, and sensible colocation of logic.
// Also, it helps promote stateless components more often.
// In unit testing, custom hooks and their relatively stateless counterparts can be mocked and tested more easily separate.
export function useAgentChatState() {
  const [isThinking, setIsThinking] = useState(false);
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState<any>(null);
  const agents = useAgents();
  const user = useUser();
  const uid = user?.uid;
  const { agentSlug } = useParams();
  const agentName = agents?.[agentSlug || ""]?.name || "";

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

  const sendMessage = useCallback(
    (text: string, userGenerated = false) => {
      set(ref(database, `userData/${uid}/${agentSlug}/${Date.now()}`), {
        userGenerated,
        text,
      });
    },
    [agentSlug, uid]
  );

  const makeRequest = useCallback(() => {
    if (agents && agentSlug) {
      const url = agents[agentSlug].url;

      fetch(url)
        .then((d) => d.text())
        .then((d) => {
          setTimeout(() => {
            sendMessage(d);
            setIsThinking(false);
          }, 2000);
        })
        .catch((e) => setIsThinking(false));
    }
  }, [agentSlug, agents, sendMessage]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setText("");
      setIsThinking(true);
      sendMessage(text, true);
      makeRequest();
    },
    [makeRequest, sendMessage, text]
  );

  return {
    agentAvatar,
    agentName,
    sortedConversation,
    isThinking,
    setText,
    text,
    onSubmit,
  };
}
