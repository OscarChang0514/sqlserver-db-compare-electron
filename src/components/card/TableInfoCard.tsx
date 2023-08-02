import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Card, CardContent, Collapse, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import { TableInfo } from '../../model/db-info';

interface TableInfoCardProps {
    readonly?: boolean;
    tableInfo: TableInfo;
    onChange: (tableInfo: TableInfo) => void;
    onDelete: () => void;
}

export const TableInfoCard: React.FC<TableInfoCardProps> = (props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDeleteClick = () => {
        setIsOpen(false);
        setTimeout(() => props.onDelete(), 500)
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange({ ...props.tableInfo, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setIsOpen(true);
    }, [])

    return (
        <Collapse in={isOpen}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField required
                                variant="standard" label="TableName" name="tableName"
                                disabled={props.readonly}
                                value={props.tableInfo.tableName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ flex: 1 }} />
                                {!props.readonly &&
                                    <Tooltip title="Delete">
                                        <IconButton onClick={handleDeleteClick} >
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required fullWidth
                                variant="standard" label="Columns" name="columns"
                                disabled={props.readonly}
                                value={props.tableInfo.columns}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField multiline fullWidth
                                variant="standard" label="Where..." name="whereSql"
                                disabled={props.readonly}
                                value={props.tableInfo.whereSql}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Collapse>
    )
}