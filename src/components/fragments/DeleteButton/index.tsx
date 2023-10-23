import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteButton = (
    onClick: () => void,
) => {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon
        icon={faTrash}
        className="bg-secondary text-white p-3 rounded-md"
      ></FontAwesomeIcon>
    </button>
  );
};

export default DeleteButton;
