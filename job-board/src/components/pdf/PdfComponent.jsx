import {useState} from 'react';
import { Document, Page } from 'react-pdf';
import {ChevronLeft, ChevronRight, X} from "lucide-react";

import './PdfComponent.css'
export default function PdfComponent({pdf, onClose}) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div className="pdf-container">
            <div className="flex justify-center mb-1 text-center" onClick={onClose}>
                <X size={40}
                   className="cursor-pointer rounded text-white bg-red-600"
                />
            </div>

            <nav className="flex items-center space-x-20 bg-white mb-4 py-2 px-10">
               <div className="flex items-center justify-between space-x-8">
                <ChevronLeft
                    disabled={pageNumber === 1}
                    onClick={previousPage}
                    size={32}
                    className="cursor-pointer rounded text-white bg-indigo-400"
                    />

                <ChevronRight
                    disabled={pageNumber === numPages}
                    onClick={nextPage}
                    size={32}
                    className="cursor-pointer rounded text-white bg-indigo-400"
                />
               </div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </nav>

            <Document
                file={`http://localhost:8080/api/v1/jobs/resume/${pdf}`}
                // file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber}  renderTextLayer={false} renderAnnotationLayer={false}
                />
            </Document>
        </div>
    );
}