import { Alert, AlertColor, Box, Fade } from "@mui/material";
import React, { useEffect, useState } from "react";

interface AlertItemProps {
    description?: string;
    type?: AlertColor;
    onClose?: () => void;
}

export const AlertItem: React.FC<AlertItemProps> = (props) => {

    const [shows, setShows] = useState(false);

    //待動畫結束後再真正從context移除該筆訊息
    const removeItem = () => {
        setShows(false);
        setTimeout(() => {
            props.onClose();
        }, 450);
    }

    useEffect(() => {
        setShows(true)
        setTimeout(() => {
            removeItem();
        }, 5000);
    }, []);

    return (
        <Fade in={shows}>
            <Box sx={{ padding: '5px 0px' }}>
                <Alert
                    sx={{ backgroundColor: 'white', cursor: 'pointer' }}
                    variant="outlined"
                    severity={props.type}
                    onClick={removeItem}
                >
                    {props.description}
                </Alert>
            </Box>
        </Fade>
    );
}
