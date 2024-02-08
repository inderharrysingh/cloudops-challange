import { Testing } from './testing'
import { getFileSystem } from '@/lib/createFileSystem';


const paths: string[] = [
    '/root/file1/file2/file3/page1.tsx',
    '/root/file1/page2.tsx',
    '/root/file1/file2/page3.tsx'
];


export function FileViewer() {

    const data = getFileSystem(paths)

    return (

        <div className='w-1/6 h-svh '>
            <Testing filesystem={data} />

        </div>
    )
}
