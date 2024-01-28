// import {
//     Calendar,
// } from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command"

import { getFileSystem } from "@/lib/createFileSystem";

const paths: string[] = [
    '/root/file1/file2/file3/page1.tsx',
    '/root/file1/page2.tsx',
    '/root/file1/file2/page3.tsx'
];


export function Filesystem() {

    const data = getFileSystem(paths)

    return (

        <div className="w-80">

            <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    {


                    }


                </CommandList>
            </Command>
        </div>
    )
}
