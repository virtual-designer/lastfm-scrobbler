import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
    return (
        <div id="main">
            <RouterProvider router={router} />
        </div>
    );
}
