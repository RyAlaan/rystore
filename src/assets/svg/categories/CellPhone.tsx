import { svgType } from "@/types/svgType";
import { ReactSVG } from "react";

const CellPhoneSVG : React.FC<svgType> = (props: svgType) => {
  const { width, height, fill, className } = props;

  return (
    <svg
      width={width || "56"}
      height={height || "56"}
      viewBox="0 0 56 56"
      fill={fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_138_1568)">
        <path
          d="M38.9375 6.125H17.0625C15.5523 6.125 14.3281 7.34922 14.3281 8.85938V47.1406C14.3281 48.6508 15.5523 49.875 17.0625 49.875H38.9375C40.4477 49.875 41.6719 48.6508 41.6719 47.1406V8.85938C41.6719 7.34922 40.4477 6.125 38.9375 6.125Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.6666 7H31.1354"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 44.0052V44.0305"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="15.1666"
          y1="39.8333"
          x2="40.8333"
          y2="39.8333"
          stroke="black"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_138_1568">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CellPhoneSVG;
