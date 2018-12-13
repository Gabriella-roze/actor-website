const teaxtAboutCompany = document.getElementById("teaxtAboutCompany");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about/101")
  .then(data => data.json())
  .then( info => {
    teaxtAboutCompany.innerHTML = info.content.rendered;
  });