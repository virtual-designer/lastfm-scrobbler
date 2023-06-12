import { MenuList, Tooltip } from "@mui/material";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { routes } from "../router";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    const { pathname: currentPath } = useLocation();
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={"relative h-[100vh] px-3 mr-3 bg-[#1f1e1e] " + (!expanded ? "w-[50px]" : "w-[20em]")}>
            <MenuList className="relative h-[100%] !p-0">
                <div className="mb-[10px] pt-4">
                    <Tooltip
                        title="Toggle Menu"
                        enterDelay={1200}
                    >
                        <div className="inline-block">
                            <SidebarItem
                                onClick={() => setExpanded((s) => !s)}
                                Icon={MdMenu}
                                expanded={false}
                                topIcon={true}
                                style={{ marginTop: 0, marginBottom: 0 }}
                            />
                        </div>
                    </Tooltip>
                </div>
                {routes.map(({ icon, path, title }, index) => (
                    <SidebarItem
                        expanded={expanded}
                        key={index}
                        title={title}
                        Icon={icon}
                        active={path === currentPath}
                        bottom={path === "/settings"}
                    />
                ))}
            </MenuList>
        </div>
    );
}
