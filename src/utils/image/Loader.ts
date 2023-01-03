interface iImageLoader {
  src: string | object;
  width: string | number | undefined;
  quality: string | number | undefined;
}

const ImageLoader = ({ src, width, quality }: iImageLoader) => {
  return `./${src}?w=${width}&q=${quality || 75}`;
};
export default ImageLoader;
