// Define constants and variables
const template = document.querySelector("#acting_template").content;
var expanded = false;
var parentMovies = document.querySelector("#movieList");
var parentMusicals = document.querySelector("#musicalList");
var parentTheatre = document.querySelector("#theatreList");
var parentSeries = document.querySelector("#seriesList");
 
// Movies Section
//Fetch and append movies on OnClick event
const expandMovies = document.querySelector("#btnMovies");
expandMovies.addEventListener("click", toggleMovies)
 
// Run whole routine
function toggleMovies() {
    if (!expanded) {
            function getMovies(){
                fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/projects?categories=4&per_page=11&order=asc")
                .then(res => res.json())
                .then(showMovies)
            }
           
            function showMovies(moviesItems) {
                moviesItems.forEach(showItem)
            }
           
            function showItem(item) {
                const clone = template.cloneNode(true);
                clone.querySelector(".template_title").textContent=item.acf.title;
                clone.querySelector(".template_role").textContent=item.title.rendered;
                clone.querySelector(".template_year").textContent=item.acf.year;
                const newSection = document.createElement("section");
                newSection.appendChild(clone);
                parentMovies.appendChild(newSection);
                newSection.classList.add("movieListGrid");
            }
            expanded=true;
            getMovies();
    } else {
        parentMovies.innerHTML = "";
        expanded=false;
    }
};
 
//Musicals section
//Fetch and append musicals on OnClick event
const expandMusicals = document.querySelector("#btnMusicals");
expandMusicals.addEventListener("click", toggleMusicals)
 
// Run whole routine
function toggleMusicals() {
    if (!expanded) {
            function getMusicals(){
                fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/projects?categories=5&per_page=9&order=asc")
                .then(res => res.json())
                .then(showMusicals)
            }
           
            function showMusicals(musicalsItems) {
                musicalsItems.forEach(showItem)
            }
           
            function showItem(item) {
                const clone = template.cloneNode(true);
                clone.querySelector(".template_title").textContent=item.acf.title;
                clone.querySelector(".template_role").textContent=item.title.rendered;
                clone.querySelector(".template_year").textContent=item.acf.year;
                const newSection = document.createElement("section");
                newSection.appendChild(clone);
                parentMusicals.appendChild(newSection);
                newSection.classList.add("musicalListGrid");
            }
            expanded=true;
            getMusicals();
    } else {
        parentMusicals.innerHTML = "";
        expanded=false;
    }
   
};
 
//Theatre section
//Fetch and append theatre on OnClick event
const expandTheatre = document.querySelector("#btnTheatre");
expandTheatre.addEventListener("click", toggleTheatre)
 
// Run whole routine
function toggleTheatre() {
    if (!expanded) {
            function getTheatre(){
                fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/projects?categories=3&per_page=11&order=asc")
                .then(res => res.json())
                .then(showTheatre)
            }
           
            function showTheatre(theatreItems) {
                theatreItems.forEach(showItem)
            }
           
            function showItem(item) {
                const clone = template.cloneNode(true);
                clone.querySelector(".template_title").textContent=item.acf.title;
                clone.querySelector(".template_role").textContent=item.title.rendered;
                clone.querySelector(".template_year").textContent=item.acf.year;
                const newSection = document.createElement("section");
                newSection.appendChild(clone);
                parentTheatre.appendChild(newSection); 
                newSection.classList.add("theatreListGrid");
            }
            expanded=true;
            getTheatre();
    } else {
        parentTheatre.innerHTML = "";
        expanded=false;
    }
   
};
 
//Series section
//Fetch and append series on OnClick event
const expandSeries = document.querySelector("#btnTvSeries");
expandSeries.addEventListener("click", toggleSeries)
 
// Run whole routine
function toggleSeries() {
    if (!expanded) {
            function getSeries(){
                fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/projects?categories=2&per_page=9&order=asc")
                .then(res => res.json())
                .then(showSeries)
            }
            function showSeries(seriesItems) {
                seriesItems.forEach(showItem)
            }
            function showItem(item) {
                const clone = template.cloneNode(true);
                clone.querySelector(".template_title").textContent=item.acf.title;
                clone.querySelector(".template_role").textContent=item.title.rendered;
                clone.querySelector(".template_year").textContent=item.acf.year;
                const newSection = document.createElement("section");
                newSection.appendChild(clone);
                parentSeries.appendChild(newSection); 
                newSection.classList.add("seriesListGrid");
            }
            expanded=true;
            getSeries();
    } else {
        parentSeries.innerHTML = "";
        expanded=false;
    }
};