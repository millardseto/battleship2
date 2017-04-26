$(function() {
  var location1;
  var location2;
  var location3;
  var guesses = 0;
  var hits = 0;
  var isSunk = false;
  var shipSize = 3;

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

    var columns = $("#columns").val();

    // ship
    //var randomLoc = Math.floor(Math.random() * 5); // random 0 to 4
    var randomLoc = Math.floor(Math.random() * (columns-(shipSize-1))); // random
    location1 = randomLoc;
    location2 = location1 + 1;
    location3 = location2 + 1;


    /* remove table if it already exists */
    $("#myTable").remove();
    $("#message").text("");


    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);

    /* loop and create cells with unique ids */
    for (i = 0; i < columns; i++) {
      var z = document.createElement("TD");
      z.setAttribute("id", i);
      var t = document.createTextNode(i);
      z.appendChild(t);
      document.getElementById("myTr").appendChild(z);
    }

    // we have a new table every time, so rebind event everytime
    /* handle user guess */
    $("td").click(function(td) {
      // if user already click on this before, or if game is over, do nothing.
      if (td.target.className == "hit" || td.target.className == "miss" || isSunk) {
        return;
      }

      var guess = td.target.id;

      guesses++;

      if (guess == location1 || guess == location2 || guess == location3) {
        $(td.target).removeClass("cheat");
        $(td.target).addClass("hit");
        hits++;
        $("#hits").val(hits);

        if (hits == shipSize) {
          $("#message").text("You sank my battleship!");
          isSunk = true;
          //$("#myTable").find("*").attr("disabled", "disabled"); // game is over, block user from clicking
        }
      } else {
        $(td.target).addClass("miss");
      }

      $("#guesses").val(guesses);
      $("#accuracy").val(hits / guesses);
    }); // end on click for user guess

  } // end makeBattleZone



  // reveal where ship is
  $("#cheat").click(function(chkCheat){
    $("#"+location1).toggleClass("cheat");
    $("#"+location2).toggleClass("cheat");
    $("#"+location3).toggleClass("cheat");
  });





});
