import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMenu({
    open,
    anchorRef,
    onClose,
    children,
    
    offsetX = 0,
    offsetY = 0,
}) {
    const menuRef = useRef(null);

    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {

        if (!open || !anchorRef.current) return;

        const rect = anchorRef.current.getBoundingClientRect();

        setPosition({
            top: rect.top + offsetY,
            left: rect.left + offsetX,
        });

    }, [open, anchorRef, offsetX, offsetY]);

    useEffect(() => {
        if (!open) return;
      
        function handleClick(e) {
          if (
            menuRef.current?.contains(e.target) ||
            anchorRef.current?.contains(e.target)
          ) {
            return;
          }
      
          onClose();
        }
      
        // Wait until the current click finishes
        const id = setTimeout(() => {
          document.addEventListener("mousedown", handleClick);
        }, 0);
      
        return () => {
          clearTimeout(id);
          document.removeEventListener("mousedown", handleClick);
        };
      }, [open, onClose, anchorRef]);
    if (!open) return null;

    return createPortal(

        <AnimatePresence>

            <motion.div
                ref={menuRef}
                initial={{
                    opacity:0,
                    scale:.95,
                    y:10
                }}

                animate={{
                    opacity:1,
                    scale:1,
                    y:0
                }}

                exit={{
                    opacity:0,
                    scale:.95,
                    y:10
                }}

                transition={{
                    duration:.18
                }}

                style={{

                    position:"fixed",

                    top:position.top,

                    left:position.left,

                    zIndex:999999

                }}
                className="
                inline-block
                rounded-2xl
                border
                border-border
                bg-surface
                shadow-2xl
                "

            >
                {children}
            </motion.div>

        </AnimatePresence>,

        document.body

    );

}