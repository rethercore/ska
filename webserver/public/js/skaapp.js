var url = new URL(window.location.href);

if (url.searchParams.get("id") != null){
  $.get("/api/check?id="+ url.searchParams.get("id") ).done(function(data) {
    if (data.state === 1){
      $("#p3").show();
      $("#p1").hide();
      new QRCode(document.getElementById("qrcode"), "0x"+ data.Address);
      $("h4").text("0x"+data.Address);
      $("#link1").attr('href',window.location.href)
    }else if (data.state === 2 ){
      $("#p1").hide();
      $('#p4').show();
      $("#link2").attr('href',"https://blockchain.info/tx/" + data.txno);
    }else if (data.state === 3 ){
      $("#p1").hide();
      $("#p5").show();
    }else if (data.state === 4 ){
      $("#p1").hide();
      $("#p5").show();
    }
  })
  .fail(function(data) {
    $("#p5").show();
  })
}else{
  $("#p1").show();
  $("#p2").hide();
  $("#p3").hide();
  $("#p4").hide();
  $("#p5").hide();
}


var getID = function(id) {
  $.get("/check?id="+ id , function(data){
    alert("Data: " + data);
  });
}

$("#p1b").submit(function(e){
  e.preventDefault();
  $("#p1").hide();
  $("#p2").show();
// TBD add BTC address fetch logic
});

$("#p2b").submit(function(e){
  e.preventDefault();
  $("#p2").hide();
  var addr = $("#i1addr").val();
  console.log($("#i1addr"),addr);
  $.get("/api/init?address="+ $("#i1addr").val() ).done(function(data) {
    $("#p3").show();
    new QRCode(document.getElementById("qrcode"), "0x"+ data.Address);
    $("h4").text("0x"+data.Address);
    $("#link1").attr('href',window.location.href + "?id=" + data.Txno)
  })
  .fail(function(data) {
    $("#p5").show();
  })
});
