import { useState } from "react";

import {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjects,
} from "../services/projectService";

export default function useProject() {
  const [loading, setLoading] = useState(false);

  async function create(data) {
    setLoading(true);

    try {
      return await createProject(data);
    } finally {
      setLoading(false);
    }
  }

  async function load(id) {
    setLoading(true);

    try {
      return await getProject(id);
    } finally {
      setLoading(false);
    }
  }

  async function update(id, updates) {
    setLoading(true);

    try {
      return await updateProject(id, updates);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    setLoading(true);

    try {
      await deleteProject(id);
    } finally {
      setLoading(false);
    }
  }

  async function list() {
    setLoading(true);

    try {
      return await getProjects();
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    create,
    load,
    update,
    remove,
    list,
  };
}