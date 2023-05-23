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
      const imagePath = await this.imageService.downloadAndSaveImage(image);
      const resizedImageBuffer = await this.imageService.imageResize(imagePath, compress, image);
      return resizedImageBuffer;
     
    } catch (error) {
     
      console.log(error)
      throw new HttpException('Error resizing image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}
