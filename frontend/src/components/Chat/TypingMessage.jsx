import { useEffect, useState, useRef } from "react";

const TypingMessage = ({ content, onComplete }) => {
  const [text, setText] = useState("");

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setText(content.slice(0, index));

      if (index >= content.length) {
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content]);

  return <>{text}</>;
};

export default TypingMessage;