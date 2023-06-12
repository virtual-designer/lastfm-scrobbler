import { FC } from "react";
import { MdAdd, MdSettings } from "react-icons/md";
import MainActionCard from "./MainActionCard";

const MainActions: FC = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            <MainActionCard
                title="Import Scrobbles"
                description="Click to get started"
                icon={MdAdd}
            />

            <MainActionCard
                title="Scrobbling Options"
                description="Adjust the scrobbling options"
                icon={MdSettings}
            />
        </div>
    );
};

export default MainActions;
