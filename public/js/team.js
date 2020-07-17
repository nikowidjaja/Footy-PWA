let player=document.getElementById('select-player');
let match=document.getElementById('select-match');

let playerContent=document.getElementById('player-content');
let matchesContent=document.getElementById('matches-content');

player.addEventListener('click', function() {
    match.classList.remove("active-select");
    player.classList.add("active-select");
    playerContent.classList.remove("hide-content");
    matchesContent.classList.add("hide-content");
})

match.addEventListener('click', function() {
    player.classList.remove("active-select");
    match.classList.add("active-select");
    matchesContent.classList.remove("hide-content");
    playerContent.classList.add("hide-content");
}) 