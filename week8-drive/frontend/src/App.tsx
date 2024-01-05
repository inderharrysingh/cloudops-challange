import './App.css'
import UploadMe from "./Upload"
import { uploadFileToS3 } from './lib/onUpload'


function App() {

  return (
    <>
      <h1>Upload </h1>
      <UploadMe onUpload={uploadFileToS3} />
      <div className="card">
        <p>
        </p>
      </div>
    </>
  )
}

export default App
