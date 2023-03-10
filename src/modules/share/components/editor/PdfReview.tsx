import React from 'react';

import { Document, Page } from 'react-pdf/dist/entry.webpack';

const PdfViewer = ({
  url,
  width,
  pageNumber,
}: {
  url: any;
  width: any;
  pageNumber: any;
}) => (
  <Document file={url}>
    <Page pageNumber={pageNumber} width={width} />
  </Document>
);

export default PdfViewer;
