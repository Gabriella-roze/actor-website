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
const intVideo = document.getElementById("intVideo");
const previewTitle = document.getElementById("preview__title");


demoVideoOne.addEventListener('click', () => {previewImage("one", demoVideoOne)});
demoVideoTwo.addEventListener('click', () => {previewImage("two", demoVideoTwo)});
demoVideoThree.addEventListener('click', () => {previewImage("three", demoVideoThree)});
demoVideoFour.addEventListener('click', () => {previewImage("four", demoVideoFour)});

// Add a video on load
previewImage("one", demoVideoOne);

// Change preview image
function previewImage(image, btnClicked) {
  console.log('image-btn: ', image, btnClicked)
  btnClicked.classList.add("highlighted");
  if (image === "one") {
    previewTitle.innerHTML = "Dan Zahle Showreel 2017";
    picture.style.display = "none";
    intVideo.style.display = "none";
    video.src = "https://www.youtube.com/embed/y8QSy5TR4wY";
    video.style.display = "initial";
  } else if (image === "two") {
    previewTitle.innerHTML = "Interview with Dan Zahle by KEA students";
    picture.style.display = "none";
    video.style.display = "none";
    intVideo.src = "interview_video.mp4";
    intVideo.style.display = "initial";
  } else if (image === "three") {
    previewTitle.innerHTML = "Dan Zahle headshot";
    video.style.display = "none";
    intVideo.style.display = "none";
    picture.src = "images/actor-dan-zahle_headshot.jpg";
    picture.style.display = "initial";
  } else {
    previewTitle.innerHTML = "Dan Zahle at work - theatre";
    video.style.display = "none";
    intVideo.style.display = "none";
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