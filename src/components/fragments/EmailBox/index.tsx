import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const EmailBox = (props: { className?: string }) => {
  const { className } = props;

  return (
    <form
      action="POST"
      className={clsx(
        "flex overflow-hidden rounded-md flex-row border-2 text-sm border-black",
        className
      )}
    >
      <Input
        type="email"
        placeholder="Enter Your Email"
        className="rounded-none py-2 px-3 w-full"
      />
      <Button type="submit" className="bg-white rounded-none px-2">
        <FontAwesomeIcon icon={faPaperPlane} className="text-black" />
      </Button>
    </form>
  );
};

export default EmailBox;
