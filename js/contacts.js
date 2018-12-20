const contactsImg = document.getElementById("contacts__img");

fetch("https://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about/100?_embed")
  .then(data => data.json())
  .then( actor => {
    console.log(actor._embedded["wp:featuredmedia"][0].media_details.sizes);
    contactsImg.src = actor._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
  })

const contManager = document.getElementById("cont-manager");
const contActor = document.getElementById("cont-actor");

fetch("https://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about")
  .then(data => data.json())
  .then(info => {
    info.forEach(elem => {
      if (elem.id === 100) {
        contActor.querySelector(".contacts__phone").innerHTML = "<i class=\"fas fa-mobile-alt\"></i> " + " " + elem.acf.phone_number;
        contActor.querySelector(".contacts__email").innerHTML = "<i class=\"fas fa-envelope\"></i> " + " " + elem.acf.email;
      }
      else if (elem.id === 143) {
        contManager.querySelector("h2").innerHTML = elem.title.rendered;
        contManager.querySelector(".contacts__phone").innerHTML = "<i class=\"fas fa-mobile-alt\"></i> " + " " + elem.acf.phone_number;
        contManager.querySelector(".contacts__email").innerHTML = "<i class=\"fas fa-envelope\"></i> " + " " + elem.acf.email;
      }
    });
  });