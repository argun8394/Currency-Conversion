"use client";

import React from "react";
import styles from "./navLink.module.css";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ item }) => {

    let location = useLocation();
    let pathName = location.pathname

    return (
        <Link
            to={item.path}
            className={`${styles.container} ${pathName === item.path && styles.active
                }`}
        >
            {item.title}
        </Link>
    );
};

export default NavLink;