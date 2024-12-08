const imgixLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => {
  const url = new URL(`https://kyynk-296765883.imgix.net/${src}`);
  const params = url.searchParams;

  params.set('auto', 'format,compress');
  params.set('fit', 'fill');
  params.set('w', width?.toString());
  params.set('q', quality?.toString() || '75');

  return url.href;
};

export default imgixLoader;
