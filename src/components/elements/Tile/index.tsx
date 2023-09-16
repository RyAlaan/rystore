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
        className={`w-44 h-36 rounded-lg border-2 flex flex-col justify-center items-center  hover:bg-secondary `}
      >
        {children}
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default Tile;


// const Tile = () => {
//   const [hoverStates, setHoverStates] = useState(Array(6).fill(false));

//   const icons = [
//     {
//       i: <CameraSVG isHover={hoverStates[0]} />,
//       title: "Camera",
//       href: "/camera",
//     },
//     {
//       i: <CellPhoneSVG isHover={hoverStates[1]} />,
//       title: "SmartPhone",
//       href: "/smartPhone",
//     },
//     {
//       i: <ComputerSVG isHover={hoverStates[2]} />,
//       title: "Computer",
//       href: "/computer",
//     },
//     {
//       i: <GamepadSVG isHover={hoverStates[3]} />,
//       title: "Gamepad",
//       href: "/gamepad",
//     },
//     {
//       i: <HeadphoneSVG isHover={hoverStates[4]} />,
//       title: "Headphone",
//       href: "/headphone",
//     },
//     {
//       i: <SmartwatchSVG isHover={hoverStates[5]} />,
//       title: "SmartWatch",
//       href: "/smartWatch",
//     },
//   ];

//   const handleMouseEnter = (index: number) => {
//     const newHoverStates = [...hoverStates];
//     newHoverStates[index] = true;
//     setHoverStates(newHoverStates);
//   };

//   const handleMouseLeave = (index: number) => {
//     const newHoverStates = [...hoverStates];
//     newHoverStates[index] = false;
//     setHoverStates(newHoverStates);
//   };

//   return (
//     <div className="flex flex-row gap-x-6 py-8">
//       {icons.map((icon, index) => (

//       ))}
//     </div>
//   );
// };

