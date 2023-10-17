import CameraSVG from "@/assets/svg/categories/Camera";
import CellPhoneSVG from "@/assets/svg/categories/CellPhone";
import ComputerSVG from "@/assets/svg/categories/Computer";
import GamepadSVG from "@/assets/svg/categories/Gamepad";
import HeadphoneSVG from "@/assets/svg/categories/Headphone";
import SmartwatchSVG from "@/assets/svg/categories/SmartWatch";
import Link from "next/link";
import { useState } from "react";

const Tile = (props: {
  href: string;
  children: React.ReactNode;
  title: string;
}) => {
  const { href, children, title } = props;

  return (
    <Link href={href}>
      <div
        className={`w-44 h-36 rounded-lg border-2 flex flex-col justify-center items-center  hover:bg-secondary hover:border-secondary group`}
      >
        {children}
        <p className="group-hover:text-white">{title}</p>
      </div>
    </Link>
  );
};

export default Tile;