import { LinearProgress } from "@mui/material";
import { FC } from "react";
import { MdLockOutline } from "react-icons/md";

interface NotSignedInProps {
    state: boolean | null;
}

const NotSignedIn: FC<NotSignedInProps> = ({ state }) => {
    return (
        <div className="text-center">
            {state === false && <MdLockOutline style={{ fontSize: "40vw" }} />}
            {state === null && (
                <div className="mx-auto w-[40vw] py-4">
                    <LinearProgress color="inherit" />
                </div>
            )}
            <p className="text-[#999] mt-5">
                {state === false && "Seems like you're not signed in to LastFM! Please sign in to continue."}
                {state === null && "We're working..."}
            </p>
        </div>
    );
};

export default NotSignedIn;
