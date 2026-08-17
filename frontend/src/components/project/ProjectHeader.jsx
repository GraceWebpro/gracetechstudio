import {
    Download,
    Sparkles,
    Settings2,
} from "lucide-react";

export default function ProjectHeader(){

    return(

        <div
        className="
        flex
        justify-between
        items-center
        px-8
        py-6
        border-b
        border-border
        "
        >

            <div>

                <h2 className="text-xl font-semibold">

                    Video Preview

                </h2>

                <p className="text-muted">

                    AI Generated Preview

                </p>

            </div>

            <div className="flex items-center gap-3">

                <div
                className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-primary/10
                text-primary
                "
                >

                    <Sparkles size={16}/>

                    AI Ready

                </div>

                <button className="editor-btn">

                    <Settings2 size={18}/>

                </button>

                <button className="editor-btn">

                    <Download size={18}/>

                    Export

                </button>

            </div>

        </div>

    )

}