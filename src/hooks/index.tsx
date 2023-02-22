import { agentsContext } from "@/contexts";
import { useContext } from "react";

export function useAgents() {
  return useContext(agentsContext);
}
