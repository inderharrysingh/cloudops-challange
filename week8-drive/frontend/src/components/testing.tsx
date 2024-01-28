import { useState } from "react";
import { CommandSeparator } from "./ui/command";
import { cn } from "@/lib/utils";
import { chown } from "fs";


interface FilesystemType {
    [key: string]: FilesystemType | null;
}




export function Testing({ filesystem }: { filesystem: FilesystemType }) {


    // const [visiblity, setVisibility] = useState<boolean>(false)



    if (!filesystem) {
        return <></>
    }

    const keys = Object.keys(filesystem)
    console.log(keys)

    return (
        <div>

            {

                keys.map((key: string) => {

                    return (
                        <div key={key}>
                            <div >{key}</div>
                            <CommandSeparator />
                            {/* <div className={cn("pl-4")} > <Testing filesystem={filesystem[key] || {}} /></div> */}
                        </div>
                    )

                })
            }
        </div>
    )
}
