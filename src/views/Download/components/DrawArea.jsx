import React, { useState, useEffect, useRef, useCallback } from "react";
import Immutable from "immutable";

function DrawArea(props) {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [redoEl, setRedoEl] = useState([]);
  const [isCrosshair, setIsCrosshair] = useState(false);
  const drawAreaEl = useRef(null);
  const { flag, changeFlag } = props;
  const { buttonType, resetButtonType } = props;

  useEffect(() => {
    document
      .getElementById("drawArea")      
    props.getBounds({
      x: drawAreaEl.current.getBoundingClientRect().left,
      y: drawAreaEl.current.getBoundingClientRect().bottom,
    });
    return () => {
      document
        .getElementById("drawArea")        
    };// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flag === "undo") {
      setRedoEl((arr) => [...arr, lines.pop()]);
      setLines(lines);
    }
    if (flag === "redo") {
      setLines((lines) => [...lines, redoEl.pop()]);
    }
    changeFlag();
  }, [flag, lines, redoEl, changeFlag]);
    

  useEffect(() => {
    const { getPaths } = props;
    if (isDrawing === false && lines.length) {      
      getPaths(lines[lines.length - 1]);
    } 
  }, [isDrawing, lines, props]); 

    const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) {
      return;
    }
    const point = relativeCoordinatesForEvent(e);
    let obj = {
      arr: [point],
      page: props.page,
      type: "freehand",
    };
    setLines((prevlines) => [...prevlines, obj]);
    setIsDrawing(true);
  },[props]);

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const point = relativeCoordinatesForEvent(e);
    let last = lines.pop();
    last.arr.push(point);
    setLines((prevlines) => [...prevlines, last]);
  };

  const relativeCoordinatesForEvent = (e) => {
    const boundingRect = drawAreaEl.current.getBoundingClientRect();
    return new Immutable.Map({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    });
  };

  const addMouseDown = useCallback(() => {
    setIsCrosshair(true);
    document
      .getElementById("drawArea")
      .addEventListener("mousedown", handleMouseDown, { once: true });
  }, [handleMouseDown]);

  useEffect(() => {
    if (buttonType === "draw") {
      addMouseDown();
      resetButtonType();
    }
  }, [buttonType, resetButtonType, addMouseDown]);  

  return (
    <>
      <div
        id="drawArea"
        ref={drawAreaEl}
        style={isCrosshair ? { cursor: "crosshair" } : { cursor: props.cursor }}
        onMouseMove={handleMouseMove}
      >
        {props.children}
        <Drawing lines={lines} page={props.page} />
      </div>
    </>
  );
}

function Drawing({ lines, page }) {
  return (
    <svg className="drawing" style={{ zIndex: 10 }}>
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} page={page} />
      ))}
    </svg>
  );
}

function DrawingLine({ line, page }) {
  const pathData =
    "M " +
    line.arr
      .map((p) => {
        return `${p.get("x")},${p.get("y")}`;
      })
      .join(" L ");

  if (line.page === page) {
    return <path className="path" d={pathData} />;
  }
  return null;
}

export default DrawArea;
