const params= new URLSearchParams(window.location.search);
const catID = params.get("catid");
const template = document.querySelector('.tmpl_photos').content;
const loader = document.querySelector('.loader');

function hideLoader() {
    loader.classList.add('hide');
}
loadCategory();
function loadCategory() {
    fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/categories")
        .then(e => e.json())
}

if(catID && catID !== '1'){
    loadPhotosByCat(catID);
} else {
    getPhotos();
}

if(catID){
    const selector = ".cat" + catID;
    console.log(selector);
    const link = document.querySelector(selector);
    link.classList.add("bold");
} else{
    const all = document.querySelector('.all');
    all.classList.add('bold');
}

function getPhotos() {
   fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/gallery?_embed&per_page=100")
       .then(res => res.json())
       .then(showPhotos);
        }

function loadPhotosByCat(catID) {
    fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/gallery?categories="+catID+'&_embed')
        .then(res => res.json())
        .then(showPhotos);
}



function showPhotos(photo) {
    console.log(photo);
    photo.forEach(photo => {
     if(photo._embedded["wp:featuredmedia"][0].media_details.sizes.large) {
         const copy = template.cloneNode(true);
         copy.querySelector('.img').style.backgroundImage = `url(${photo._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url})`;
         document.querySelector('.gallery__container').appendChild(copy);
         hideLoader();
     }
     else{
         const copy = template.cloneNode(true);
         copy.querySelector('.img').style.backgroundImage = `url(${photo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})`;
         document.querySelector('.gallery__container').appendChild(copy);
     }

});

}




