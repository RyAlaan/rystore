import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import clsx from "clsx";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox = (props: { className?: string }) => {
  const { className } = props;

  return (
    <form
      action="POST"
      className={clsx(
        "flex overflow-hidden rounded-md flex-row text-sm",
        className
      )}
    >
      <Button type="submit" className="bg-white rounded-none px-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-primary" />
      </Button>
      <Input
        type="text"
        placeholder="What are you looking for?"
        className="rounded-none py-1 w-fit"
      />
    </form>
  );
};

export default SearchBox;
