import React, { useState, useEffect, useRef } from "react";

function AutoTextArea(props) {
  const textAreaRef = useRef(null);
  const divAreaRef = useRef(null);
  const [text, setText] = useState(props.text);
  const [, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);
  };

  const onBlurHandler = () => {
    props.onTextChange(props.unique_key, text, divAreaRef);
  };

  return (
    <div
      style={
        ({
          minHeight: parentHeight,
        },
        props.style)
      }
      ref={divAreaRef}
    >
      <div>
        <textarea
          ref={textAreaRef}
          rows={1}
          style={{
            ...props.textAreaStyles,
            zIndex: 10,
            background: "transparent",
            fontFamily: "helvetica",
            color: "black",
            fontSize: 0,
            borderColor: "transparent",
            resize: "none",
            overflow: "hidden",
          }}
          value={text}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </div>
    </div>
  );
}

export default AutoTextArea;
