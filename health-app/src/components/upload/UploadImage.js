import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import AuthContext from '../login/AuthContext';
import { nodeHostUrl } from '../../config';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadImage = () => {  
  const [imageSrc, setImageSrc] = useState(null);
  const [pdfSrc, setPdfSrc] = useState(null);
  const navigate = useNavigate();
  const acceptedFileTypes = ['image/*', 'application/pdf'];  

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      setImageSrc(null);
      setPdfSrc(uploadedFile);
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension)) {
      setPdfSrc(null);
      setImageSrc(uploadedFile);
    } else {
      alert('Only PDF and image files are supported by this application.');
    }
  };

  const handleUploadImage = async () => {
    const { data: { text } } = await Tesseract.recognize(
      imageSrc,
      'eng',
      { logger: (info) => console.log(info) }
    );
    navigate('/show-data', { state: { data: text } });
  };

  const handleUploadPdf = async () => {
    if (pdfSrc) {
      const formData = new FormData();
      formData.append('pdfFile', pdfSrc);

      try {
        const response = await axios.post(`${nodeHostUrl}/extract-text`, formData);
        navigate('/show-data', { state: { data: response.data } });
      } catch (error) {
        console.error('Error extracting text:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-700">Upload Test</h1>

        <Dropzone accept={acceptedFileTypes.join(',')} maxFiles={1} onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center p-6 mb-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500"
            >
              <input {...getInputProps()} />
              <span className="text-4xl">📂</span>
              <p className="mt-2 text-gray-600">Drag &amp; drop a file here, or click to select one.</p>
            </div>
          )}
        </Dropzone>

        {imageSrc && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(imageSrc)}
              alt="Uploaded"
              className="object-cover w-full h-48 rounded-lg"
            />
            <button
              onClick={handleUploadImage}
              className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Upload Image
            </button>
          </div>
        )}

        {pdfSrc && (
          <div className="flex flex-col items-center mb-4">
            {/* Render PDF Thumbnail */}
            <div className="w-20 h-28 overflow-hidden border rounded-lg">
              <Document
                file={URL.createObjectURL(pdfSrc)}
                className="flex justify-center"
                loading={<p className="text-gray-500 text-sm">Loading...</p>}
              >
                <Page pageNumber={1} width={80} />
              </Document>
            </div>

            {/* PDF Name */}
            <p className="mt-2 text-gray-700">{pdfSrc.name}</p>

            {/* Upload Button */}
            <button
              onClick={handleUploadPdf}
              className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Upload PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
