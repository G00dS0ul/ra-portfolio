const CLOUD_NAME = "dudefrby5";

export function cloudImg(filename: string, width = 800): string {
  const normalized = filename.replace(/ /g, "_");
  return "https://res.cloudinary.com/" + CLOUD_NAME + "/image/upload/f_auto,q_auto,w_" + width + "/" + normalized;
}