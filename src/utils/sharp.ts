import sharp from "sharp";

export const sharpFile = async (fileBuffer: Buffer, pathPicture: string) => {
  const value = pathPicture.includes("user") ? 300 : 500;

  await sharp(fileBuffer)
    .resize(value, value, { fit: "inside" })
    .jpeg({ quality: 70 })
    .toFile(pathPicture);
};
