import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { ICodeDiffProps } from "react-code-diff-lite";
import { DatabaseDiffInfo } from "../../../model/db-info";
import { CollapseComparedTableRow } from "./CollapseComparedTableRow";

const HeaderRow = styled(TableRow)({
    '& > *': { fontSize: '1rem', fontWeight: 'bolder' }
});

interface DatabaseComparedTableProps {
    rows?: DatabaseDiffInfo[];
    options?: ICodeDiffProps;
}

export const DatabaseComparedTable: React.FC<DatabaseComparedTableProps> = (props) => {

    const { rows } = props;

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        rows.length === 0 && setPage(0);
    }, [rows.length])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <HeaderRow>
                        <TableCell />
                        <TableCell colSpan={2}>Object Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell colSpan={2}>Message</TableCell>
                    </HeaderRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <CollapseComparedTableRow
                            key={row.objName}
                            row={row}
                            options={props.options}
                        />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}

DatabaseComparedTable.defaultProps = {
    rows: [],
    options: {}
}