import { useParams } from "react-router-dom";

export function AgentChat() {
  const { agentSlug } = useParams();

  return <>Hello, I am agent number {agentSlug}</>;
}
