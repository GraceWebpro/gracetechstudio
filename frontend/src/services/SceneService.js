import { supabase } from "../config/supabase";

/*
-----------------------------------------
Get every scene in a project
-----------------------------------------
*/

export async function getScenes(projectId) {
  const { data, error } = await supabase
    .from("scenes")
    .select("*")
    .eq("project_id", projectId)
    .order("scene_order", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

/*
-----------------------------------------
Create Scene
-----------------------------------------
*/

export async function createScene(projectId, scene) {
  const { data, error } = await supabase
    .from("scenes")
    .insert({
      project_id: projectId,

      title: scene.title,

      script: scene.script,

      thumbnail: scene.thumbnail || null,

      duration: scene.duration || "00:15",

      duration_seconds:
        scene.durationSeconds || 15,

      visual_prompt:
        scene.visualPrompt || "",

      voice:
        scene.voice || "Grace AI",

      voice_style:
        scene.voiceStyle || "Professional",

      speech_speed:
        scene.speechSpeed || 1,

      emphasis:
        scene.emphasis || 50,

      music:
        scene.music || null,

      captions:
        scene.captions ?? true,

      scene_order:
        scene.scene_order || 1,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
-----------------------------------------
Update Scene
-----------------------------------------
*/

export async function updateScene(
  sceneId,
  updates
) {
  const { data, error } = await supabase
    .from("scenes")
    .update(updates)
    .eq("id", sceneId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
-----------------------------------------
Delete Scene
-----------------------------------------
*/

export async function deleteScene(sceneId) {
  const { error } = await supabase
    .from("scenes")
    .delete()
    .eq("id", sceneId);

  if (error) throw error;
}

/*
-----------------------------------------
Duplicate Scene
-----------------------------------------
*/

export async function duplicateScene(scene) {
  const copy = {
    ...scene,

    id: undefined,

    title: `${scene.title} Copy`,
  };

  delete copy.id;

  return createScene(
    scene.project_id,
    copy
  );
}

/*
-----------------------------------------
Reorder Scenes
-----------------------------------------
*/

export async function reorderScenes(
  scenes
) {
  const updates = scenes.map((scene, index) => ({
    id: scene.id,
    scene_order: index + 1,
  }));

  for (const item of updates) {
    await supabase
      .from("scenes")
      .update({
        scene_order: item.scene_order,
      })
      .eq("id", item.id);
  }
}