import clsx from "clsx";

type MessageProps = {
  success: string;
  failed: string;
}

const Message = (props : MessageProps) => {
  const { success, failed } = props;  

  return (
    <div
      className={clsx(
        "text-center self-center border-2 rounded-md px-6 py-2 w-full justify-center z-50",
        success || failed ? "flex" : "hidden",
        success !== "" && "text-green-500 border-green-500",
        failed !== "" && "text-red-500 border-red-500"
      )}
    >
      <p>{success || failed}</p>
    </div>
  );
};

export default Message;
