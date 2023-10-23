import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const allowedExtensions = ['.png', '.jpeg', '.jpg'];
let imageBuffer, base64Image
let fileExtension = '';

export async function imageToBase64FromURL(imageURI: string) {
    if (imageURI) {
        fileExtension = path.extname(imageURI).toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            const response = await axios.get(imageURI, { responseType: 'arraybuffer' });
            return Buffer.from(response.data).toString('base64');
        } else {
            console.log('File extension not supported!');
            return null;
        }
    }
}

export async function imageToBase64FromFile(imageFile: File) {
    // if (imageFile) {
    //     fileExtension = path.extname(imageFile.name).toLowerCase();

    //     console.log('file extension: ' + fileExtension);

    //     if (allowedExtensions.includes(fileExtension)) {
    //         return imageFile.buffer.toString('base64');
    //     } else {
    //         console.log('File extension not supported!');
    //         return null;
    //     }
    // }
}