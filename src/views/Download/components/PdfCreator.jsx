import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";

import samplePDF from "./Pdf/na.pdf";
import SinglePage from "./SinglePage";
import ModifyPage from "./ModifyPage";
import AutoTextArea from "./AutoTextArea";
import { Context } from "../../../routers/App";

const getTextAreaStyles = (pos) => {
  if (pos.x === 122 && pos.y === 237) {
    return {
      width: "175px",
      height: "12px",
    };
  } else if (pos.x === 308 && pos.y === 243) {
    return {
      width: "260px",
      height: "42px",
    };
  } else if (pos.x === 135 && pos.y === 253) {
    return {
      width: "160px",
      height: "33px",
    };
  } else if (pos.x === 200 && pos.y === 292) {
    return {
      width: "365px",
      height: "23px",
    };
  } else if (pos.x === 153 && pos.y === 319) {
    return {
      width: "37px",
      height: "22px",
    };
  } else if (pos.x === 262 && pos.y === 319) {
    return {
      width: "59px",
      height: "22px",
    };
  } else if (pos.x === 400 && pos.y === 319) {
    return {
      width: "49px",
      height: "22px",
    };
  } else if (pos.x === 507 && pos.y === 319) {
    return {
      width: "61px",
      height: "22px",
    };
  } else if (pos.x === 107 && pos.y === 346) {
    return {
      width: "85px",
      height: "38px",
    };
  } else if (pos.x === 263 && pos.y === 346) {
    return {
      width: "95px",
      height: "38px",
    };
  } else if (pos.x === 430 && pos.y === 346) {
    return {
      width: "139px",
      height: "38px",
    };
  } else if (pos.x === 128 && pos.y === 387) {
    return {
      width: "440px",
      height: "23px",
    };
  } else if (pos.x === 185 && pos.y === 413) {
    return {
      width: "380px",
      height: "48px",
    };
  } else if (pos.x === 213 && pos.y === 464) {
    return {
      width: "355px",
      height: "48px",
    };
  } else if (pos.x === 247 && pos.y === 516) {
    return {
      width: "323px",
      height: "48px",
    };
  } else if (pos.x === 70 && pos.y === 580) {
    return {
      width: "500px",
      height: "230px",
    };
  }
};

function PdfRellenado() {
  function NavbarButton({ changeButtonType }) {
    return (
      <button onClick={() => changeButtonType("download")}>Descargar</button>
    );
  }

  const context = useContext(Context);

  const [result, setResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [flag, setFlag] = useState("");
  const [bounds, setBounds] = useState({});
  const [isText, setIsText] = useState(false);
  const [buttonType, setButtonType] = useState("");
  const [positions] = useState([
    {
      x: 122,
      y: 227,
      text: "COLOMBIA",
    },
    {
      x: 308,
      y: 243,
      text: "Ninguna",
    },
    {
      x: 135,
      y: 253,
      text: "Senador",
    },
    {
      x: 200,
      y: 292,
      text: "Abogado",
    },
    {
      x: 153,
      y: 319,
      text: "130",
    },
    {
      x: 262,
      y: 319,
      text: "1810",
    },
    {
      x: 400,
      y: 319,
      text: "14900",
    },
    {
      x: 507,
      y: 319,
      text: "No",
    },
    {
      x: 107,
      y: 346,
      text: "26/01/2023",
    },
    {
      x: 263,
      y: 346,
      text: "20",
    },
    {
      x: 430,
      y: 346,
      text: "50",
    },
    {
      x: 128,
      y: 387,
      text: "Carlos y Juan",
    },
    {
      x: 185,
      y: 413,
      text: "Silvia",
    },
    {
      x: 213,
      y: 464,
      text: "Ley Nacional de Glaciares",
    },
    {
      x: 247,
      y: 516,
      text: "Control de Glaciares",
    },
    {
      x: 70,
      y: 580,
      text: `${context.message}`,
    },
  ]);

  const tempRef = useRef(null);

  //Keep track of current page number
  const pageChange = (num) => {
    setPageNumber(num);
  };

  //Function to add text in PDF
  const addText = useCallback(
    (x, y, text) => {
      setIsText(true);
      setResult((result) => [
        ...result,
        {
          id: generateKey(x),
          x: x,
          y: y,
          text: text,
          page: pageNumber,
          type: "text",
          ref: tempRef,
        },
      ]);
    },
    [pageNumber]
  );

  useEffect(() => {
    positions.forEach(({ x, y, text }) => {
      addText(x, y, text);
    });
  }, [positions, addText]);

  //Flag for DrawArea reference
  const changeFlag = () => {
    setFlag("");
  };

  const getPaths = (el) => {
    setResult((res) => [...res, el]);
  };

  const getBounds = (obj) => {
    setBounds(obj);
  };

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };
  const onTextChange = (id, txt, ref) => {
    let indx = result.findIndex((x) => x.id === id);
    let item = { ...result[indx] };
    item.text = txt;
    item.ref = ref;
    result[indx] = item;
    setResult(result);
  };

  const changeButtonType = (type) => {
    setButtonType(type);
  };

  const resetButtonType = () => {
    setButtonType("");
  };

  return (
    <div className="App">
      {result.map((res) => {
        if (res.type === "text") {
          if (res.page === pageNumber) {
          }
          return (
            <div>
              {positions.map((pos, index) => (
                <AutoTextArea
                  id={res.id}
                  x={res.x}
                  y={res.y}
                  text={res.text}
                  ref={res.ref}
                  unique_key={res.id}
                  val={res.text}
                  onTextChange={onTextChange}
                  textAreaStyles={getTextAreaStyles(res)}
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: 16,
                    zIndex: 20,
                    position: "absolute",
                    left: res.x + "px",
                    top: res.y + "px",
                  }}
                />
              ))}
            </div>
          );
        } else {
          return null;
        }
      })}

      <h1 style={{ color: "#3f51b5" }}>Honorables - PDF</h1>

      <hr />

      <div className="navbar">
        <NavbarButton changeButtonType={changeButtonType} />
      </div>
      <div className="pdf-container">
        <iframe
          src="{samplePDF}"
          className="pdf-file"
          title="Honorables PDF Document"
        ></iframe>
      </div>

      <SinglePage
        resetButtonType={resetButtonType}
        buttonType={buttonType}
        cursor={isText ? "text" : "default"}
        pdf={samplePDF}
        pageChange={pageChange}
        getPaths={getPaths}
        flag={flag}
        getBounds={getBounds}
        changeFlag={changeFlag}
      />
      <ModifyPage
        resetButtonType={resetButtonType}
        buttonType={buttonType}
        pdf={samplePDF}
        result={result}
        bounds={bounds}
      />
    </div>
  );
}

export default PdfRellenado;
