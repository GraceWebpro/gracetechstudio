import { supabase } from "../config/supabase";

/*
----------------------------------
Create Project
----------------------------------
*/

export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: project.title,
      description: project.description || "",
      thumbnail: project.thumbnail || null,
      settings: project.settings || {},
      status: "draft",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
----------------------------------
Load Project
----------------------------------
*/

export async function getProject(projectId) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) throw error;

  return data;
}

/*
----------------------------------
Update Project
----------------------------------
*/

export async function updateProject(projectId, updates) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
----------------------------------
Delete Project
----------------------------------
*/

export async function deleteProject(projectId) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;
}

/*
----------------------------------
All Projects
----------------------------------
*/

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}