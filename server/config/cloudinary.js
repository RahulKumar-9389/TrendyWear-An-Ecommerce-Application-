import { v2 as cloudinary } from 'cloudinary';
import { rm } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function uploadOnCloudinary(filePath) {
    try {
        if (!filePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })

        rm(filePath, { recursive: true }, function (error) {
            if (error) {
                console.log(error.message);
            }
        })
        return response.url;

    } catch (error) {
        rm(filePath, { recursive: true }, function (error) {
            if (error) {
                console.log(error.message);
            }
        })
        console.log(`Error while upload image on cloudinary : ${error.message}`);
    }
}
