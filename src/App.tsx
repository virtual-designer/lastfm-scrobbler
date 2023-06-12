import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    return (
        <div id="main">
            <ThemeProvider theme={darkTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    );
}
