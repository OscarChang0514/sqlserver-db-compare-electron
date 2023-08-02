
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Container, Divider, Fab, Fade, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { ConnectionPoolCard } from '../../components/card/ConnectionPoolCard';
import { CompareOptions } from '../../components/pages/compare-db/CompareOptions';
import { DatabaseComparedTable } from '../../components/table/databaseComoparedTable/DatabaseComoparedTable';
import { useGlobalContext } from '../../hook/useGlobalContext';
import { DatabaseDiffInfo, DatabaseObjInfo } from '../../model/db-info';
import { compareDbDiff } from '../../util/compare-db';


interface CompareDbSchemaPageProps {

}

export const CompareDbSchemaPage: React.FC<CompareDbSchemaPageProps> = () => {

    const dbInfoRef = useRef<{ source?: DatabaseObjInfo[], target?: DatabaseObjInfo[] }>({});

    const optionsRef = useRef<{ [key: string]: boolean }>({ compareSpace: true });

    const isComparingRef = useRef<boolean>(false);

    const { sendAlert } = useGlobalContext();

    const [compareRes, setCompareRes] = useState<DatabaseDiffInfo[]>([]);

    const [showResult, setShowResult] = useState<boolean>(false);

    const handleDbInfoCollected = (data: any, key: string) => {
        key === 'source' && (dbInfoRef.current.source = data.dbObj);
        key === 'target' && (dbInfoRef.current.target = data.dbObj);
    };

    const handleClear = async () => {
        setShowResult(false);
        setTimeout(() => setCompareRes([]), 600);
    };

    const startCompare = async () => {
        if (!(dbInfoRef.current.source && dbInfoRef.current.target)) {
            sendAlert('Please confirm that the data collection is complete', 'warning');
        } else {
            isComparingRef.current = true;
            let { source, target } = dbInfoRef.current;
            let options = optionsRef.current;
            setCompareRes(compareDbDiff(source, target, options));
            isComparingRef.current = false;
            setShowResult(true);
        }
    };

    return (<>
        <Container maxWidth="lg">
            <Typography variant="h6" noWrap>
                Conntion pools
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ padding: '20px 0' }} columns={{ xs: 6, sm: 12, md: 12 }} >
                <Grid item xs={6}>
                    <ConnectionPoolCard
                        title={'Source DB'}
                        label={'source'}
                        onDbInfoCollected={data => handleDbInfoCollected(data, 'source')}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ConnectionPoolCard
                        title={'Target DB'}
                        label={'target'}
                        onDbInfoCollected={data => handleDbInfoCollected(data, 'target')}
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" noWrap>
                Options
            </Typography>
            <Divider />
            <Stack direction="row" spacing={2} sx={{ padding: '20px 0' }}>
                <CompareOptions default={optionsRef.current} onOptionChange={data => (optionsRef.current = data)} />
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Clear">
                    <Fab size="medium" color="primary" aria-label="clean" onClick={handleClear}>
                        <CleaningServicesIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Start Compare">
                    <Fab size="medium" color="success" aria-label="compare" onClick={startCompare}>
                        <PlayArrowIcon />
                    </Fab>
                </Tooltip>
            </Stack>
            <Fade in={showResult} unmountOnExit >
                <Box>
                    <Typography variant="h6" noWrap>
                        Compare result
                    </Typography>
                    <Divider />
                    <Box sx={{ padding: '20px 0' }}>
                        <DatabaseComparedTable rows={compareRes} options={{ context: 5 }} />
                    </Box>
                </Box>
            </Fade>
        </Container>
    </>)
}