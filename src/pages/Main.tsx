import { useEffect, useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import CustomButton from "../components/CustomButton";

export default function Main() {
    const [state, setState] = useState<boolean | null>(null);

    useEffect(() => {
        window.api.receive("unauthorized", () => {
            setState(false);
            window.alert("Received!");
        });

        return () => {
            window.api.removeReceiveListeners("unauthorized");
        };
    }, []);

    return (
        <div>
            <h1 className='text-center'>Welcome</h1>

            {state === null && (
                <h3>Please wait...</h3>
            )}

            {state === true && (
                <div>Logged in!</div>
            )}

            {state === false && (
                <>
                <br />
                    <div className='text-center'>
                        <MdLockOutline style={{ fontSize: "40vw" }} />
                        <p className='text-[#999] mt-5'>Seems like you're not signed in to LastFM! Please sign in to continue.</p>
                    </div>
                    <br />
                    <div className='absolute bottom-3 right-3'>
                        <CustomButton>Sign in to LastFM</CustomButton>
                    </div>
                </>
            )}            
        </div>
    );
}