import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getProject } from "../services/projectService";
import {
  generateProject,
  GENERATION_STEPS,
} from "../services/generationService";

export default function Generation() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);

  // Used to explicitly trigger a new generation attempt.
  const [generationAttempt, setGenerationAttempt] = useState(0);

  /*
  =========================================================
  LOAD PROJECT
  =========================================================
  */

  useEffect(() => {
    if (!projectId) {
      navigate("/create");
      return;
    }

    let mounted = true;

    async function loadProject() {
      try {
        setError(null);

        const projectData = await getProject(projectId);

        if (!projectData) {
          throw new Error("Project not found.");
        }

        if (mounted) {
          setProject(projectData);
        }
      } catch (err) {
        console.error(
          "Failed to load generation project:",
          err
        );

        if (mounted) {
          setError(
            err?.message ||
              "Unable to load your project."
          );
        }
      }
    }

    loadProject();

    return () => {
      mounted = false;
    };
  }, [projectId, navigate]);

  /*
  =========================================================
  START REAL GENERATION
  =========================================================
  */

  useEffect(() => {
    if (!project) return;

    let cancelled = false;

    async function startGeneration() {
      try {
        setError(null);

        /*
        -----------------------------------------------
        Tell UI the first step is active
        -----------------------------------------------
        */

        setCurrentStep(0);
        setCompletedSteps([]);

        /*
        -----------------------------------------------
        Run the REAL generation pipeline
        -----------------------------------------------
        */

        await generateProject(projectId, {
          onProgress: (progress) => {
            if (cancelled) return;

            /*
            -------------------------------------------
            Active step
            -------------------------------------------
            */

            if (progress.status === "active") {
              setCurrentStep(progress.step);
            }

            /*
            -------------------------------------------
            Completed step
            -------------------------------------------
            */

            if (progress.status === "completed") {
              setCompletedSteps((previous) => {
                if (
                  previous.includes(progress.step)
                ) {
                  return previous;
                }

                return [
                  ...previous,
                  progress.step,
                ];
              });

              /*
              Move to next step visually
              */

              if (
                progress.step <
                GENERATION_STEPS.length - 1
              ) {
                setCurrentStep(
                  progress.step + 1
                );
              }
            }
          },
        });

        if (cancelled) return;

        /*
        -----------------------------------------------
        Generation completed
        -----------------------------------------------
        */

        setCompletedSteps(
          GENERATION_STEPS.map(
            (_, index) => index
          )
        );

        setCurrentStep(
          GENERATION_STEPS.length - 1
        );

        /*
        Give the user a short moment to see
        "Preparing editor" completed.
        */

        await new Promise((resolve) =>
          setTimeout(resolve, 800)
        );

        if (cancelled) return;

        /*
        -----------------------------------------------
        Go to actual project
        -----------------------------------------------
        */

        navigate(`/project/${projectId}`, {
          replace: true,
        });
      } catch (err) {
        if (cancelled) return;

        console.error(
          "Project generation failed:",
          err
        );

        setError(
          err?.message ||
            "Something went wrong while generating your project."
        );
      } finally {
        if (!cancelled) {
        }
      }
    }

    startGeneration();

    return () => {
      cancelled = true;
    };
  }, [
    project,
    projectId,
    navigate,
    generationAttempt,
  ]);

  /*
  =========================================================
  RETRY
  =========================================================
  */

  function handleRetry() {
    setError(null);
    setCurrentStep(0);
    setCompletedSteps([]);

    // Explicitly start a new generation attempt.
    setGenerationAttempt((attempt) => attempt + 1);
  }

  /*
  =========================================================
  ERROR STATE
  =========================================================
  */

  if (error) {
    return (
      <div className="mx-auto max-w-3xl pt-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            rounded-3xl
            border
            border-border
            bg-surface
            p-8
            shadow-card
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-red-500/10
                text-red-500
              "
            >
              <AlertCircle size={24} />
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Generation failed
              </h2>

              <p className="mt-1 text-sm text-muted">
                {error}
              </p>

            </div>

          </div>

          <div className="mt-6 flex gap-3">

            <button
              type="button"
              onClick={handleRetry}
              className="
                rounded-xl
                bg-primary
                px-5
                py-3
                font-medium
                text-white
                transition
                hover:opacity-90
              "
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/create")
              }
              className="
                rounded-xl
                border
                border-border
                bg-background
                px-5
                py-3
                font-medium
                transition
                hover:bg-surfaceLight
              "
            >
              Back to Create
            </button>

          </div>

        </motion.div>

      </div>
    );
  }

  /*
  =========================================================
  LOADING PROJECT
  =========================================================
  */

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl pt-20">

        <Loader2
          size={28}
          className="animate-spin text-primary"
        />

        <p className="mt-4 text-muted">
          Loading your project...
        </p>

      </div>
    );
  }

  /*
  =========================================================
  PROGRESS
  =========================================================
  */

  const progress =
    GENERATION_STEPS.length > 0
      ? (completedSteps.length /
          GENERATION_STEPS.length) *
        100
      : 0;

  /*
  =========================================================
  MAIN UI
  =========================================================
  */

  return (
    <div className="mx-auto max-w-3xl pt-20">

      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <h1 className="text-5xl font-bold">
          Creating your project...
        </h1>

        <p className="mt-4 text-lg text-muted">
          GraceTech AI is building everything
          for you.
        </p>

        {project.title && (
          <p className="mt-3 text-sm text-muted">
            {project.title}
          </p>
        )}

      </motion.div>

      {/* Progress */}

      <div className="mt-16">

        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-surface
          "
        >

          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              h-full
              rounded-full
              bg-primary
            "
          />

        </div>

        <div className="mt-3 text-right text-sm text-muted">
          {Math.round(progress)}%
        </div>

      </div>

      {/* Steps */}

      <div className="mt-12 space-y-6">

        {GENERATION_STEPS.map(
          (step, index) => {

            const completed =
              completedSteps.includes(index);

            const active =
              index === currentStep &&
              !completed;

            return (
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                {completed ? (

                  <CheckCircle2
                    size={22}
                    className="
                      shrink-0
                      text-success
                    "
                  />

                ) : active ? (

                  <Loader2
                    size={22}
                    className="
                      shrink-0
                      animate-spin
                      text-primary
                    "
                  />

                ) : (

                  <div
                    className="
                      h-[22px]
                      w-[22px]
                      shrink-0
                      rounded-full
                      border
                      border-border
                    "
                  />

                )}

                <span
                  className={`
                    ${
                      completed
                        ? "text-text"
                        : "text-muted"
                    }

                    ${
                      active
                        ? "font-medium text-primary"
                        : ""
                    }
                  `}
                >
                  {step}
                </span>

              </motion.div>
            );
          }
        )}

      </div>

    </div>
  );
}
