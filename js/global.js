// FOOTER
const manager = document.getElementById("manager");
const actor = document.getElementById("actor");

fetch("http://workshopab.com/2nd_exam/wordpress/wp-json/wp/v2/about")
  .then(data => data.json())
  .then(info => {
    info.forEach(elem => {
      if (elem.id === 100) {
        actor.querySelector(".contacts__phone").innerHTML = "<i class=\"fas fa-mobile-alt\"></i> " + " " + elem.acf.phone_number;
        actor.querySelector(".contacts__email").innerHTML = "<i class=\"fas fa-envelope\"></i> " + " " + elem.acf.email;
      }
      else if (elem.id === 143) {
        manager.querySelector("h2").innerHTML = elem.title.rendered;
        manager.querySelector(".contacts__phone").innerHTML = "<i class=\"fas fa-mobile-alt\"></i> " + " " + elem.acf.phone_number;
        manager.querySelector(".contacts__email").innerHTML = "<i class=\"fas fa-envelope\"></i> " + " " + elem.acf.email;
      }
    });
  });

// Download full CV button
const btnCv = document.querySelectorAll(".btnCv");
btnCv.forEach( btn => {
  btn.addEventListener('click', () => {
    window.open("cv/dan-zahle_cv.pdf",'_blank');
  })
});
