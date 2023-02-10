import React, { useState, useEffect } from "react";
import DrawArea from "./DrawArea";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SinglePage(props) {
  const [, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    props.pageChange(pageNumber);
  });

  //Load PDF
  const { pdf } = props;

  return (
    <>
      <div>
        <Document
          file={pdf}
          options={{ workerSrc: "/pdf.worker.js" }}
          onSourceError={(err) => console.log(err)}
          onSourceSuccess={() => console.log("SUCCESS")}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => console.log("ERR")}
        >
          <DrawArea
            getPaths={props.getPaths}
            page={pageNumber}
            flag={props.flag}
            getBounds={props.getBounds}
            changeFlag={props.changeFlag}
            cursor={props.cursor}
            buttonType={props.buttonType}
            resetButtonType={props.resetButtonType}
          >
            <Page pageNumber={pageNumber} />
          </DrawArea>
        </Document>
      </div>
    </>
  );
}
