import sharp from "sharp";

export class PostResponseDto {
    localpath: {
        original: string;
        thumb: string;
    };
    metadata: sharp.Metadata;
}