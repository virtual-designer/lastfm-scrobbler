import { Card, CardContent } from "@mui/material";
import { FC } from "react";
import { IconType } from "react-icons";

interface MainActionCardProps {
    title: string;
    icon: IconType;
    description?: string;
}

const MainActionCard: FC<MainActionCardProps> = ({ title, icon: Icon, description }) => {
    return (
        <Card
            tabIndex={1}
            className="cursor-pointer hover:outline focus:outline-double hover:outline-2 hover:outline-gray-500 focus:outline-2 focus:outline-gray-400"
        >
            <CardContent className="text-center">
                <h2 className="font-normal">{title}</h2>
                <Icon
                    size={50}
                    className="py-[1.3em]"
                />
                {description && <p className="text-[#999]">{description}</p>}
            </CardContent>
        </Card>
    );
};

export default MainActionCard;
