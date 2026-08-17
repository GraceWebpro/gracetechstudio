import { supabase } from "../config/supabase";

/*
------------------------------------------
Upload Image / Video
------------------------------------------
*/

export async function uploadVisual(file) {

    const extension = file.name.split(".").pop();

    const filename = `${Date.now()}.${extension}`;

    const path = `visuals/${filename}`;

    const { error } = await supabase.storage
        .from("visuals")
        .upload(path, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from("visuals")
        .getPublicUrl(path);

    return data.publicUrl;
}

/*
------------------------------------------
Delete Visual
------------------------------------------
*/

export async function deleteVisual(url){

    const path = url.split("/visuals/")[1];

    if(!path) return;

    await supabase.storage
        .from("visuals")
        .remove([path]);
}