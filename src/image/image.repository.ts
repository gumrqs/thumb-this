import { Injectable } from '@nestjs/common';
import prisma from 'src/config/prisma';
import { Exif } from '@prisma/client';

@Injectable()
export class ImageRepository {
  async saveImage(imagePath: string, outputPath: string, exifData: any, image: string, compress: number): Promise<Exif>{
    let createdImage = await prisma.image.create({
      data: {
        image,
        compress,
        localpathOriginal: imagePath,
        localpathThumb: outputPath,
      }
    });
  
    return prisma.exif.create({
      data:{
        imageId: createdImage.id,               
        make: exifData.Make,                 
        model: exifData.Model,              
        orientation: exifData.Orientation,           
        xResolution: exifData.XResolution,           
        yResolution: exifData.YResolution,          
        resolutionUnit: exifData.ResolutionUnit,        
        software: exifData.Software,             
        modifyDate: exifData.ModifyDate,            
        hostComputer: exifData.HostComputer,          
        tileWidth: exifData.TileWidth,             
        tileLength: exifData.TileLength,            
        exposureTime: exifData.ExposureTime,
        fNumber: exifData.FNumber,             
        exposureProgram: exifData.ExposureProgram,       
        iSO: exifData.ISO,                 
        exifVersion: exifData.ExifVersion,           
        dateTimeOriginal: exifData.DateTimeOriginal,   
        createDate: exifData.CreateDate,           
        offsetTime: exifData.OffsetTime,     
        offsetTimeOriginal: exifData.OffsetTimeOriginal,
        offsetTimeDigitized: exifData.OffsetTimeDigitized,  
        shutterSpeedValue: exifData.ShutterSpeedValue,    
        apertureValue: exifData.ApertureValue,       
        brightnessValue: exifData.BrightnessValue,     
        exposureCompensation: exifData.ExposureCompensation,  
        meteringMode: exifData.MeteringMode,         
        flash: exifData.Flash,          
        focalLength: exifData.FocalLength,          
        exifImageWidth: exifData.ExifImageWidth,      
        exifImageHeight: exifData.ExifImageHeight       
      }
    })
  }
}
