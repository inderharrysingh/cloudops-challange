// import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Filesystem } from './components/sections/Filesystem'
import { Testing } from './components/testing';
import { getFileSystem } from './lib/createFileSystem';
// import UploadMe from "./Upload"
// import { uploadFileToS3 } from './lib/onUpload'
// import { LoginSection } from './components/sections/LoginSection'
// import { RegisterSection } from './components/sections/RegisterSection'
// import { Toaster } from './components/ui/toaster'



const paths: string[] = [
  '/root/file1/file2/file3/page1.tsx',
  '/root/file1/page2.tsx',
  '/root/file1/file2/page3.tsx'
];


function App() {

  const data = getFileSystem(paths)

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

        <Testing filesystem={data} />
      </div>
    </>
  )
}

export default App
