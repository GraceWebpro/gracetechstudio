import express from "express";
import OpenAI from "openai";

const router = express.Router();

/*
=========================================================
OPENAI CLIENT
=========================================================
*/

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


/*
=========================================================
POST /api/generate-script
=========================================================

Receives:

{
  prompt,
  title,
  settings
}

Returns:

{
  success: true,
  title,
  script
}
=========================================================
*/

router.post("/generate-script", async (req, res) => {
  try {
    /*
    =====================================================
    1. GET REQUEST DATA
    =====================================================
    */

    const {
      prompt,
      title,
      settings = {},
    } = req.body;


    /*
    =====================================================
    2. VALIDATE PROMPT
    =====================================================
    */

    if (
      !prompt ||
      typeof prompt !== "string" ||
      !prompt.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "A video prompt is required.",
      });
    }


    /*
    =====================================================
    3. GET SETTINGS
    =====================================================
    */

    const style =
      settings.style || "Cinematic";

    const platform =
      settings.platform || "YouTube";

    const duration =
      settings.duration || "2 Minutes";

    const aspectRatio =
      settings.aspectRatio || "16:9";


    /*
    =====================================================
    4. ESTIMATE TARGET WORD COUNT
    =====================================================

    Average narration speed:
    approximately 145 words per minute.
    */

    const durationWordTargets = {
      "30 Seconds": 75,
      "1 Minute": 145,
      "2 Minutes": 290,
      "5 Minutes": 725,
      "10 Minutes": 1450,
    };

    const targetWords =
      durationWordTargets[duration] || 290;


    /*
    =====================================================
    5. BUILD AI INSTRUCTIONS
    =====================================================
    */

    const systemPrompt = `
You are the professional AI scriptwriter for
GraceTech AI, an AI video creation platform.

Your job is to transform the user's idea into a
high-quality narration script for an AI-generated video.

VIDEO SETTINGS

Platform:
${platform}

Style:
${style}

Duration:
${duration}

Aspect Ratio:
${aspectRatio}

Target approximately:
${targetWords} spoken words.

SCRIPT REQUIREMENTS

1. Start with a strong hook.

2. Make the opening interesting enough to encourage
   the viewer to keep watching.

3. Write naturally for spoken narration.

4. Keep the language clear and easy to understand.

5. Maintain curiosity throughout the video.

6. Use smooth transitions between ideas.

7. End with a satisfying conclusion.

8. Do not write camera directions.

9. Do not write image-generation instructions.

10. Do not write "Scene 1", "Scene 2", etc.

11. Do not include markdown formatting.

12. Do not include a title inside the script.

13. Do not include stage directions.

14. Do not say things like "[pause]" or
    "[dramatic music]".

15. Avoid repetitive wording.

16. For educational, historical, scientific, or
    factual topics, avoid knowingly inventing facts.

17. The final response must contain ONLY the
    narration script.

USER'S VIDEO IDEA:

${prompt.trim()}
`;


    /*
    =====================================================
    6. CALL OPENAI
    =====================================================
    */

    const response = await openai.responses.create({
      model:
        process.env.OPENAI_MODEL || "gpt-5.6",

      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
    });


    /*
    =====================================================
    7. GET GENERATED SCRIPT
    =====================================================
    */

    const script =
      response.output_text?.trim();


    /*
    =====================================================
    8. VALIDATE RESPONSE
    =====================================================
    */

    if (!script) {
      throw new Error(
        "The AI returned an empty script."
      );
    }


    /*
    =====================================================
    9. CREATE TITLE
    =====================================================
    */

    const generatedTitle =
      title?.trim() ||
      prompt
        .trim()
        .slice(0, 60);


    /*
    =====================================================
    10. RETURN RESULT
    =====================================================
    */

    return res.status(200).json({
      success: true,

      title: generatedTitle,

      script,
    });

  } catch (error) {

    /*
    =====================================================
    ERROR HANDLING
    =====================================================
    */

    console.error(
      "Script generation error:",
      error
    );


    return res.status(500).json({
      success: false,

      message:
        error?.message ||
        "Failed to generate script.",
    });
  }
});


/*
=========================================================
EXPORT ROUTER
=========================================================
*/

export default router;