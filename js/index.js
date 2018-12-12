// Download full CV button
const btnCv = document.querySelectorAll(".btnCv");
btnCv.forEach( btn => {
  btn.addEventListener('click', () => {
    window.open("cv/dan-zahle_cv.pdf",'_blank');
  })
});

// Display dynamic content in ABOUT section
const artistName = document.getElementById("artistName");
const artistAboutText = document.getElementById("artistAboutText");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about/100")
  .then(data => data.json())
  .then( info => {
    artistName.innerHTML = info.title.rendered;
    artistAboutText.innerHTML = info.content.rendered;
  });

// Display preview
const demoVideoOne = document.getElementById("demoVideoOne");
const demoVideoTwo = document.getElementById("demoVideoTwo");
const demoVideoThree = document.getElementById("demoVideoThree");
const demoVideoFour = document.getElementById("demoVideoFour");
const galleryPreview = document.getElementById("galleryPreview");
const video = document.getElementById("video");
const picture = document.getElementById("picture");


demoVideoOne.addEventListener('click', () => {previewImage("one")});
demoVideoTwo.addEventListener('click', () => {previewImage("two")});
demoVideoThree.addEventListener('click', () => {previewImage("three")});
demoVideoFour.addEventListener('click', () => {previewImage("four")});

// Add a video on load
previewImage("one");
function previewImage(image) {
  console.log(image);

  if (image === "one") {
    picture.style.display = "none";
    video.style.display = "initial";
    video.src = "https://www.youtube.com/embed/y8QSy5TR4wY";
  } else if (image === "two") {
    picture.style.display = "none";
    video.style.display = "initial";
    video.src = "https://www.youtube.com/embed/DqSzdsmK5fA";
  } else if (image === "three") {
    video.style.display = "none";
    picture.style.display = "initial";
    picture.src = "images/actor-dan-zahle_headshot.jpg"
  } else {
    video.style.display = "none";
    picture.style.display = "initial";
    picture.src = "images/actor-dan-zahle_headshot2.png"
  }
}

// ACTING CREDITS
const movieCardTpl = document.getElementById("movieCardTpl").content;
let movieParent = document.getElementById("credits__movies");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/featured_projects/?_embed")
  .then(data => data.json())
  .then(populateMovies);
function populateMovies( movies ) {
  movies.forEach(movie => {
    console.log(movie);
    const tpl = movieCardTpl.cloneNode(true);
    tpl.querySelector("img").src = movie._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    tpl.querySelector("h3").innerHTML = movie.title.rendered;
    tpl.querySelector(".movie-role").innerHTML = "Role: " + movie.acf.role;
    tpl.querySelector(".movie-year").innerHTML = movie.acf.year;
    tpl.querySelector("a").href = movie.acf.link_to_imdb;

    movieParent.appendChild(tpl);
  });
  // const tpl = movieCardTpl.cloneNode(true);


}