document.addEventListener("DOMContentLoaded", function () {
  loadNav();
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        let elm = document.querySelector(".bottom-navbar");
        elm.innerHTML = xhttp.responseText;

        elm.addEventListener("click", function (event) {

          page = event.target.getAttribute("data-goto").substr(1);
          loadPage(page);
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  const changeActive = (page) => {
    const navLeague = document.getElementById("nav-league");
    const navMyTeam = document.getElementById("nav-myteam");
    const navMatch = document.getElementById("nav-match");

    const buttonsNav = document.querySelectorAll("#nav-league,#nav-myteam,#nav-match");
    buttonsNav.forEach((ele) => {
      ele.classList.remove("active-nav");
    })
    switch (page) {
      case "leagues":
        navLeague.classList.add("active-nav");
        break;
      case "myteam":
        navMyTeam.classList.add("active-nav");
        break;
      case "match":
        navMatch.classList.add("active-nav");
        break;
      default:
        break;
    }
  }

  var page = window.location.hash.substr(1);
  if (page == "") page = "leagues";
  loadPage(page);

  function loadPage(page) {
    console.log(`PAGE NOW --> ${page}`);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {

        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          switch (page) {
            case "leagues":
              getLeague();
              changeActive("leagues");
              break;
            case "myteam":
              getSavedTeams();
              changeActive("myteam");
              break;
            case "match":
              renderSelectLeague();
              changeActive("match");

              break;
            default:
              break;
          }
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }

    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});