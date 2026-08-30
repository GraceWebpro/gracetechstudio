import { useRef, useState } from "react";
import {
  Upload,
  Globe,
  Palette,
  Trash2,
} from "lucide-react";

export default function BrandPanel({
  scene,
  updateScene,
}) {
  const fileRef = useRef(null);

  const [logo, setLogo] = useState(
    scene?.brandLogo || null
  );

  function uploadLogo(file) {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setLogo(preview);

    updateScene?.("brandLogo", preview);
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h3 className="text-lg font-semibold">
          Brand Kit
        </h3>

        <p className="text-sm text-muted mt-1">
          Apply client branding to this video.
        </p>

      </div>

      {/* Brand Name */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Brand Name
        </label>

        <input
          value={scene?.brandName || ""}
          onChange={(e)=>
            updateScene("brandName",e.target.value)
          }
          placeholder="Nike"
          className="
          w-full
          rounded-xl
          border
          border-border
          bg-background
          px-4
          py-3
          outline-none
          focus:border-primary
          "
        />

      </div>

      {/* Website */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Website / CTA
        </label>

        <div className="relative">

          <Globe
            size={17}
            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-muted
            "
          />

          <input
            value={scene?.website || ""}
            onChange={(e)=>
              updateScene("website",e.target.value)
            }
            placeholder="www.client.com"
            className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            pl-10
            pr-4
            py-3
            outline-none
            focus:border-primary
            "
          />

        </div>

      </div>

      {/* Logo */}

      <div className="space-y-3">

        <label className="text-sm font-medium">
          Logo
        </label>

        {logo ? (

          <div
            className="
            rounded-2xl
            border
            border-border
            bg-background
            p-4
            flex
            items-center
            justify-between
            "
          >

            <div className="flex items-center gap-4">

              <img
                src={logo}
                alt=""
                className="
                w-16
                h-16
                rounded-xl
                object-contain
                bg-white
                "
              />

              <div>

                <p className="font-medium">
                  Logo uploaded
                </p>

                <p className="text-sm text-muted">
                  Used in intro/outro.
                </p>

              </div>

            </div>

            <button
              onClick={()=>{
                setLogo(null);
                updateScene("brandLogo","");
              }}
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

        ) : (

          <button
            onClick={()=>fileRef.current.click()}
            className="
            w-full
            h-32
            rounded-2xl
            border-2
            border-dashed
            border-border
            hover:border-primary
            hover:bg-primary/5
            transition
            flex
            flex-col
            items-center
            justify-center
            gap-3
            "
          >

            <Upload
              size={26}
              className="text-primary"
            />

            <span className="font-medium">
              Upload Brand Logo
            </span>

            <span className="text-xs text-muted">
              PNG • SVG • JPG
            </span>

          </button>

        )}

        <input
          ref={fileRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e)=>
            uploadLogo(e.target.files?.[0])
          }
        />

      </div>

      {/* Colors */}

      <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Primary Color
          </label>

          <div
            className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-border
            bg-background
            p-3
            "
          >

            <Palette
              size={16}
              className="text-muted"
            />

            <input
              type="color"
              value={scene?.primaryColor || "#4F46E5"}
              onChange={(e)=>
                updateScene(
                  "primaryColor",
                  e.target.value
                )
              }
              className="w-10 h-10"
            />

          </div>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Secondary Color
          </label>

          <div
            className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-border
            bg-background
            p-3
            "
          >

            <Palette
              size={16}
              className="text-muted"
            />

            <input
              type="color"
              value={scene?.secondaryColor || "#111827"}
              onChange={(e)=>
                updateScene(
                  "secondaryColor",
                  e.target.value
                )
              }
              className="w-10 h-10"
            />

          </div>

        </div>

      </div>

      {/* Outro */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Outro Call-to-Action
        </label>

        <textarea
          rows={3}
          value={scene?.outro || ""}
          onChange={(e)=>
            updateScene("outro",e.target.value)
          }
          placeholder="Visit our website for more information."
          className="
          w-full
          resize-none
          rounded-xl
          border
          border-border
          bg-background
          p-3
          outline-none
          focus:border-primary
          "
        />

      </div>

      {/* Toggles */}

      <div className="space-y-4">

        <label className="flex justify-between items-center">

          <span className="text-sm">
            Show logo throughout video
          </span>

          <input
            type="checkbox"
            checked={scene?.showLogo ?? true}
            onChange={(e)=>
              updateScene(
                "showLogo",
                e.target.checked
              )
            }
            className="accent-primary"
          />

        </label>

        <label className="flex justify-between items-center">

          <span className="text-sm">
            Show website in outro
          </span>

          <input
            type="checkbox"
            checked={scene?.showWebsite ?? true}
            onChange={(e)=>
              updateScene(
                "showWebsite",
                e.target.checked
              )
            }
            className="accent-primary"
          />

        </label>

      </div>

    </div>
  );
}