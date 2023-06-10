import { Alert } from "@mui/material";

export default function Main() {
    return (
        <div>
            <h1>LastFM Scrobbler</h1>
            <br />
            <Alert severity="warning" variant="filled">Looks like you're not signed into Spotify! Please sign in to import scrobbles.</Alert>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button style={{
                padding: "10px 15px",
                fontSize: 16,
                borderRadius: 5,
            }} className="focus:outline-double focus:outline-2 focus:outline-slate-400 cursor-pointer border-0 text-white bg-[#444] hover:bg-[#333]">Sign in to Spotify</button>
        </div>
    );
}