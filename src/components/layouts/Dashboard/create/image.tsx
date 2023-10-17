  import { useState } from "react";

const CreateIamgeLayout = () => {
  const [message, setMessage] = useState("")


  return (
    <div className="px-10 mt-10">
      {message && (
        <div className="w-fit rounded-md text-green-600 self-center px-10 py-2 border-2 border-green-500">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CreateIamgeLayout;
