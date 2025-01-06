export const getInitials = (phrase: string) => {
  return phrase
    ?.split(" ")
    ?.filter((word: string) => word.length > 0)
    ?.map((word: string) => word[0].toUpperCase())
    ?.join("");
};
