const params= new URLSearchParams(window.location.search);
const catID = params.get("catid");
const template = document.querySelector('.tmpl_photos').content;
const loader = document.querySelector('.loader');
const modal = document.querySelector('.modal');
const ex = document.querySelector('.fa-times-circle');
const nextImg = document.querySelector('.fa-angle-right');
const prevImg = document.querySelector('fa-angle-left');


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

// clicked category in bold

if(catID){
    const selector = ".cat" + catID;
    console.log(selector);
    const link = document.querySelector(selector);
    console.log(link)
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

// Save class for later use
let clickedImgClass;

function showPhotos(photo) {
    console.log(photo);
    photo.forEach((photo, i) => {
        const copy = template.cloneNode(true);
       let activeImg ="";
        if(photo._embedded["wp:featuredmedia"][0].media_details.sizes.large) {
            activeImg = photo._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
         copy.querySelector('.img').style.backgroundImage = `url(${photo._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url})`;
         }
         else{
            activeImg = photo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
            copy.querySelector('.img').style.backgroundImage = `url(${photo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url})`;
         }
        copy.querySelector('.img').classList.add(i);
          clickedImgClass = i;
          copy.querySelector('.img').addEventListener("click", function() {
             clickedImgClass = i;
             console.log(clickedImgClass);
             modal.classList.add('show_modal');
             modal.querySelector('img').src = activeImg;
             document.querySelector("body").style.overflow = 'hidden';
         });

     document.querySelector('.gallery__container').appendChild(copy);
    });
    hideLoader();
}

ex.addEventListener('click', function(){
    modal.classList.remove('show_modal');
    document.querySelector("body").style.overflow = 'auto';
});



nextImg.addEventListener('click', function(){
  clickedImgClass++;
  let next = modal.querySelector(`.${clickedImgClass}`);
  console.log(next);
  // modal.querySelector(clickedImgClass).src = ";"
});



