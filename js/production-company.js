// Production Company
// Dynamic text
const teaxtAboutCompany = document.getElementById("teaxtAboutCompany");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about/101")
  .then(data => data.json())
  .then( info => {
    teaxtAboutCompany.innerHTML = info.content.rendered;
  });

// Dynamic gallery
const tplThumbnail = document.getElementById("tplCompanyGalleryThumbnails").content;
const imgThumbnailsParent = document.getElementById("mini-gallery");
const imgPreview = document.getElementById("img__preview");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/umdieecke_posters?_embed")
  .then(data => data.json())
  .then(posters => {
    posters.forEach(poster => {
      const tplCopy = tplThumbnail.cloneNode(true);
      let posterImg = poster._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
      changeImgPreview(posterImg);
      tplCopy.querySelector(".img-thumbnail").src = posterImg;
      tplCopy.querySelector(".img-thumbnail").addEventListener("click", () => changeImgPreview(posterImg));
      imgThumbnailsParent.appendChild(tplCopy);
    })
  });
function changeImgPreview(path) {
  console.log(path);
  imgPreview.src = path;
}