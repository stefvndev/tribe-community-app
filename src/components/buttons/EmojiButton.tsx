import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { IconMoodSmile } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type EmojiButtonProps = {
  handleEmojiClick: (e: EmojiClickData) => void;
};

const EmojiButton = ({ handleEmojiClick }: EmojiButtonProps) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsEmojiOpen(false);
    }
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEmojiOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative max-sm:hidden">
      <Button
        ref={buttonRef}
        onClick={handleButtonClick}
        variant="ghost"
        className="relative rounded-full w-11 h-11"
        type="button"
      >
        <IconMoodSmile className="!size-5" />
      </Button>
      {isEmojiOpen && (
        <div ref={pickerRef} className="absolute left-0 z-50 mb-1 bottom-full">
          <EmojiPicker
            height={300}
            searchDisabled
            skinTonesDisabled
            emojiStyle={EmojiStyle.APPLE}
            lazyLoadEmojis
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiButton;
