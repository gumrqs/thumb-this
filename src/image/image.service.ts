import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import * as sharp from 'sharp';
import * as probe from 'probe-image-size';
import * as fs from 'fs'
import axios from 'axios';
import * as path from 'path';
import { PostResponseDto } from './dto/postResponse.dto';
import * as exifr from 'exifr';

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

      return imagePath;

    } catch (error) {
        console.log(error);
        throw new Error('Error downloading and saving image');
    }
  }
  async imageResize(imagePath: string, compress: number, image: string): Promise<PostResponseDto> {
    try {
      const imageInfo = await probe(image);
      const { width, height } = imageInfo;
  
      const fileName = path.basename(image, path.extname(image));
      const outputPath = path.join(__dirname, '..', '..', 'images', `${fileName}_thumb.jpg`);
      const metadata = await sharp(imagePath).metadata();
  
      let resizeWidth = width;
      let resizeHeight = height;
  
      if (width > height && width > 720) {
        resizeWidth = width * compress;
        resizeHeight = null
      } else if (height > width && height > 720) {
        resizeHeight = height * compress;
        resizeWidth = null
      } else if (height === width && height > 720) {
        resizeWidth = width * compress;
        resizeHeight = height * compress;
      }
  
      await sharp(imagePath)
        .resize(resizeWidth, resizeHeight)
        .toFile(outputPath);

      const exifData = await exifr.parse(imagePath);
      const response = {
        "localpath": {
          "original": imagePath,
          "thumb": outputPath,
        },
        "metadata": exifData ? exifData : 'Imagem não possui exif'
      };

      await this.imageRepository.saveImage(imagePath, outputPath, exifData, image, compress);
  
      return response;

    } catch (error) {
      console.log(error);
      throw new Error('Error resizing image');
    }
  }
}
