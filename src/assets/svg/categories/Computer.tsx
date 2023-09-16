import { svgType } from "@/types/svgType";

const ComputerSVG: React.FC<svgType> = (props: svgType) => {
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
      <g clipPath="url(#clip0_138_1573)">
        <path
          d="M46.6667 9.33331H9.33333C8.04467 9.33331 7 10.378 7 11.6666V35C7 36.2886 8.04467 37.3333 9.33333 37.3333H46.6667C47.9553 37.3333 49 36.2886 49 35V11.6666C49 10.378 47.9553 9.33331 46.6667 9.33331Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3333 46.6667H39.6666"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 37.3333V46.6666"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 37.3333V46.6666"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 32H48"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_138_1573">
          <rect width="56" height="56" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ComputerSVG;
