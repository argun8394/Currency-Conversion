import React from "react";
import Links from "./links/Links";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full fixed top-0 z-[10] ">
            <div className=" flex flex-col justify-around items-center bg-[#120a2e]  text-white h-[80px] mx-auto  w-full ">
                <div className="navBarPadding containerDiv flex justify-between items-center w-full ">
                    <div>
                        <Link
                            to="/" >
                            <h2 className="text-[28px] font-[600]">Currency Coversion APP</h2>
                        </Link>
                    </div>                    
                    <div>
                        <Links />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;