import { AlertColor } from '@mui/material';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';

interface AlertProps {
    key: string,
    description: string,
    type?: AlertColor,
}

export interface AlertContextValue {
    alerts: AlertProps[],
    sendAlert: (description: string, type?: AlertColor, distinct?: boolean) => void,
    removeAlert: (key: string) => void
}

export const alertSubject = new Subject<{ description: string, type?: AlertColor, distinct?: boolean }>();

export const AlertContextDefaultValue: AlertContextValue = {
    alerts: [],
    sendAlert: (description: string, type?: AlertColor, distinct?: boolean) => { },
    removeAlert: (key: string) => { }
};

/**
 * 在 Function Component 裡面要用 Alert 請用 AlertContext;
 * @example const {sendAlert} = useContext<AlertContextValue>(AlertContext);
 * 在其他地方要用 Alert，請用 alertSubject
 * @example alertSubject.next(description: string, type?: AlertColor);
 */
export const AlertContext = React.createContext<AlertContextValue>(AlertContextDefaultValue);

export const AlertContextProvider: React.FC<{ children: ReactNode }> = props => {

    const subscribedRef = useRef<boolean>(false);

    const [alerts, setAlerts] = useState<AlertProps[]>([]);

    const sendAlert = (description: string, type?: AlertColor, distinct?: boolean) => {
        let key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        setAlerts(oldAlerts => {
            return !(distinct && oldAlerts.find(alert => alert.description === description)) ? [
                {
                    key: key,
                    description: description,
                    type: type ? type : 'info',
                }, ...oldAlerts
            ] : oldAlerts;
        });

    };

    const removeAlert = (key: string) => {
        setAlerts(oldAlerts => oldAlerts.filter(alert => alert.key !== key));
    };

    useEffect(() => {
        if (!subscribedRef.current) {
            alertSubject.subscribe(alert => {
                sendAlert(alert.description, alert.type, alert.distinct)
            });
            subscribedRef.current = true
        }
    }, []);

    return (
        <AlertContext.Provider value={{ alerts, sendAlert, removeAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};