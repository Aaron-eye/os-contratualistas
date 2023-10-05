export default async (folder) => {
  const imagePaths = [];

  await new Promise(function (resolve, reject) {
    $.ajax({
      url: folder,
      success: function (data) {
        $(data)
          .find("a")
          .attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif)$/)) {
              var decodedUrl = decodeURIComponent(val);
              imagePaths.push(decodedUrl);
            }
          });
        resolve(imagePaths);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });

  return imagePaths;
};
