import { AlertColor } from "@mui/material";
import { alertSubject } from "../context/AlertContext";

/**
 * 常用的全域Context，不需要import一堆東西
 * 並且使用callBack function時不會導致reRender期間component被重繪
 */
export const useGlobalContext = () => {

    return {
        /**
         * 系統訊息
         */
        sendAlert: (description: string, type?: AlertColor, distinct?: boolean) => {
            alertSubject.next({ description, type, distinct });
        },
    };
};