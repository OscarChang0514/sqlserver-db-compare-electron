
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Card, CardContent, Collapse, Divider, styled, TextField, Typography } from "@mui/material";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useGlobalContext } from '../../hook/useGlobalContext';
import { TableInfo } from '../../model/db-info';

const StatusButton = styled(Button)({
    transitionDuration: '0.8s',
    borderRadius: '50px',
    justifyContent: 'center'
});

interface ConnectionPoolCardProps {
    title?: string;
    label?: string;
    onDbInfoCollected?: (data: any) => void;
    dataComporeMode?: boolean;
    tableInfosRef?: MutableRefObject<TableInfo[]>;
}

export const ConnectionPoolCard: React.FC<ConnectionPoolCardProps> = (props) => {

    const formRef = useRef<any>(null);

    const [status, setStatus] = useState<number>(0);

    const [defaultValue, setDefaultValue] = useState<{ loaded?: boolean, data?: any }>({});

    const [topTitle, setTopTitle] = useState<string>('-');

    const { sendAlert } = useGlobalContext();

    const collectionStatus: any = [
        { variant: 'outlined', color: 'info', text: 'Collect Schema' },
        { variant: 'outlined', color: 'secondary', text: 'Collecting...' },
        { variant: 'contained', color: 'success', text: <>Collected &nbsp; <CheckIcon /></> },
        { variant: 'outlined', color: 'error', text: 'Error' },
    ];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if ([0, 3].includes(status)) {
            if (props.dataComporeMode && (props.tableInfosRef?.current.length ?? 0) === 0) {
                sendAlert('Compare at least one table', 'warning');
            } else {
                setStatus(1);
                getDbInfo({
                    host: e.target[1].value,
                    databaseName: e.target[2].value,
                    userName: e.target[3].value,
                    pwd: e.target[4].value,
                    tableInfos: props.tableInfosRef?.current ?? []
                })
                valueStore({
                    host: e.target[1].value,
                    databaseName: e.target[2].value,
                    userName: e.target[3].value,
                    pwd: e.target[4].value,
                });
            }
        }
    }


    const getDbInfo = async (data: any) => {
        try {
            let channel = props.dataComporeMode ? "get-db-data" : "get-db-schema";

            let res = await window.electron?.invoke(channel, data);
            if (!res.message) {
                setTopTitle(data.host + ' - ' + data.databaseName)
                setStatus(2);
                props.onDbInfoCollected(res);
            } else {
                setStatus(3);
                console.error(res);
                sendAlert(res?.message, 'error');
            }
        } catch (err) {
            setStatus(3);
            console.error(err);
            sendAlert('some bad things happened, check console to see detail', 'error');
        }
    };

    const valueGet = async () => {
        return await window.electron?.invoke('get-storage-data', 'connection-pool' + props.label);
    };

    const valueStore = async (data: any) => {
        await window.electron?.invoke('set-storage-data', 'connection-pool' + props.label, data);
    };

    useEffect(() => {
        valueGet().then(data => {
            setDefaultValue({ loaded: true, data: data ?? {} })
        })
    }, [])

    return (
        <Card>
            <CardContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {topTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" component="div" noWrap>
                            {props.title}
                        </Typography>
                        <Box sx={{ flex: 1 }} />
                        <StatusButton
                            type={'submit'}
                            variant={collectionStatus[status].variant}
                            color={collectionStatus[status].color}
                        >
                            {collectionStatus[status].text}
                        </StatusButton>
                    </Box>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.label}
                    </Typography>
                    <Collapse in={status !== 2} timeout={600}>
                        <Divider />
                        {defaultValue.loaded &&
                            <Box sx={{ display: 'grid', gap: '10px', margin: '10px 0' }}>
                                <Box>
                                    <TextField required variant="standard" label="Host" name="host"
                                        defaultValue={defaultValue?.data?.host ?? ""}
                                    />
                                </Box>
                                <Box>
                                    <TextField required variant="standard" label="Database Name" name="databaseName"
                                        defaultValue={defaultValue?.data?.databaseName ?? ""}
                                    />
                                </Box>
                                <Box>
                                    <TextField required variant="standard" label="UserName" name="userName"
                                        defaultValue={defaultValue?.data?.userName ?? ""}
                                    />
                                </Box>
                                <Box>
                                    <TextField required variant="standard" type="password" label="Pwd" name="pwd"
                                        defaultValue={defaultValue?.data?.pwd ?? ""}
                                    />
                                </Box>
                            </Box>
                        }
                    </Collapse>
                </form>
            </CardContent>
        </Card>
    )
}