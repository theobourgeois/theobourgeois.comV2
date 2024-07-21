import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

export function Code({ code }: { code: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="w-full">
            <pre className="">
                <code className="text-xs language-javascript">{code}</code>
            </pre>
        </div>
    );
}
