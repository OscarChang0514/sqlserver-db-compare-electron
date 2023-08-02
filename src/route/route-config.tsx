import { lazy } from "react";

export const routeConfig = [
    {
        path: "/home",
        name: "Home",
        Element: lazy(() => import("../pages/home/Home").then(({ Home }) => ({
            default: Home,
        }))),
    },
    {
        path: "/compareDbSchema",
        name: "Compare Schema",
        Element: lazy(() => import("../pages/compare-db-schema/CompareDbSchemaPage").then(({ CompareDbSchemaPage }) => ({
            default: CompareDbSchemaPage,
        }))),
    },
    {
        path: "/compareDbData",
        name: "Compare Data",
        Element: lazy(() => import("../pages/compare-db-data/CompareDbDataPage").then(({ CompareDbDataPage }) => ({
            default: CompareDbDataPage,
        }))),
    },
]