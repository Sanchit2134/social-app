import "./Navbar.css";
import LOGO from "../../assets/LOGO.svg";
// import { useState, useEffect } from "react";
import { auth, signOut } from "@/config/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from "@mui/material";

const Navbar = (props) => {
    const session = auth()

    return (
        <div className="NAVCONATINER" >
            <div className="left--nav">
                <img
                    src={LOGO}
                    alt=""
                    id="logo"
                    style={{ paddingLeft: "3rem", paddingBottom: ".6rem" }}
                />
                <span id="intro">
                    Welcome
                    <span style={{ paddingLeft: 2, color: "black", width: "400px", fontSize: "14px" }}>
                        &nbsp;{session?.user?.name}
                    </span>
                </span>
            </div>
            <div className="right--nav">
                <form action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <IconButton type="submit" sx={{ color: "white" }}>
                        <ExitToAppIcon
                            id="bg"
                            className="right--nav--items"
                        />
                    </IconButton>
                </form>
            </div>
        </div>
    );
}

export default Navbar;