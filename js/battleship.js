$(function() {
  var location1;
  var location2;
  var location3;
  var guesses = 0;
  var hits = 0;
  var isSunk = false;
  var shipSize = 3;
  var locationRow;

  var audioHit = new Howl({
    src: ['./sounds/grenade.wav']
  });

  var audioMiss = new Howl({
    src: ['./sounds/splash.wav']
  });

  $("#btnOK").click(makeBattleZone);

  makeBattleZone(); // by default set up the game
  function makeBattleZone() {
    // reset values
    isSunk = false;
    hits = 0;
    guesses = 0;

    // reset UI
    $("#cheat").prop("checked", false);
    $("#hits").val(0);
    $("#guesses").val(0);
    $("#accuracy").val(0);
    $("#message2").html('');

    var areaSize = $("#columns").val();

    // ship
    //var randomLoc = Math.floor(Math.random() * 5); // random 0 to 4
    var randomLoc = Math.floor(Math.random() * (areaSize-(shipSize-1))); // random
    location1 = randomLoc;
    location2 = location1 + 1;
    location3 = location2 + 1;

    locationRow = Math.floor(Math.random() * areaSize); // ex: if areaSize = 7, then random number between 0 and 6.


    /* remove table if it already exists */
    $("#myTable").remove();
    $("#message").text("");


    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    $("#battleArea").append(x);


    for (row = 0; row < areaSize; row++){
      var newRow = document.createElement("TR");
      document.getElementById("myTable").appendChild(newRow);

      /* loop and create cells with unique ids */
      for (i = 0; i < areaSize; i++) {
        var newTD = document.createElement("TD");
        var t = document.createTextNode("●");
        newTD.appendChild(t);
        newRow.appendChild(newTD);
      }
    }

    // we have a new table every time, so rebind event everytime
    /* handle user guess */
    $("td").click(function(td) {
      // if user already click on this before, or if game is over, do nothing.
      if (td.target.className == "hit" || td.target.className == "miss" || isSunk) {
        return;
      }

      /* determine (x,y) */
      var guessX = td.target.cellIndex;
      var guessY = td.target.parentElement.rowIndex;

      guesses++;

      if ((guessX == location1 || guessX == location2 || guessX == location3) && guessY == locationRow) {
        $(td.target).removeClass("cheat");
        $(td.target).addClass("hit");
        hits++;
        $("#hits").val(hits);

        audioHit.play();

        if (hits == shipSize) {
          $("#message").text("You sank my battleship!");
          isSunk = true;
          $("#message2").html("<img src='./images/sunk.gif' alt='sinking ship' class='img-circle'>");
        }
      } else {
        $(td.target).addClass("miss");
        audioMiss.play();
      }

      $("#guesses").val(guesses);
      $("#accuracy").val(hits / guesses);
    }); // end on click for user guess

  } // end makeBattleZone



  // reveal where ship is
  $("#cheat").click(function(chkCheat){
    var table = $("#myTable")[0];
    var cell1 = table.rows[locationRow].cells[location1];
    var cell2 = table.rows[locationRow].cells[location2];
    var cell3 = table.rows[locationRow].cells[location3];

    $(cell1).toggleClass("cheat");
    $(cell2).toggleClass("cheat");
    $(cell3).toggleClass("cheat");
  });

  $("#playMusic").click(function(chk){
    audio = document.getElementById("musicPlayer");
    if (chk.target.checked) {
      audio.play();
    } else {
      audio.pause();
    }
  });

});
