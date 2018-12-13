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
const video = document.getElementById("video");
const picture = document.getElementById("picture");


demoVideoOne.addEventListener('click', () => {previewImage("one")});
demoVideoTwo.addEventListener('click', () => {previewImage("two")});
demoVideoThree.addEventListener('click', () => {previewImage("three")});
demoVideoFour.addEventListener('click', () => {previewImage("four")});

// Add a video on load
previewImage("one");
function previewImage(image) {
  if (image === "one") {
    picture.style.display = "none";
    video.src = "https://www.youtube.com/embed/y8QSy5TR4wY";
    video.style.display = "initial";
  } else if (image === "two") {
    picture.style.display = "none";
    video.src = "https://www.youtube.com/embed/DqSzdsmK5fA";
    video.style.display = "initial";
  } else if (image === "three") {
    video.style.display = "none";
    picture.src = "images/actor-dan-zahle_headshot.jpg";
    picture.style.display = "initial";
  } else {
    video.style.display = "none";
    picture.src = "images/actor-dan-zahle_headshot2.png";
    picture.style.display = "initial";
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
    // console.log(movie);
    const tpl = movieCardTpl.cloneNode(true);
    tpl.querySelector("img").src = movie._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    tpl.querySelector("h3").innerHTML = movie.title.rendered;
    tpl.querySelector(".movie-role").innerHTML = "Role: " + movie.acf.role;
    tpl.querySelector(".movie-year").innerHTML = movie.acf.year;
    tpl.querySelector("a").href = movie.acf.link_to_imdb;

    movieParent.appendChild(tpl);
  });
}