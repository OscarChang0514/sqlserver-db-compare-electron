import React, { Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { routeConfig } from "./route-config";

export const RootRouter: React.FC = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {routeConfig.map(({ path, Element }) =>
                        <Route key={path} path={path} element={
                            <Suspense fallback={<>...</>}>
                                <Element />
                            </Suspense>
                        } />
                    )}
                    <Route path="/*" element={<Navigate to="/home" replace />} />
                </Route>
                <Route index element={<Navigate to="/home" />} />
            </Routes>
        </HashRouter>
    );
}