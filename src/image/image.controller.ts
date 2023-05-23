import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from '@prisma/client';
import { error } from 'console';

/* class UnprocessableEntityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityException';
  }
} */
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('save')
  async postImage(@Body() { image, compress }: { image: string, compress: number }) {
    try {
        
      /* if (typeof imageData.compress != 'number') throw new UnprocessableEntityException('Unprocessable Entity'); */
      const imagePath = await this.imageService.downloadAndSaveImage(image);
      const resizedImageBuffer = await this.imageService.imageResize(imagePath, compress, image);
      return resizedImageBuffer;
      /* const result = await this.imageService.imageResize(image, compress);
      return { success: true }; */
    } catch (error) {
      /* if(error instanceof UnprocessableEntityException){
        throw new HttpException('Unprocessable Content', HttpStatus.UNPROCESSABLE_ENTITY);
      } */
      console.log(error)
      throw new HttpException('Error resizing image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}

/* const imageName = 'thumb.jpg'; // Defina o nome desejado para o arquivo
      const imagePath = path.join(__dirname, '..', 'images', imageName);

      fs.writeFileSync(imagePath, result);

      const savedimage = `/image/${imageName}`; // Caminho do link da imagem salva
      console.log(savedimage, ' deu ?')
      return { message: 'Image saved successfully', image: savedimage }; */