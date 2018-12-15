const params= new URLSearchParams(window.location.search);
const catID = params.get("catid");
const template = document.querySelector('.tmpl_photos').content;

getPhotos();
function getPhotos() {
   fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/gallery?_embed")
       .then(res => res.json())
       .then(showPhotos);
        }

function showPhotos(photo) {
    console.log(photo);
    photo.forEach(photo => {
    const copy = template.cloneNode(true);
    copy.querySelector('.img').src = photo._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    document.querySelector('.gallery__container').appendChild(copy);
})
}


// if(catID){
//     loadPhotosByCat(catID);
// } else {
//     getPhotos();
// }
// function loadPhotosByCat(catID) {
//     fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/gallery?categories="+catID+'&_embed')
//         .then(res => res.json())
//         .then(showPhotos);
// }
