var base_url = "https://api.football-data.org/v2/";
let loader = ` 
<p>Loading...</p>
      `;
    //   <div class="loader-background hide-content"  id="loader">
    //   <div class="loader hide-content"></div>
    // </div>
let shortenPos = (long) => {
  switch (long) {
    case "Goalkeeper":
      return "GK";
    case "Defender":
      return "DF"
    case "Midfielder":
      return "MF";
    case "Attacker":
      return "FW";
  }
  return "Coach";
}

function status(response) {

  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"

    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getLeague() {
  if ('caches' in window) {

    caches.match(base_url + "competitions?plan=TIER_ONE").then(function (response) {
      if (response) {

        response.json().then(function (data) {
          var leagueHTML = "";

          data.competitions.forEach(function (league) {

            leagueHTML += `
            <div class="league-card">
              <a href="./league.html?id=${league.id}">
                 <img src="../images/logos/logo-${league.id}.png" alt="/" />
              </a>  
            </div>
        `;
          });
          document.getElementById("leagues").innerHTML = leagueHTML;
        })
      }
    })
  }


  fetch(base_url + "competitions?plan=TIER_ONE", {
    method: "GET",
    headers: {
      "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var leagueHTML = "";

      data.competitions.forEach(function (league) {

        leagueHTML += `
                  <div class="league-card">
                    <a href="./league.html?id=${league.id}">
                       <img src="../images/logos/logo-${league.id}.png" alt="/" />
                    </a>  
                  </div>
              `;
      });
      document.getElementById("leagues").innerHTML = leagueHTML;
    })
    .catch(error);


}

function getLeagueById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "competitions/" + idParam + "/standings").then(function (response) {
      if (response) {

        response.json().then(function (data) {
          let standingsHTML = "";
          standingsHTML += `
      <div class="league-logo league-card__logo">
        <img src="../images/logos/logo-${idParam}.png" alt="/" />
      </div>
      <h5 class="padding-left">Standings</h5>
      <div class="bg-white margin-bottom">
      <div class="container">
      <table>
      `;

          standingsHTML += `
      <tr class="bold">
        <td colspan="2">Club</td>
        <td>M</td>
        <td>W</td>
        <td>D</td>
        <td>L</td>
        <td>GF</td>
        <td>GA</td>
        <td>GD</td>
        <td>P</td>
      </tr>
      `

          data.standings[0].table.forEach((team) => {
            standingsHTML += `
      <tr class="standing" onclick="window.location='team.html?id=${team.team.id}'">
        <td>${team.position}</td>
        <td>
          <object data="${team.team.crestUrl}" type="image/png">
            <p>${team.team.name}</p>
          </object>
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
        <td>${team.points}</td>
      </tr>
      `;
          })


          standingsHTML += `
      </div>
      </div>
      </table>
      `
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("league-content").innerHTML = standingsHTML;
        })
      }
    })
  }

  document.getElementById("league-content").innerHTML = loader;

  fetch(base_url + "competitions/" + idParam + "/standings", {
    method: "GET",
    headers: {
      "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let standingsHTML = "";
      standingsHTML += `
      <div class="league-logo league-card__logo">
        <img src="../images/logos/logo-${idParam}.png" alt="/" />
      </div>
      <h5 class="padding-left">Standings</h5>
      <div class="bg-white margin-bottom">
      <div class="container">
      <table>
      `;

      standingsHTML += `
      <tr class="bold">
        <td colspan="2">Club</td>
        <td>M</td>
        <td>W</td>
        <td>D</td>
        <td>L</td>
        <td>GF</td>
        <td>GA</td>
        <td>GD</td>
        <td>P</td>
      </tr>
      `

      data.standings[0].table.forEach((team) => {
        standingsHTML += `
      <tr class="standing" onclick="window.location='team.html?id=${team.team.id}'">
        <td>${team.position}</td>
        <td>
          <object data="${team.team.crestUrl}" type="image/png">
            <p>${team.team.name}</p>
          </object>
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
        <td>${team.points}</td>
      </tr>
      `;
      })


      standingsHTML += `
      </div>
      </div>
      </table>
      `
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("league-content").innerHTML = standingsHTML;
    });
}

function saveDb() {
  console.log("asdasd");
  var item = getTeamById();
  item.then(function (team) {
    saveForLater(team);
  });
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {

          response.json().then(function (data) {

            let teamHTML = `
          <div class="team-info">
            <div class="team-info__logo">
              <img src="${data.crestUrl}" alt="" />
            </div>
            <div class="team-info__detail">
              <p><b>${data.name}</b></p>
              <p>${data.venue}</p>
              <p>${data.website}</p>
              <p>Established ${data.founded}</p>
            </div>
            <div class="team-info__addto" id="save-team-button" onclick="saveDb()">
              <img src="../images/Add.svg" />
            </div>
          </div>
    `;

            let playerHTML = "<table>";
            data.squad.forEach((player) => {
              playerHTML += `
            <tr>
              <td>${player.shirtNumber == null ? "N/A" : player.shirtNumber}</td>
              <td>${player.name}</td>
              <td>${shortenPos(player.position)}</td>
              <td>${moment(player.dateOfBirth).format('DD-MM-yyyy')}</td>
              <td>${player.nationality}</td>
            </tr>
            `;
            })
            playerHTML += `</table>`;
            document.getElementById("detail-content").innerHTML = teamHTML;
            document.getElementById("player-content").innerHTML = playerHTML;
            resolve(data);
          })
        }
      })

      caches.match(base_url + "teams/" + idParam + "/matches").then(function (response) {
        if (response) {

          response.json().then(function (data) {


            let matchesHTML = "";
            data.matches.reverse().forEach((match) => {
              matchesHTML += `
            <div class="match-box">
               <div class="match-box__competition">
                  <span> ${match.competition.name} </span>
                  <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
               </div>
               <div class="match-box__score">
                  <div class="match-box__score__time">
                    ${match.status === "FINISHED" ? "FT" : " "}
                  </div>
                  <div class="match-box__score__team">
                      <p>${match.homeTeam.name}</p>
                      <p>${match.awayTeam.name}</p>
                  </div>
                  <div class="match-box__score__number">
                      <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                      <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
                  </div>
               </div>
            </div>
              `;
            })
            document.getElementById("matches-content").innerHTML = matchesHTML;

          })
        }
      })
    }

    fetch(base_url + "teams/" + idParam, {
      method: "GET",
      headers: {
        "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {

        let teamHTML = `
      <div class="team-info">
        <div class="team-info__logo">
          <img src="${data.crestUrl}" alt="" />
        </div>
        <div class="team-info__detail">
          <p><b>${data.name}</b></p>
          <p>${data.venue}</p>
          <p>${data.website}</p>
          <p>Established ${data.founded}</p>
        </div>
        <div class="team-info__addto" id="save-team-button" onclick="saveDb()">
        <img src="../images/Add.svg" />
        </div>
      </div>
`;

        let playerHTML = "<table>";

        data.squad.forEach((player) => {
          playerHTML += `
        <tr class="player-table">
           <td>${shortenPos(player.position)}</td>
          <td>${player.name}</td>
          <td>${moment(player.dateOfBirth).format('DD-MM-yyyy')}</td>
          <td>${player.nationality}</td>
          <td>${player.shirtNumber == null ? "N/A" : "#" + player.shirtNumber}</td>
        </tr>
        `;
        })
        playerHTML += `</table>`;
        document.getElementById("detail-content").innerHTML = teamHTML;
        document.getElementById("player-content").innerHTML = playerHTML;
        resolve(data);

      });
    document.getElementById("matches-content").innerHTML = loader;

    fetch(base_url + "teams/" + idParam + "/matches", {
      method: "GET",
      headers: {
        "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {


        let matchesHTML = "";
        data.matches.reverse().forEach((match) => {
          matchesHTML += `
        <div class="match-box">
           <div class="match-box__competition">
              <span> ${match.competition.name} </span>
              <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
           </div>
           <div class="match-box__score">
              <div class="match-box__score__time">
                ${match.status === "FINISHED" ? "FT" : " "}
              </div>
              <div class="match-box__score__team">
                  <p>${match.homeTeam.name}</p>
                  <p>${match.awayTeam.name}</p>
              </div>
              <div class="match-box__score__number">
                  <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                  <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
              </div>
           </div>
        </div>
          `;
        })
        document.getElementById("matches-content").innerHTML = matchesHTML;

      });
  });
}


function getMatchesById(id) {
  if ('caches' in window) {
    caches.match(base_url + "competitions/" + id + "/matches").then(function (response) {
      if (response) {

        response.json().then(function (data) {
          let matchHTML = "";

          data.matches.reverse().forEach((match) => {
            matchHTML += `
            <div class="match-box">
               <div class="match-box__competition">
                  <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
               </div>
               <div class="match-box__score">
                  <div class="match-box__score__time">
                    ${match.status === "FINISHED" ? "FT" : "SCH"}
                  </div>
                  <div class="match-box__score__team">
                      <p>${match.homeTeam.name}</p>
                      <p>${match.awayTeam.name}</p>
                  </div>
                  <div class="match-box__score__number">
                      <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                      <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
                  </div>
               </div>
            </div>
              `;
          })
          document.getElementById("match-content").innerHTML = matchHTML;

        })
      }
    })
  }
  document.getElementById("match-content").innerHTML = loader;

  fetch(base_url + "competitions/" + id + "/matches", {
    method: "GET",
    headers: {
      "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let matchHTML = "";

      data.matches.reverse().forEach((match) => {
        matchHTML += `
        <div class="match-box">
           <div class="match-box__competition">
              <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
           </div>
           <div class="match-box__score">
              <div class="match-box__score__time">
                ${match.status === "FINISHED" ? "FT" : "SCH"}
              </div>
              <div class="match-box__score__team">
                  <p>${match.homeTeam.name}</p>
                  <p>${match.awayTeam.name}</p>
              </div>
              <div class="match-box__score__number">
                  <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                  <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
              </div>
           </div>
        </div>
          `;
      })
      document.getElementById("match-content").innerHTML = matchHTML;

    });
}

const renderSelectLeague = () => {
  if ('caches' in window) {
    caches.match(base_url + "competitions?plan=TIER_ONE").then(function (response) {
      if (response) {

        response.json().then(function (data) {
          var selectLeague = "";
          selectLeague += `<option value="null" class="league-option">select league</option>`
          data.competitions.forEach(function (league) {

            selectLeague += `
      <option class="league-option>${league.name}</option>
        `;
          });
          document.getElementById("league-select").innerHTML = selectLeague;
        })
      }
    })
  }

  fetch(base_url + "competitions?plan=TIER_ONE", {
    method: "GET",
    headers: {
      "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var selectLeague = "";
      selectLeague += `<option value="null" class="league-option">select league</option>`

      data.competitions.forEach(function (league) {

        selectLeague += `
  <option value=${league.id} class="league-option">${league.name}</option>
    `;
      });
      document.getElementById("league-select").innerHTML = selectLeague;

    })
    .catch(error);

}



function getMatchesByIdFilter() {
  let dateFrom = document.getElementById("date-from").value;
  let dateTo = document.getElementById("date-to").value;
  let id = document.querySelector("#league-select").value;

  if ('caches' in window) {
    caches.match(base_url + "competitions/" + id + "/matches?dateFrom=" + dateFrom + "&dateTo=" + dateTo).then(function (response) {
      if (response) {

        response.json().then(function (data) {
          let matchHTML = "";

          data.matches.reverse().forEach((match) => {
            matchHTML += `
            <div class="match-box">
               <div class="match-box__competition">
                  <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
               </div>
               <div class="match-box__score">
                  <div class="match-box__score__time">
                    ${match.status === "FINISHED" ? "FT" : "SCH"}
                  </div>
                  <div class="match-box__score__team">
                      <p>${match.homeTeam.name}</p>
                      <p>${match.awayTeam.name}</p>
                  </div>
                  <div class="match-box__score__number">
                      <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                      <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
                  </div>
               </div>
            </div>
              `;
          })
          document.getElementById("match-content").innerHTML = matchHTML;

        })
      }
    })
  }
  document.getElementById("match-content").innerHTML = loader;
  fetch(base_url + "competitions/" + id + "/matches?dateFrom=" + dateFrom + "&dateTo=" + dateTo, {
    method: "GET",
    headers: {
      "X-Auth-Token": "b4ee75d8c7d64d41962778d248ecf114"
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      let matchHTML = "";

      data.matches.reverse().forEach((match) => {
        matchHTML += `
        <div class="match-box">
           <div class="match-box__competition">
              <span> ${moment(match.utcDate).format('DD-MMMM-yyyy')} </span>
           </div>
           <div class="match-box__score">
              <div class="match-box__score__time">
                ${match.status === "FINISHED" ? "FT" : "SCH"}
              </div>
              <div class="match-box__score__team">
                  <p>${match.homeTeam.name}</p>
                  <p>${match.awayTeam.name}</p>
              </div>
              <div class="match-box__score__number">
                  <p>${match.score.fullTime.homeTeam === null ? "" : match.score.fullTime.homeTeam}</p>
                  <p>${match.score.fullTime.awayTeam === null ? "" : match.score.fullTime.awayTeam}</p>
              </div>
           </div>
        </div>
          `;
      })
      document.getElementById("match-content").innerHTML = matchHTML;

    });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    let myTeamHTML = "";
    if (teams.length == 0) {
      myTeamHTML += `<p>You can choose your favourite team in Team Page</p>`
    }
    teams.forEach((team) => {
      
      myTeamHTML += `<p>${team.name}</p>
      <img src="${team.crestUrl}" />
      
      <div onclick="deleteFromDb(${team.id})" class="myteam__delete">DELETE</div>
      <div onclick="window.location='team.html?id=${team.id}'" class="myteam__detail" >DETAIL</div>
  `;
    })

    document.getElementById("my-team").innerHTML = myTeamHTML;
  });
}
