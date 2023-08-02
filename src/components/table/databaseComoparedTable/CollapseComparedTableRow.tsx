import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import CodeDiff, { ICodeDiffProps } from "react-code-diff-lite";
import { DatabaseDiffInfo } from '../../../model/db-info';


const ColumnRow = styled(TableRow)({
    '& > *': { borderBottom: 'unset' }
});

const CodeDiffContainer = styled(Box)({
    '.d2h-diff-table tr': { position: 'relative' },
    '.d2h-files-diff': { overflowY: 'overlay', overflowX: 'hidden', maxHeight: '500px' },
    '.d2h-file-diff': { overflowY: 'overlay', overflowX: 'hidden', maxHeight: '500px' }
});

interface CollapseComparedTableRowProps {
    row: DatabaseDiffInfo;
    options?: ICodeDiffProps;
    diffContext?: number;
}

export const CollapseComparedTableRow: React.FC<CollapseComparedTableRowProps> = (props) => {

    const { row } = props;

    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <ColumnRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell colSpan={2}>
                    <Typography variant="body1" noWrap>
                        {row.objName}
                    </Typography>
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell colSpan={2}>{row.message}</TableCell>
            </ColumnRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout={600} unmountOnExit>
                        <CodeDiffContainer sx={{ margin: 1 }}>
                            <CodeDiff
                                {...props.options}
                                oldStr={row.definition?.source ?? ''}
                                newStr={row.definition?.target ?? ''}
                                outputFormat={row.definition?.source && row.definition?.target ? "side-by-side" : "line-by-line"}
                            />
                        </CodeDiffContainer>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}