export async function rewriteScene(scene, prompt) {

    await new Promise(resolve =>
        setTimeout(resolve,1200)
    );

    return{

        ...scene,

        title:scene.title,

        script:
            scene.script +
            "\n\n" +
            prompt,

        voice:"Grace AI",

        transition:"Fade",

        mood:"Cinematic",

    };

}