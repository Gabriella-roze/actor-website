const params= new URLSearchParams(window.location.search);
const catID = params.get("catid");
const template = document.querySelector('.tmpl_photos').content;
const loader = document.querySelector('.loader');
const modal = document.querySelector('.modal');
const ex = document.querySelector('.fa-times-circle');
const nextImg = document.querySelector('.fa-angle-right');
const prevImg = document.querySelector('.fa-angle-left');


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
    fetch("https://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/gallery?categories="+catID+'&_embed')
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
        //  When adding a class to an element,
        //  which has to be selected later, the class name has to start with a letter.
        // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
        copy.querySelector('.img').classList.add(`pic${i}`);
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

const galleryContainer = document.querySelector(".gallery__container");

nextImg.addEventListener('click', () => imgNavigationGallery("next"));
prevImg.addEventListener('click', () => imgNavigationGallery("back"));

function imgNavigationGallery(direction){
  direction === "next" ? clickedImgClass++ : clickedImgClass--;
  // console.log(clickedImgClass);
  let nextURL = galleryContainer.querySelector(`.pic${clickedImgClass}`).style.backgroundImage;
  // We need to remove the "URL(" and ")" from the string that we got.
  // https://regexr.com/
  // and
  // https://www.w3schools.com/jsref/jsref_replace.asp
  let nextLink = nextURL.replace(/url\("|"\)|/gi, '');
  // console.log(nextLink);
  modal.querySelector('img').src = nextLink;
}