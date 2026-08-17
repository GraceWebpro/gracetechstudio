import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  FileAudio,
  Trash2,
  X,
  CheckCircle2,
} from "lucide-react";

export default function UploadSamplesModal({
  open,
  onClose,
  onUpload,
}) {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  if (!open) return null;

  function addFiles(selectedFiles) {
    const list = Array.from(selectedFiles);

    setFiles((prev) => [...prev, ...list]);
  }

  function removeFile(index) {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function handleDrop(e) {
    e.preventDefault();

    addFiles(e.dataTransfer.files);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed
          inset-0
          z-[9999]
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          py-6
          px-5
        "
      >
        <motion.div
          initial={{
            scale: .96,
            y: 20,
          }}
          animate={{
            scale: 1,
            y: 0,
          }}
          exit={{
            scale: .96,
            y: 20,
          }}
          className="
            w-full
            max-w-2xl
            max-h-[90vh]

            rounded-3xl
            bg-surface
            border
            border-border
            shadow-2xl

            flex
            flex-col

            overflow-hidden
        "
        >
          {/* Header */}

          <div className="flex justify-between items-start px-6 py-5 border-b border-border">

            <div>

              <h2 className="text-2xl font-bold">
                Upload Voice Samples
              </h2>

              <p className="mt-1 text-muted">
                Upload clean recordings to create your AI voice.
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                w-10
                h-10
                rounded-xl
                border
                border-border
                flex
                items-center
                justify-center
              "
            >
              <X size={18}/>
            </button>

          </div>

          <div className="
        flex-1
        overflow-y-auto
        p-6
        space-y-5
    ">

            {/* Dropzone */}

            <div
              onDragOver={(e)=>e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
              className="
                border-2
                border-dashed
                border-primary/30
                rounded-3xl
                p-6
                cursor-pointer
                transition
                hover:border-primary
                hover:bg-primary/5
              "
            >

              <div className="flex flex-col items-center">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-primary/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Upload
                    size={26}
                    className="text-primary"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Drag & Drop Audio Files
                </h3>

                <p className="mt-2 text-muted text-center">
                  or click to browse your computer
                </p>

                <button
                  className="
                    mt-4
                    px-4
                    py-2
                    rounded-xl
                    bg-primary
                    text-white
                  "
                >
                  Browse Files
                </button>

              </div>

              <input
                ref={inputRef}
                type="file"
                hidden
                multiple
                accept=".mp3,.wav,.m4a"
                onChange={(e)=>
                  addFiles(e.target.files)
                }
              />

            </div>

            {/* Files */}

            {files.length > 0 && (

              <div className="space-y-3">

                <h3 className="font-semibold">
                  Selected Files
                </h3>

                {files.map((file,index)=>(

                  <div
                    key={index}
                    className="
                      rounded-2xl
                      border
                      border-border
                      px-4
                      py-3
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-primary/10
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FileAudio
                          size={18}
                          className="text-primary"
                        />
                      </div>

                      <div>

                        <p className="font-medium">
                          {file.name}
                        </p>

                        <p className="text-sm text-muted">
                          {(file.size/1024/1024).toFixed(2)} MB
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => removeFile(index)}
                      className="
                        w-10
                        h-10
                        rounded-xl
                        hover:bg-red-500/10
                        text-red-500
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2 size={18}/>
                    </button>

                  </div>

                ))}

              </div>

            )}

            {/* Tips */}

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-background
                p-4
              "
            >

              <div className="flex items-center gap-2 font-semibold mb-2">

                <CheckCircle2
                  size={18}
                  className="text-primary"
                />

                Best Results

              </div>

              <ul className="space-y-1 text-sm text-muted list-disc ml-5">

                <li>Use a quiet environment.</li>

                <li>Avoid background music.</li>

                <li>Speak naturally.</li>

                <li>30 seconds to 5 minutes total works best.</li>

              </ul>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t border-border px-6 py-4 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-border
              "
            >
              Cancel
            </button>

            <button
              disabled={!files.length}
              onClick={() => onUpload?.(files)}
              className="
                px-6
                py-2.5
                rounded-xl
                bg-primary
                text-white
                disabled:opacity-40
              "
            >
              Upload Samples
            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}