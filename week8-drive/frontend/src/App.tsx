// import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { FileViewer } from './components/FileViewer'
// import UploadMe from "./Upload"
// import { uploadFileToS3 } from './lib/onUpload'
// import { LoginSection } from './components/sections/LoginSection'
// import { RegisterSection } from './components/sections/RegisterSection'
// import { Toaster } from './components/ui/toaster'




function App() {


  return (
    <>
      {/* <Route path="/" element={<UploadMe onUpload={uploadFileToS3} />} /> */}
      <div>
        {/* 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UploadMe onUpload={uploadFileToS3} />}>
              <Route index element={<div>This is suppose to be default  </div>} />
              <Route path="login" index element={<LoginSection />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<div>Bachan ke lode</div>} />
            </Route>
          </Routes>
        </BrowserRouter> */}
      </div>
      <div className='w-full flex justify-start'>
        {/* <LoginSection /> */}
        {/* <RegisterSection /> */}
        {/* <Toaster /> */}
        {/* <Filesystem /> */}
        <FileViewer />
      </div>
    </>
  )
}

export default App
