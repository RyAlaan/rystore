import Link from "next/link"

const Header = () =>{
    return (
      <div className="lg:px-32 ld:py-20 flex justify-between items-center">
        <p>
          <Link href={"/"} className="font-light text-tertiary">
            Home
          </Link>
          / 
          <Link href={"/profile"} className="font-light">
            Profile
          </Link>
        </p>
      </div>
    );
}

export default Header