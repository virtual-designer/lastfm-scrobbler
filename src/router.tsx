import { MdAccountCircle, MdHome, MdSearch, MdSettings } from "react-icons/md";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";

export const routes = [
    {
        path: "/",
        element: <Main />,
        icon: MdHome,
        title: "Home"
    },
    {
        path: "/search",
        element: <Main />,
        icon: MdSearch,
        title: "Search"
    },
    {
        path: "/account",
        element: <Main />,
        icon: MdAccountCircle,
        title: "Account"
    },
    {
        path: "/settings",
        element: <Main />,
        icon: MdSettings,
        title: "Settings"
    },
];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: routes
    }
]);