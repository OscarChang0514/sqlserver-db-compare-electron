import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { LayoutNavbar } from "./LayoutNavbar";

const PageContainer = styled(Box)({
    padding: '40px',
    display: 'flex',
    justifyContent: 'center'
});

export const Layout: React.FC = () => {

    return (<>
        <LayoutNavbar />
        <PageContainer>
            <Outlet />
        </PageContainer>
    </>);
}