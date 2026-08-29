import { supabase } from "../config/supabase";

import { getProject, updateProject } from "./projectService";
import { createScenes } from "./SceneService";
import { generateScript as generateScriptAI } from "./scriptService";
/*
========================================================
GENERATION SERVICE
=========================================================

This service controls the complete project-generation flow.

Current pipeline:

1. Load project
2. Update project status
3. Generate script
4. Generate scenes
5. Save scenes
6. Prepare project for editor

AI/API-specific work should live in separate services.

Later:

generateScript()
generateScenes()
generateImages()
generateVoice()
buildTimeline()

can be connected to real APIs without changing
Generation.jsx.
*/


/*
=========================================================
GENERATION STEPS
=========================================================
*/

export const GENERATION_STEPS = [
  "Understanding your prompt",
  "Writing script",
  "Finding visuals",
  "Creating voice",
  "Building timeline",
  "Preparing editor",
];


/*
=========================================================
UPDATE GENERATION STATUS
=========================================================
*/

async function updateGenerationStatus(
  projectId,
  status,
  extraData = {}
) {
  if (!projectId) {
    throw new Error("Project ID is required.");
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      status,
      ...extraData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to update generation status:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
GENERATE SCRIPT
=========================================================

TEMPORARY VERSION

This currently creates a basic placeholder script.

We will replace this function with the real AI API
inside scriptService.js.

Keeping it here temporarily allows us to build and
test the complete application flow before adding
the API key.
*/

async function generateScript(project) {
  return await generateScriptAI(project);
}


/*
=========================================================
GENERATE SCENES
=========================================================

TEMPORARY VERSION

Later this will be replaced with the AI scene-generation
service.

For now, we create a small number of scenes from the
generated script so the editor can start working with
real database records.
*/

function generateSceneData({
  project,
  script,
}) {
  if (!project?.id) {
    throw new Error(
      "Project ID is required to create scenes."
    );
  }

  if (!script) {
    throw new Error(
      "Script is required to create scenes."
    );
  }

  /*
  -------------------------------------------------------
  Split script into paragraphs
  -------------------------------------------------------
  */

  const paragraphs = script
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  /*
  -------------------------------------------------------
  Create scenes
  -------------------------------------------------------
  */

  return paragraphs.map((paragraph, index) => ({
    project_id: project.id,

    title:
      index === 0
        ? "Introduction"
        : `Scene ${index + 1}`,

    script: paragraph,

    /*
    Temporary duration.

    Later this will be calculated from the
    generated narration/audio.
    */

    duration: "8s",

    duration_seconds: 8,

    /*
    AI image generation will eventually use this prompt.
    */

    visual_prompt: paragraph,

    /*
    Voice settings
    */

    voice: "Grace AI",

    voice_style: "Professional",

    speech_speed: 1,

    emphasis: 50,

    captions: true,

    /*
    Music will be added later.
    */

    music: null,

    /*
    Initial generation status.
    */

    status: "pending",
  }));
}


/*
=========================================================
SAVE SCRIPT TO PROJECT
=========================================================
*/

async function saveProjectScript(
  projectId,
  script
) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      script,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to save project script:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
DELETE EXISTING SCENES
=========================================================

Useful when the user regenerates a project.

Instead of creating duplicate scenes every time,
we remove the old generated scenes first.
*/

async function deleteExistingScenes(projectId) {
  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("project_id", projectId);

  if (error) {
    console.error(
      "Failed to remove existing scenes:",
      error
    );

    throw error;
  }

  return true;
}


/*
=========================================================
CREATE PROJECT SCENES
=========================================================
*/

async function saveScenes(scenes) {
  if (!Array.isArray(scenes)) {
    throw new Error(
      "Scenes must be an array."
    );
  }

  if (scenes.length === 0) {
    throw new Error(
      "No scenes were generated."
    );
  }

  /*
  -------------------------------------------------------
  Use your existing sceneService
  -------------------------------------------------------
  */

  return await createScenes(scenes);
}


/*
=========================================================
MAIN GENERATION FUNCTION
=========================================================

This is the function Generation.jsx will eventually call.

Example:

await generateProject(projectId);

It handles the entire pipeline.
*/

export async function generateProject(projectId, options = {}) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const {
    regenerate = false,
    onProgress,
  } = options;


  /*
  =======================================================
  STEP 1
  LOAD PROJECT
  =======================================================
  */

  if (onProgress) {
    onProgress({
      step: 0,
      status: "active",
      message:
        "Understanding your prompt",
    });
  }

  const project =
    await getProject(projectId);

  if (!project) {
    throw new Error(
      "Project not found."
    );
  }


  /*
  =======================================================
  MARK PROJECT AS GENERATING
  =======================================================
  */

  await updateGenerationStatus(
    projectId,
    "generating"
  );


  try {

    /*
    =====================================================
    STEP 2
    GENERATE SCRIPT
    =====================================================
    */

    if (onProgress) {
      onProgress({
        step: 1,
        status: "active",
        message: "Writing script",
      });
    }

    const scriptResult =
      await generateScript(project);

    const script =
      scriptResult.script;


    /*
    -----------------------------------------------------
    Save script
    -----------------------------------------------------
    */

    await saveProjectScript(
      projectId,
      script
    );


    if (onProgress) {
      onProgress({
        step: 1,
        status: "completed",
        message: "Writing script",
      });
    }


    /*
    =====================================================
    STEP 3
    GENERATE SCENES
    =====================================================
    */

    if (onProgress) {
      onProgress({
        step: 2,
        status: "active",
        message: "Finding visuals",
      });
    }


    /*
    If regenerating, remove old scenes.
    */

    if (regenerate) {
      await deleteExistingScenes(
        projectId
      );
    }


    const scenes =
      generateSceneData({
        project,
        script,
      });


    /*
    -----------------------------------------------------
    Save scenes
    -----------------------------------------------------
    */

    const savedScenes =
      await saveScenes(scenes);


    if (onProgress) {
      onProgress({
        step: 2,
        status: "completed",
        message: "Finding visuals",
        scenes: savedScenes,
      });
    }


    /*
    =====================================================
    STEP 4
    VOICE
    =====================================================

    TEMPORARILY SKIPPED.

    voiceService.js will be connected here.
    */

    if (onProgress) {
      onProgress({
        step: 3,
        status: "active",
        message: "Creating voice",
      });
    }


    /*
    -----------------------------------------------------
    Temporary voice step
    -----------------------------------------------------

    We don't call an API yet.
    */

    if (onProgress) {
      onProgress({
        step: 3,
        status: "completed",
        message: "Creating voice",
      });
    }


    /*
    =====================================================
    STEP 5
    TIMELINE
    =====================================================

    The first version uses the scene durations.

    Later timelineService.js will calculate the
    actual timeline from audio duration.
    */

    if (onProgress) {
      onProgress({
        step: 4,
        status: "active",
        message: "Building timeline",
      });
    }


    const totalDuration =
      scenes.reduce(
        (total, scene) =>
          total +
          Number(
            scene.duration_seconds || 0
          ),
        0
      );


    await updateProject(
      projectId,
      {
        duration_seconds:
          totalDuration,

        scenes_count:
          scenes.length,
      }
    );


    if (onProgress) {
      onProgress({
        step: 4,
        status: "completed",
        message: "Building timeline",
      });
    }


    /*
    =====================================================
    STEP 6
    PREPARE EDITOR
    =====================================================
    */

    if (onProgress) {
      onProgress({
        step: 5,
        status: "active",
        message:
          "Preparing editor",
      });
    }


    await updateGenerationStatus(
      projectId,
      "draft"
    );


    if (onProgress) {
      onProgress({
        step: 5,
        status: "completed",
        message:
          "Preparing editor",
      });
    }


    /*
    =====================================================
    DONE
    =====================================================
    */

    return {
      success: true,

      projectId,

      project: await getProject(
        projectId
      ),

      scenes: savedScenes,

      script,

      durationSeconds:
        totalDuration,
    };

  } catch (error) {

    console.error(
      "Project generation failed:",
      error
    );


    /*
    -----------------------------------------------------
    Mark project as failed
    -----------------------------------------------------
    */

    try {

      await updateGenerationStatus(
        projectId,
        "failed",
        {
          error_message:
            error?.message ||
            "Project generation failed.",
        }
      );

    } catch (statusError) {

      console.error(
        "Could not update failed status:",
        statusError
      );

    }


    throw error;
  }
}


/*
=========================================================
GET GENERATION STATUS
=========================================================

Useful for the Generation page if the user refreshes
the browser.
*/

export async function getGenerationStatus(
  projectId
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const project =
    await getProject(projectId);

  if (!project) {
    throw new Error(
      "Project not found."
    );
  }

  return {
    projectId: project.id,

    status:
      project.status,

    error:
      project.error_message || null,
  };
}


/*
=========================================================
CANCEL GENERATION
=========================================================

Useful later for a Cancel button.
*/

export async function cancelGeneration(
  projectId
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  await updateGenerationStatus(
    projectId,
    "cancelled"
  );

  return true;
}
