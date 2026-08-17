import { supabase } from "../config/supabase";

export async function uploadAsset(file, folder = "images") {

    const extension =
        file.name.split(".").pop();

    const fileName =
        `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.${extension}`;

    const path = `${folder}/${fileName}`;

    const { error } =
        await supabase.storage
            .from("assets")
            .upload(path, file);

    if (error) throw error;

    const { data } =
        supabase.storage
            .from("assets")
            .getPublicUrl(path);

    return data.publicUrl;

}