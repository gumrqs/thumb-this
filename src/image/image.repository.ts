import { Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import prisma from 'src/config/prisma';

@Injectable()
export class ImageRepository {
  saveImage(resizedImage: Image): Promise<Image> {
    return prisma.image.create({
      data: resizedImage
    });
  }
}
