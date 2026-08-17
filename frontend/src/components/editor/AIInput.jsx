import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Paperclip,
  Mic,
  Loader2,
  ArrowUp,
} from "lucide-react";

const placeholders = [
    "Tell AI what to change...",

  ];

export default function AIInput({
  value,
  onChange,
  onGenerate,
  loading = false,
}) {
  const textareaRef = useRef(null);

  const resize = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    resize();
  };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

useEffect(() => {

  const interval = setInterval(() => {

    setPlaceholderIndex((prev) =>

      (prev + 1) % placeholders.length

    );

  }, 3500);

  return () => clearInterval(interval);

}, []);

  const handleSubmit = () => {
    if (!value.trim() || loading) return;

    onGenerate?.();
  };

  const handleKeyDown = (e) => {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === "Enter"
    ) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      className="
        rounded-t-3xl
        border
        border-border
        bg-background
        overflow-hidden
        transition-all
        focus-within:border-primary
        focus-within:shadow-glow
      "
    >
      {/* Input */}

      <div className="relative min-h-[88px]">

{!value && (

<motion.div

key={placeholderIndex}

initial={{
opacity:0,
y:8
}}

animate={{
opacity:0.55,
y:0
}}

exit={{
opacity:0,
y:-8
}}

transition={{
duration:.35
}}

className="
absolute
left-4
top-4
pointer-events-none
text-muted
"

>

{placeholders[placeholderIndex]}
<motion.span

animate={{

opacity:[.3,1,.3]

}}

transition={

{

repeat:Infinity,

duration:2

}

}

>

|

</motion.span>
</motion.div>

)}

<textarea

ref={textareaRef}

value={value}

onChange={handleChange}

onKeyDown={handleKeyDown}

rows={2}

placeholder=""

className="
w-full
resize-none
bg-transparent
outline-none
px-4
pt-4
pb-3
text-base
min-h-[70px]
max-h-[120px]
"

 />

</div>
      {/* Bottom */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-border
          px-4
py-2
        "
      >
        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            className="
            w-9
            h-9
            rounded-xl
            flex
            items-center
            justify-center
            hover:bg-surface
            transition
            "
          >
            <Paperclip size={18} />
          </button>

          <button
            className="
            w-9
            h-9
            rounded-xl
            hover:bg-surface
              flex
              items-center
              justify-center
              hover:border-primary
              transition
            "
          >
            <Mic size={18} />
          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2">

          <motion.button
    whileHover={{ scale:1.05 }}
    whileTap={{ scale:.95 }}
    disabled={!value.trim() || loading}
    onClick={handleSubmit}
    className={`
        w-10
        h-10
        rounded-xl
        flex
        items-center
        justify-center
        transition

        ${
            loading || !value.trim()
            ? "bg-border text-muted"
            : "bg-primary text-white"
        }
    `}
>

    {loading
        ? <Loader2 className="animate-spin" size={18}/>
        : <ArrowUp size={18}/>
    }

</motion.button>

        </div>

      </div>
    </motion.div>
  );
}