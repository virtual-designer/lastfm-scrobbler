import { FC, useState } from "react";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import CustomButton from "./CustomButton";

interface MainBottomProps {
    state: boolean | null;
    setState: React.Dispatch<React.SetStateAction<boolean | null>>;
    absolute?: boolean;
}

const MainBottom: FC<MainBottomProps> = ({ state, absolute, setState }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={absolute ? "absolute bottom-3 right-3" : ""}>
            {state !== null && (
                <CustomButton
                    size="sm"
                    onPress={() => {
                        if (isLoading) {
                            return;
                        }

                        if (state === false) {
                            console.log("Here");
                            window.api.send("openAuthScreen");
                            window.api.receive("authScreenComplete", (token: string) => {
                                console.log("Token", token);
                                setIsLoading(false);
                                setState(true);
                                window.api.removeReceiveListeners("authScreenComplete");
                            });

                            setIsLoading(true);
                        } 
                        else if (state === true) {
                            console.log("Sign out");                            
                            setIsLoading(true);
                            
                            window.api.receive("signOutComplete", () => {
                                setIsLoading(false);
                                setState(false);
                                window.api.removeReceiveListeners("signOutComplete");
                            });

                            window.api.send("signOut");
                        }
                    }}
                    loading={isLoading}
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
