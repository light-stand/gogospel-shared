import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  ImagePickerAsset,
} from "expo-image-picker";
import Constants from "expo-constants";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { S3File } from "./s3";

enum ImageInput {
  Camera,
  Library,
}

const processImage = async (image: ImagePickerAsset, size?: number) => {
  const aspectRatio = image.width / image.height;
  const greaterDim = aspectRatio >= 1 ? "width" : "height";
  const smallerDim = aspectRatio < 1 ? "width" : "height";

  const resizeRule = size
    ? { [smallerDim]: size }
    : { [greaterDim]: image[greaterDim] > 1920 ? 1920 : image[greaterDim] };

  const newImage = await manipulateAsync(image.uri, [{ resize: resizeRule }], {
    format: SaveFormat.JPEG,
    compress: 0.5,
  });
  return newImage;
};

export async function pickOrTakePicture(
  type: ImageInput
): Promise<S3File | undefined> {
  if (type === ImageInput.Camera) {
    const permission = await requestCameraPermissionsAsync();
    if (!permission.granted) throw new Error("No permission for the camera");
  }

  const result = await (type === ImageInput.Camera
    ? launchCameraAsync()
    : launchImageLibraryAsync());

  if (result.assets && result.assets[0]) {
    const pickedImage = result.assets[0];

    const fileId = messageIdGenerator();

    const fullImageFile = await processImage(pickedImage);

    return {
      uri: fullImageFile.uri,
      type: "image/jpeg",
      name: `${fileId}.jpg`,
    };
  }
}

const messageIdGenerator = () =>
  Constants.installationId + "_" + Constants.sessionId + "_" + Date.now();
