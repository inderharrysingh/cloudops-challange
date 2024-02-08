import { cn } from "@/lib/utils";
import { Triangle } from "lucide-react";
import { useState } from "react";

interface FilesystemType {
    [key: string]: FilesystemType;
}

export function Testing({ filesystem }: { filesystem: FilesystemType }) {
    const [visible, setVisible] = useState<boolean>(false)

    if (!filesystem || Object.keys(filesystem).length === 0) {
        return null;
    }

    return (
        <div className="h-full w-full bg-purple-400 border border-black ">
            {Object.entries(filesystem).map(([key, value]) => (
                <div key={key}>
                    <div className="cursor-pointer" onClick={() => setVisible((prev: boolean) => !prev)} >{key}</div>
                    <div className={cn("ml-4", visible ? "block" : "hidden")} >
                        <Testing filesystem={value} />
                    </div>
                </div>
            ))}

            {/* <div className="ml-auto"> <Triangle className="h-2 w-2" /> </div>LL */}
        </div>
    );
}
