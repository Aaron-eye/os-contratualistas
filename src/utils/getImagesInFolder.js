async function checkImageExists(url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = url;
  });
}

export default async (folder, imageBaseName) => {
  const imagePaths = [];

  let imageExists = true;
  let i = 0;
  while (imageExists) {
    i++;
    const imgUrl = `${folder}/${imageBaseName}-${i}.png`;
    imageExists = await checkImageExists(imgUrl);

    if (imageExists) {
      imagePaths.push(imgUrl);
    }
  }

  return imagePaths;
};
