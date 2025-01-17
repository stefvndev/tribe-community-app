import { IconX } from "@tabler/icons-react";
import { getPocketBaseFileUrl } from "@/lib/getPocketBaseFileUrl";
import { TPost } from "@/types/types";

type TFullScreenPreview = {
  data?: TPost;
  handleShowMedia: () => void;
};

const FullScreenMediaPreview = ({
  data,
  handleShowMedia,
}: TFullScreenPreview) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-black/70">
      <button
        onClick={handleShowMedia}
        type="button"
        className="absolute top-4 left-4 z-[60] text-white"
      >
        <IconX size={36} />
      </button>
      {data?.media && (
        <div className="z-[60] flex max-w-[80%] max-h-[80vh] max-sm:max-h-[50vh] h-full">
          <img
            alt="post attachement"
            src={getPocketBaseFileUrl({
              recordId: data?.id,
              filename: data?.media,
              collectionName: data?.collectionName,
            })}
            className="object-cover w-full h-full border rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
};

export default FullScreenMediaPreview;
