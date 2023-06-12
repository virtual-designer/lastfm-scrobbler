import { FC } from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import CustomButton from "./CustomButton";

interface MainBottomProps {
    state: boolean | null;
    setState: React.Dispatch<React.SetStateAction<boolean | null>>;
    absolute?: boolean;
}

const MainBottom: FC<MainBottomProps> = ({ state, absolute, setState }) => {
    return (
        <div className={absolute ? "absolute bottom-3 right-3" : ""}>
            {state !== null && (
                <CustomButton
                    className="flex items-center justify-between"
                    onClick={() => {
                        setState((s) => (s !== null ? !s : s));
                    }}
                >
                    {state === true && (
                        <>
                            <MdLogout className="mr-3" />
                            <span>Sign out</span>
                        </>
                    )}

                    {state === false && (
                        <>
                            <MdAccountCircle className="mr-3" />
                            <span>Sign in to LastFM</span>
                        </>
                    )}
                </CustomButton>
            )}
        </div>
    );
};

export default MainBottom;
