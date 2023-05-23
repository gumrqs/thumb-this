import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { Image } from '@prisma/client';
import * as sharp from 'sharp';
import * as probe from 'probe-image-size';
import * as fs from 'fs'
import axios from 'axios';
import * as path from 'path';
@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async downloadAndSaveImage(image: string): Promise<string> {
    try {
        const response = await axios.get(image, { responseType: 'arraybuffer' });
        const imageName = path.basename(image, path.extname(image)); // Defina o nome desejado para o arquivo
        const imagePath = path.join(__dirname, '..', '..', 'images', `${imageName}_original.jpg`);
          if (!fs.existsSync(path.dirname(imagePath))) {
            fs.mkdirSync(path.dirname(imagePath), { recursive: true });
          }
          fs.writeFileSync(imagePath, Buffer.from(response.data));
          console.log('Imagem salva:', imagePath);
        return imagePath;
    } catch (error) {
        console.log(error);
        throw new Error('Error downloading and saving image');
    }
  }

  async imageResize(imagePath: string, compress: number, image: string): Promise<Buffer> {
    console.log(imagePath, 'oxiii');
    try {
      const imageInfo = await probe(image);
      const { width, height } = imageInfo;
      console.log(imageInfo, 'olha aiiii');

      const fileName = path.basename(image, path.extname(image));
      const outputPath = path.join(__dirname, '..', '..', 'images', `${fileName}_thumb.jpg`);
    
      await sharp(imagePath)
        .resize(720, null)
        .toFile(outputPath);
      
      return ;
    } catch (error) {
      console.log(error);
      throw new Error('Error resizing image');
    }
  }
}
