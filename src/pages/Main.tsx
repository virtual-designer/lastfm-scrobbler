import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineBarChart } from "react-icons/md";
import MainActions from "../components/MainActions";
import MainBottom from "../components/MainBottom";
import NotSignedIn from "../components/NotSignedIn";

export default function Main() {
    const [state, setState] = useState<boolean | null>(null);

    useEffect(() => {
        window.api.receive("configLoad", (config: any) => {
            setState(config?.user ? true : false);
        });

        return () => {
            window.api.removeReceiveListeners("configLoad");
        };
    }, []);

    return (
        <div>
            <h1 className="text-center font-light">
                {state === true ? (
                    <>
                        Welcome back, <span className="text-blue-500">rakinar2</span>!
                    </>
                ) : (
                    state === false ? "Welcome" : "Please wait"
                )}
            </h1>

            <br />

            {state === true ? (
                <>
                    <br />
                    <MainActions />
                    <br />
                    <Card>
                        <CardContent className="text-center">
                            <h1 className="font-semibold flex items-center justify-center gap-2">
                                <MdOutlineBarChart />
                                {(40100).toLocaleString(undefined, {
                                    useGrouping: true,
                                })}
                            </h1>

                            <p className="text-[#999] mt-2">Total scrobbles imported</p>
                        </CardContent>
                    </Card>
                </>
            ) : (
                <NotSignedIn state={state} />
            )}

            <br />
            <MainBottom
                state={state}
                setState={setState}
                absolute={true}
            />
        </div>
    );
}
