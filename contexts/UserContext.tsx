import { UserContextTYPE, UserTYPE } from "@/types/AllTypes";
import { createContext } from "react";

export const UserContext = createContext<UserContextTYPE>({} as UserContextTYPE);

