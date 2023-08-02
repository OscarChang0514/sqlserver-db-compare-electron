import React, { ReactNode } from "react";
import { AlertContextProvider } from "./AlertContext";

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = props => {

    return (
        <AlertContextProvider>
            {props.children}
        </AlertContextProvider>
    );
}
