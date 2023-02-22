import { agentsContext, userContext } from "@/contexts";
import { useContext } from "react";

export function useAgents() {
  return useContext(agentsContext);
}

export function useUser() {
  return useContext(userContext);
}
