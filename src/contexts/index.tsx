import { Agents } from "@/types";
import { createContext } from "react";
import { User } from "firebase/auth";

export const agentsContext = createContext<Agents>({});
export const userContext = createContext<User | null>(null);
