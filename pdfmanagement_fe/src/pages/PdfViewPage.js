import React from "react";
import PdfPreview from "../components/pdfpreview/PdfPreview";
import CommentList from "../components/pdfpreview/CommentList";

export default function PdfViewPage() {
  return (
    <div className="page-container pdf-page">
      <PdfPreview />
      <CommentList />
    </div>
  );
}
