import { Box } from "@mui/material";
import { useContext } from "react";
import { AlertContext, AlertContextValue } from "../../../../context/AlertContext";
import { AlertItem } from "./AlertItem";

export const Alerts: React.FC<{}> = () => {

    const { alerts, removeAlert } = useContext<AlertContextValue>(AlertContext);

    return (
        <Box sx={{ position: 'absolute', bottom: 20, left: 20, zIndex: 1200 }}>
            {alerts.map(alert =>
                <AlertItem
                    key={alert.key}
                    description={alert.description}
                    type={alert.type}
                    onClose={() => removeAlert(alert.key)}
                />
            )}
        </Box>
    )
}