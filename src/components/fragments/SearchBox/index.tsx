import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import clsx from "clsx";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox = (props: { className?: string, placeholder :string }) => {
  const { className, placeholder } = props;

  return (
    <form
      action="POST"
      className={clsx(
        className,
        "flex overflow-hidden flex-row text-sm max-w-sm",
      )}
    >
      <Button type="submit" className="bg-white rounded-none px-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-primary" />
      </Button>
      <Input
        type="text"
        placeholder={placeholder}
        className="rounded-none py-1 w-full max-w-sm"
      />
    </form>
  );
};

export default SearchBox;
