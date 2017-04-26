$(function() {
  $("#btnOK").click(makeBattleZone);

  makeBattleZone(); // by default set up the game

  function makeBattleZone() {
    var columns = $("#columns").val();

    var shipSize = 3;

    // ship
    //var randomLoc = Math.floor(Math.random() * 5); // random 0 to 4
    var randomLoc = Math.floor(Math.random() * (columns-(shipSize-1))); // random
    var location1 = randomLoc;
    var location2 = location1 + 1;
    var location3 = location2 + 1;

    var guesses = 0;
    var hits = 0;


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

    /* handle user guess */
    $("td").click(function(td) {
      //alert("Clicked: " + td.target.id);
      var guess = td.target.id;

      guesses++;

      if (guess == location1 || guess == location2 || guess == location3) {
        $(td.target).addClass("hit");
        hits++;
        $("#hits").val(hits);

        if (hits == shipSize) {
          $("#message").text("You sank my battleship!");
        }
      } else {
        $(td.target).addClass("miss");
      }

      $("#guesses").val(guesses);
      $("#accuracy").val(hits / guesses);
    });
  }
});
