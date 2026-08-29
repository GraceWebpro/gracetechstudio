/*
=========================================================
SCRIPT SERVICE
=========================================================

Responsible for generating the actual video script.

The React frontend calls this service.

This service calls your backend:

POST /api/generate-script

The backend is responsible for calling the AI provider
so your API key is never exposed in the browser.

Expected response:

{
  "success": true,
  "title": "...",
  "script": "...",
  "scenes": [...]
}

=========================================================
*/


const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";


/*
=========================================================
GENERATE SCRIPT
=========================================================
*/

export async function generateScript(project) {

  if (!project) {
    throw new Error(
      "Project data is required."
    );
  }


  /*
  -------------------------------------------------------
  Extract project information
  -------------------------------------------------------
  */

  const prompt =
    project.prompt?.trim();

  if (!prompt) {
    throw new Error(
      "Please provide a prompt for your video."
    );
  }


  const settings =
    project.settings || {};


  /*
  -------------------------------------------------------
  Build request
  -------------------------------------------------------
  */

  const requestBody = {

    prompt,

    title:
      project.title || "",

    settings: {

      style:
        settings.style ||
        "Cinematic",

      platform:
        settings.platform ||
        "YouTube",

      duration:
        settings.duration ||
        "2 Minutes",

      aspectRatio:
        settings.aspectRatio ||
        "16:9",

    },

  };


  /*
  -------------------------------------------------------
  Call backend
  -------------------------------------------------------
  */

  const response = await fetch(
    `${API_BASE_URL}/api/generate-script`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body:
        JSON.stringify(requestBody),
    }
  );


  /*
  -------------------------------------------------------
  Handle HTTP errors
  -------------------------------------------------------
  */

  if (!response.ok) {

    let errorMessage =
      "Failed to generate script.";

    try {

      const errorData =
        await response.json();

      errorMessage =
        errorData?.message ||
        errorData?.error ||
        errorMessage;

    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(
      errorMessage
    );
  }


  /*
  -------------------------------------------------------
  Parse response
  -------------------------------------------------------
  */

  const data =
    await response.json();


  /*
  -------------------------------------------------------
  Validate response
  -------------------------------------------------------
  */

  if (!data) {
    throw new Error(
      "The AI returned an empty response."
    );
  }


  if (
    data.success === false
  ) {
    throw new Error(
      data.message ||
      data.error ||
      "Script generation failed."
    );
  }


  if (
    !data.script ||
    typeof data.script !== "string"
  ) {
    throw new Error(
      "The AI response did not contain a valid script."
    );
  }


  /*
  -------------------------------------------------------
  Return normalized result
  -------------------------------------------------------
  */

  return {

    success: true,

    title:
      data.title ||
      project.title ||
      prompt.slice(0, 60),

    script:
      data.script.trim(),

    scenes:
      Array.isArray(data.scenes)
        ? data.scenes
        : [],

  };
}


/*
=========================================================
GENERATE SCRIPT FROM RAW PROMPT
=========================================================

Useful when another part of the application only has
a prompt rather than a complete project object.
=========================================================
*/

export async function generateScriptFromPrompt(
  prompt,
  settings = {}
) {

  if (!prompt?.trim()) {
    throw new Error(
      "Prompt is required."
    );
  }


  return generateScript({

    prompt:
      prompt.trim(),

    settings,

  });
}


/*
=========================================================
ESTIMATE SCRIPT DURATION
=========================================================

Approximate narration duration.

Average narration speed is roughly 130-160
words per minute.

We use 145 words per minute as a reasonable
default for documentary-style narration.
=========================================================
*/

export function estimateScriptDuration(
  script,
  wordsPerMinute = 145
) {

  if (!script) {
    return 0;
  }


  const words =
    script
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;


  if (!words) {
    return 0;
  }


  return Math.ceil(
    (words / wordsPerMinute) * 60
  );
}


/*
=========================================================
FORMAT DURATION
=========================================================
*/

export function formatDuration(
  seconds
) {

  if (!seconds || seconds < 0) {
    return "00:00";
  }


  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    Math.floor(seconds % 60);


  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(
    2,
    "0"
  )}`;
}