import { useState } from "react";

type ShowText = {
  textShow: string;
  isShowMore: boolean;
  toggleText: () => void;
};

const useShowText = (initialText: string): ShowText => {
  const [textShow, setTextShow] = useState<string>(initialText.slice(0, 100) + "...")
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const toggleText = () => {
    setIsShowMore(!isShowMore);
    if (!isShowMore) {
      setTextShow(initialText);
    } else {
      setTextShow(initialText.slice(0, 100) + "...");
    }
  };

  return { textShow, isShowMore, toggleText };
};

export default useShowText;
