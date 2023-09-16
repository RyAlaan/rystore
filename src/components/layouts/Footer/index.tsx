import EmailBox from "@/components/fragments/EmailBox";
import {
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black py-20 px-16 md:px-32 flex gap-y-10 gap-x-20 flex-col-reverse lg:flex-row text-white">
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <h4 className="font-bold text-lg">Exclusive</h4>
        <p>Subscribe</p>
        <p>Get 10% off your first order</p>
        <EmailBox />
      </div>
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <h4 className="font-bold text-lg">Support</h4>
        <p>Alamat</p>
        <p>jasuke@mail.com</p>
        <p>+29 830-7506-1293</p>
      </div>
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <h4 className="font-bold text-lg">Account</h4>
        <Link href={"/"}>MyAccount</Link>
        <p>
          <Link href={"/"}>Login</Link> / <Link href={"/"}>Register</Link>
        </p>
        <Link href={"/"}>Cart</Link>
        <Link href={"/"}>Wishlist</Link>
        <Link href={"/"}>Shop</Link>
      </div>
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <h4 className="font-bold text-lg">Quick Link</h4>
        <Link href={"/"}>Pirvacy Policy</Link>
        <Link href={"/"}>Terms Of Service</Link>
        <Link href={"/"}>FAQ</Link>
        <Link href={"/"}>Contact Us</Link>
      </div>
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        <h4 className="font-bold text-lg">Contact Us</h4>
        <div className="flex justify-between">
          <a target="_blank" href={"https://github.com/ryalaan"}>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a target="_blank" href={"https://twitter.com/ryalaan"}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a target="_blank" href={"https://instagram.com/ryalaan"}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
