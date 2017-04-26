$(function(){
  $("#btnOK").click(makeBattleZone);

  function makeBattleZone() {

    var columns = $("#columns").val();

    /* remove table if it already exists */
    $("#myTable").remove();

    var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    document.body.appendChild(x);

    var y = document.createElement("TR");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);

    /* loop and create cells with unique ids */
    for(i = 0; i < columns; i++) {
      var z = document.createElement("TD");
      z.setAttribute("id", i);
      var t = document.createTextNode(i);
      z.appendChild(t);
      document.getElementById("myTr").appendChild(z);
    }


  }
});
