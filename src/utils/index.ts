/**
 * function to dynamically import image with vite
 * @author BIYA Paul <bpsmartdesign@hotmail.com>
 * @param {string} img The name of the image with extensions
 */
export const getImgUrl = (img: string) => {
  return new URL(`/src/assets/imgs/${img}`, import.meta.url).href
}
