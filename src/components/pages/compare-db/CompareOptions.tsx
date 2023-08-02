import AbcIcon from '@mui/icons-material/Abc';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import { Fab, Tooltip } from "@mui/material";
import { useState } from "react";

interface CompareOptionsProps {
    default?: { [key: string]: boolean };
    onOptionChange?: (data: { [key: string]: boolean }) => void;
}

export const CompareOptions: React.FC<CompareOptionsProps> = (props) => {

    const [options, setOptions] = useState<{ [key: string]: boolean }>(props.default ?? {});

    const { caseSensitive, compareSpace } = options;

    const handleOptionsChange = (key: string) => {
        setOptions(pred => {
            let result = { ...pred, [key]: !pred[key] };
            props.onOptionChange(result)
            return result;
        })
    };

    return (<>
        <Tooltip title="Compare Space">
            <Fab size="medium" color="primary" aria-label="compare-space" onClick={() => handleOptionsChange('compareSpace')}>
                <SpaceBarIcon sx={{ opacity: !compareSpace && '0.2' }} />
            </Fab>
        </Tooltip>
        <Tooltip title="Case Sensitive">
            <Fab size="medium" color="primary" aria-label="case-sensitive" onClick={() => handleOptionsChange('caseSensitive')}>
                <AbcIcon fontSize="large" sx={{ opacity: !caseSensitive && '0.2' }} />
            </Fab>
        </Tooltip>
    </>)
}