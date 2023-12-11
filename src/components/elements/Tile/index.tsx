import Link from "next/link";

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