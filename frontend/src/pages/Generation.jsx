import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  "Understanding your prompt",
  "Writing script",
  "Finding visuals",
  "Creating voice",
  "Building timeline",
  "Preparing editor",
];

export default function Generation() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!data) {
      navigate("/create");
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);

          setTimeout(() => {
            navigate("/project/1", {
              state: data,
            });
          }, 800);

          return prev;
        }

        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="max-w-3xl mx-auto pt-20">

      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
      >

        <h1 className="text-5xl font-bold">

          Creating your project...

        </h1>

        <p className="mt-4 text-muted text-lg">

          GraceTech AI is building everything for you.

        </p>

      </motion.div>

      {/* Progress */}

      <div className="mt-16">

        <div className="h-3 rounded-full bg-surface overflow-hidden">

          <motion.div
            animate={{
              width: `${((currentStep+1)/steps.length)*100}%`,
            }}
            transition={{
              duration:.5,
            }}
            className="h-full bg-primary"
          />

        </div>

      </div>

      {/* Steps */}

      <div className="mt-12 space-y-6">

        {steps.map((step,index)=>{

          const completed=index<currentStep;

          const active=index===currentStep;

          return(

            <motion.div

              key={step}

              className="flex items-center gap-4"

            >

              {completed?

              (

                <CheckCircle2

                  size={22}

                  className="text-success"

                />

              ):

              active?

              (

                <Loader2

                  size={22}

                  className="animate-spin text-primary"

                />

              ):

              (

                <div className="w-[22px]"/>

              )}

              <span
                className={`

                ${completed?"text-text":"text-muted"}

                ${active?"text-primary":""}

                `}
              >

                {step}

              </span>

            </motion.div>

          )

        })}

      </div>

    </div>
  );
}