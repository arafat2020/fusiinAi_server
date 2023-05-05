import cld from "./cldUploader"
// import imageSize from "image-size"

export const uploader = async (url: string|undefined) => {
    if (!url) return null
    try {
        const Cls = await cld.uploader.upload(url)
        const data = {
            url: Cls.url,
            width: Cls.width,
            height: Cls.height
        }
        return data

    } catch (error) {
        console.log(error);

        return null
    }
}