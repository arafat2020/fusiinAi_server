import axios from "axios";
import sharp from "sharp";
import { uploader } from "./uploadManeger";

interface ImgUrl {
    isSucsess: boolean | 'TRIAL',
    url: string
}

export async function CompressImagUrl(url: string): Promise<ImgUrl> {
    try {
        const imgBuffer = await axios.get(url, { responseType: 'arraybuffer' })
        const imageBuffer = await Buffer.from(imgBuffer.data, 'binary');

        const data = await sharp(imageBuffer).png({ quality: 30 }).toBuffer()
        const base64String = await data.toString('base64')
        const cld = await uploader(`data:image/png;base64,${base64String}`)
        if (cld?.url) {
            return {
                isSucsess: true,
                url: cld?.url
            }
        } else {
            return {
                isSucsess: false,
                url: 'NOTE_FOUND'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            isSucsess: false,
            url: 'FAILED'
        }
    }
}