import { CircularProgress } from "@mui/material";
import { Button } from "@nextui-org/react";

export default function CustomButton({ loading = false, className = "", children, ...props }: any) {
    return (
        <Button
            className={`!scale-[1] hover:!bg-[#0067d4] ${className !== "" ? ` ${className}` : ""}`}
            {...props}
        >
            {loading ? <CircularProgress size={20} /> : children}
        </Button>
    );
}
