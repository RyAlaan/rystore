import clsx from "clsx";

type MessageProps = {
  success: string;
  failed: string;
}

const Message: React.FC<MessageProps> = ({ success, failed }) => {
  return (
    <div
      className={clsx(
        "text-center self-center border-2 rounded-md px-6 py-2",
        success || failed ? "flex" : "hidden",
        success !== "" && "text-green-500 border-green-500",
        failed !== "" && "text-red-500 border-red-500"
      )}
    >
      {success || failed}
    </div>
  );
};

export default Message;
