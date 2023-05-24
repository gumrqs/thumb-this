import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from '@prisma/client';
import { PostResponseDto } from './dto/postResponse.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('save')
  async postImage(@Body() { image, compress }: Partial<Image>): Promise<PostResponseDto> {
    try {
      const imagePath = await this.imageService.downloadAndSaveImage(image);
      const resizedImage = await this.imageService.imageResize(imagePath, compress, image);
      
      return resizedImage;
     
    } catch (error) {
     
      console.log(error)
      throw new HttpException('Error resizing image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}
