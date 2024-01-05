import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';


const BUCKET_NAME="kinesis-project-01"
const USER_NAME="random"

interface MyDropzoneProps {
  onUpload:  (bucketName : string , userName : string  , files: File[]) => Promise<void>

}

const MyDropzoneComponent: React.FC<MyDropzoneProps> = ({ onUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {

    fileRejections.forEach((rejectedFile) => {
      console.error('Rejected File:', rejectedFile.file);
      console.error('Rejection Error:', rejectedFile.errors);
    });


    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  const handleUpload = async  () => {
    // Perform the file upload logic here using the provided onUpload callback
     await  onUpload( BUCKET_NAME, USER_NAME , uploadedFiles);

    
    
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <p>Uploaded Files:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleUpload}>Upload All Files</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default MyDropzoneComponent;
