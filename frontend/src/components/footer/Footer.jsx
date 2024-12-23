import React from "react";
import { Link } from "react-router-dom";

const links = [
    { title: "Home", path: "/" },
];

const Footer = () => {
    return (
        <div className=" w-full bg-[#120a2e] text-gray-500">
            <div className="navBarPadding containerDiv flex flex-col justify-around items-center  mx-auto h-[200px] px-4 w-full ">
                <div className="flex flex-col min-[560px]:flex-row   justify-between w-full gap-5 my-2">
                    <div className="flex justify-center font-bold text-[26px]">CC APP</div>
                    <div className="flex justify-center items-center gap-4">
                        {links.map((link) => (
                            <Link
                                to={link.path}
                                key={link.title}
                                className="font-[500] text-[20px] text-gray-500"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center items-center font-[500] text-[20px]">
                        Comming Soon
                    </div>
                </div>
                <div >
                    <p> © Argun | All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;