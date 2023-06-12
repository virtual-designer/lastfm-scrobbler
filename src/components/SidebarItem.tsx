import { Button, styled } from "@mui/material";
import { MdQuestionMark } from "react-icons/md";

export default function SidebarItem({
    active = false,
    Icon = MdQuestionMark,
    title = "[No title]",
    expanded = false,
    topIcon = false,
    bottom = false,
    ...props
}) {
    const MenuButton = styled(Button)({
        minWidth: 0,
        margin: "10px 0",
        ":hover": {
            background: "rgba(255, 255, 255, 0.25)",
        },
        ...(!topIcon
            ? {
                  width: "100%",
              }
            : {}),
        textTransform: "none",
        ...(active
            ? {
                  background: "rgba(255, 255, 255, 0.3)",
              }
            : {}),
        ...(expanded
            ? {
                  textAlign: "left",
                  justifyContent: "flex-start",
              }
            : {}),
        ...(bottom
            ? {
                  position: "absolute",
                  bottom: 10,
                  left: 0,
              }
            : {}),
    });

    return (
        <MenuButton
            color="inherit"
            {...props}
        >
            <Icon size={30} />

            {expanded && <span className="pl-3 pr-2">{title}</span>}
        </MenuButton>
    );
}
