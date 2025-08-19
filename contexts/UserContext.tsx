import { UserTYPE } from "@/types/AllTypes";
import { createContext } from "react";

export const UserContext = createContext<UserTYPE | null>(null);

