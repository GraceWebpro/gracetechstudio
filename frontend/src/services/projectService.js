import { supabase } from "../config/supabase";

/*
=========================================================
CREATE PROJECT
=========================================================
*/

export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: project.title || "Untitled Project",
      prompt: project.prompt || "",
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
=========================================================
LOAD PROJECT
=========================================================
*/

export async function getProject(projectId) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    console.error(
      "Get project error:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
UPDATE PROJECT
=========================================================
*/

export async function updateProject(
  projectId,
  updates
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!updates || typeof updates !== "object") {
    throw new Error(
      "Project updates are required."
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      ...updates,

      updated_at:
        new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error(
      "Update project error:",
      error
    );

    throw error;
  }

  return data;
}


/*
=========================================================
DELETE PROJECT
=========================================================
*/

export async function deleteProject(
  projectId
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    console.error(
      "Delete project error:",
      error
    );

    throw error;
  }

  return true;
}


/*
=========================================================
GET ALL PROJECTS
=========================================================
*/

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Get projects error:",
      error
    );

    throw error;
  }

  return data || [];
}


/*
=========================================================
UPDATE PROJECT STATUS
=========================================================
*/

export async function updateProjectStatus(
  projectId,
  status
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!status) {
    throw new Error(
      "Project status is required."
    );
  }

  return updateProject(
    projectId,
    {
      status,
    }
  );
}


/*
=========================================================
SAVE PROJECT SCRIPT
=========================================================
*/

export async function saveProjectScript(
  projectId,
  script
) {
  if (!projectId) {
    throw new Error(
      "Project ID is required."
    );
  }

  if (!script) {
    throw new Error(
      "Script is required."
    );
  }

  return updateProject(
    projectId,
    {
      script,
    }
  );
}

