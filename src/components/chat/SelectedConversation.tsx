import { useNavigate } from "@tanstack/react-router";

const SelectedConversation = () => {
  const navigate = useNavigate({ from: "/$id" });

  const handleCloseComment = () => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.postId;
        return newSearch;
      },
    });
  };

  return (
    <div
      onClick={handleCloseComment}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen bg-dark-primary/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative overflow-y-auto w-full max-md:mt-0 max-md:rounded-none h-[calc(100vh-64px)] mx-auto max-w-[790px] mt-16 rounded-b-none rounded-lg"
      ></div>
    </div>
  );
};

export default SelectedConversation;
