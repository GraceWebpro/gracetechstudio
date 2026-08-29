import { supabase } from "../config/supabase";

/*
=========================================================
CREATE MULTIPLE SCENES
=========================================================
*/

export async function createScenes(scenes) {
  if (!Array.isArray(scenes) || scenes.length === 0) {
    throw new Error("Scenes must be a non-empty array.");
  }

  const { data, error } = await supabase
    .from("scenes")
    .insert(
      scenes.map((scene, index) => ({
        project_id: scene.project_id,

        title:
          scene.title ||
          `Scene ${index + 1}`,

        script:
          scene.script ||
          "",

        thumbnail:
          scene.thumbnail ||
          null,

        duration:
          scene.duration ||
          "00:08",

        duration_seconds:
          scene.duration_seconds ??
          scene.durationSeconds ??
          8,

        visual_prompt:
          scene.visual_prompt ??
          scene.visualPrompt ??
          "",

        voice:
          scene.voice ||
          "Grace AI",

        voice_style:
          scene.voice_style ??
          scene.voiceStyle ??
          "Professional",

        speech_speed:
          scene.speech_speed ??
          scene.speechSpeed ??
          1,

        emphasis:
          scene.emphasis ??
          50,

        captions:
          scene.captions ??
          true,

        music:
          scene.music ||
          null,

        scene_order:
          scene.scene_order ??
          scene.sceneOrder ??
          index + 1,

        status:
          scene.status ||
          "pending",
      }))
    )
    .select();

  if (error) {
    console.error(
      "Create scenes error:",
      error
    );

    throw error;
  }

  return (data || []).sort(
    (a, b) =>
      a.scene_order -
      b.scene_order
  );
}


/*
=========================================================
GET ALL SCENES FOR A PROJECT
=========================================================
*/

export async function getScenes(projectId) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const { data, error } = await supabase
    .from("scenes")
    .select("*")
    .eq("project_id", projectId)
    .order("scene_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Get scenes error:",
      error
    );

    throw error;
  }

  return data || [];
}


/*
=========================================================
GET SINGLE SCENE
=========================================================
*/

export async function getScene(sceneId) {
  if (!sceneId) {
    throw new Error(
      "Scene ID is required."
    );
  }

  const { data, error } = await supabase
    .from("scenes")
    .select("*")
    .eq("id", sceneId)
    .single();

  if (error) {
    console.error(
      "Get scene error:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
CREATE SINGLE SCENE
=========================================================
*/

export async function createScene(
  projectId,
  scene
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!scene) {
    throw new Error(
      "Scene data is required."
    );
  }

  const { data, error } = await supabase
    .from("scenes")
    .insert({
      project_id: projectId,

      title:
        scene.title ||
        "Untitled Scene",

      script:
        scene.script ||
        "",

      thumbnail:
        scene.thumbnail ||
        null,

      duration:
        scene.duration ||
        "00:08",

      duration_seconds:
        scene.durationSeconds ??
        scene.duration_seconds ??
        8,

      visual_prompt:
        scene.visualPrompt ??
        scene.visual_prompt ??
        "",

      voice:
        scene.voice ||
        "Grace AI",

      voice_style:
        scene.voiceStyle ??
        scene.voice_style ??
        "Professional",

      speech_speed:
        scene.speechSpeed ??
        scene.speech_speed ??
        1,

      emphasis:
        scene.emphasis ??
        50,

      music:
        scene.music ||
        null,

      captions:
        scene.captions ??
        true,

      scene_order:
        scene.scene_order ??
        scene.sceneOrder ??
        1,

      status:
        scene.status ||
        "pending",
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Create scene error:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
UPDATE SCENE
=========================================================
*/

export async function updateScene(
  sceneId,
  updates
) {
  if (!sceneId) {
    throw new Error(
      "Scene ID is required."
    );
  }

  if (
    !updates ||
    typeof updates !== "object"
  ) {
    throw new Error(
      "Scene updates are required."
    );
  }

  const { data, error } = await supabase
    .from("scenes")
    .update(updates)
    .eq("id", sceneId)
    .select()
    .single();

  if (error) {
    console.error(
      "Update scene error:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
DELETE SCENE
=========================================================
*/

export async function deleteScene(
  sceneId
) {
  if (!sceneId) {
    throw new Error(
      "Scene ID is required."
    );
  }

  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("id", sceneId);

  if (error) {
    console.error(
      "Delete scene error:",
      error
    );

    throw error;
  }

  return true;
}


/*
=========================================================
DELETE ALL SCENES FOR A PROJECT
=========================================================
*/

export async function deleteProjectScenes(
  projectId
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("project_id", projectId);

  if (error) {
    console.error(
      "Delete project scenes error:",
      error
    );

    throw error;
  }

  return true;
}


/*
=========================================================
DUPLICATE SCENE
=========================================================
*/

export async function duplicateScene(
  scene
) {
  if (!scene?.project_id) {
    throw new Error(
      "Scene project ID is required."
    );
  }

  return createScene(
    scene.project_id,
    {
      ...scene,

      title:
        `${scene.title || "Scene"} Copy`,

      scene_order:
        (scene.scene_order || 0) + 1,
    }
  );
}


/*
=========================================================
REORDER SCENES
=========================================================
*/

export async function reorderScenes(
  scenes
) {
  if (!Array.isArray(scenes)) {
    throw new Error(
      "Scenes must be an array."
    );
  }

  if (scenes.length === 0) {
    return [];
  }

  /*
  -------------------------------------------------------
  Update each scene's order
  -------------------------------------------------------
  */

  for (
    let index = 0;
    index < scenes.length;
    index++
  ) {
    const scene = scenes[index];

    const { error } =
      await supabase
        .from("scenes")
        .update({
          scene_order:
            index + 1,
        })
        .eq("id", scene.id);

    if (error) {
      console.error(
        "Reorder scene error:",
        error
      );

      throw error;
    }
  }

  return getScenes(
    scenes[0]?.project_id
  );
}
