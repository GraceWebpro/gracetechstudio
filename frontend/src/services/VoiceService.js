import { supabase } from "../config/supabase";

/*
|--------------------------------------------------------------------------
| Upload voice sample
|--------------------------------------------------------------------------
*/

export async function uploadVoiceSample(file, projectId) {
  const extension = file.name.split(".").pop();

  const filename = `${projectId}/${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("voice-samples")
    .upload(filename, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("voice-samples")
    .getPublicUrl(filename);

  return data.publicUrl;
}

/*
|--------------------------------------------------------------------------
| Save voice sample
|--------------------------------------------------------------------------
*/

export async function saveVoiceSample(projectId, url) {
  const { data, error } = await supabase
    .from("voice_samples")
    .insert({
      project_id: projectId,
      url,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
|--------------------------------------------------------------------------
| Get voice samples
|--------------------------------------------------------------------------
*/

export async function getVoiceSamples(projectId) {
  const { data, error } = await supabase
    .from("voice_samples")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/*
|--------------------------------------------------------------------------
| Delete voice sample
|--------------------------------------------------------------------------
*/

export async function deleteVoiceSample(id) {
  const { error } = await supabase
    .from("voice_samples")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/*
|--------------------------------------------------------------------------
| Save voice settings
|--------------------------------------------------------------------------
*/

export async function saveVoiceSettings(
  sceneId,
  settings
) {
  const { data, error } = await supabase
    .from("scenes")
    .update({
      voice: settings.voice,
      voice_style: settings.style,
      emphasis: settings.emphasis,
      auto_narration: settings.autoNarration,
      sync_narration: settings.syncNarration,
    })
    .eq("id", sceneId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
|--------------------------------------------------------------------------
| Get voice settings
|--------------------------------------------------------------------------
*/

export async function getVoiceSettings(sceneId) {
  const { data, error } = await supabase
    .from("scenes")
    .select(`
      voice,
      voice_style,
      emphasis,
      auto_narration,
      sync_narration
    `)
    .eq("id", sceneId)
    .single();

  if (error) throw error;

  return data;
}