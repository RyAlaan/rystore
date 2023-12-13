const useInitial = (name: string) => {
  const words = name.split(" ");
  const totalWords = words.length;
  let initial = "";

  if (totalWords === 1) {
    initial = words[0].charAt(0).toUpperCase();
  } else if (totalWords === 2) {
    initial =
      words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else {
    initial =
      words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }

  return initial;
};

export default useInitial;
