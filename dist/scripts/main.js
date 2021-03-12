"use strict";

var handleSearch = function handleSearch() {
  $("#search").on("click", function () {
    var value = $("#input")[0].value;
    var string = value.replace(" ", "&");
    axios.get("http://www.omdbapi.com/", {
      params: {
        t: string,
        apikey: "5ea2fa4a",
        plot: "full"
      }
    }).then(function (response) {
      $(".movieLoading").addClass("loading");
      var data = response.data;
      data.Response === false ? setTimeout(function () {
        $(".movieLoading").removeClass("loading");
        $(".movie").addClass("done");
        $(".movie .title h2").text("Filme não entrado");
        $(".movie").addClass("notFound");
      }) : setTimeout(function () {
        $(".movieLoading").removeClass("loading");
        $(".movie .description").remove("notFound");
        var title = data.Title;
        var plot = data.Plot;
        var actor = data.Actors;
        var poster = data.Poster;
        $(".movie .title h2").text("".concat(title));
        $(".movie .description p").text("".concat(plot));
        $(".movie .infos #Actor p").text("".concat(actor));
        $("#image").attr("src", poster);
      }, 1000 * 3);
      console.log(response);
    });
  });
};

var handleClear = function handleClear() {
  $("#reset").on("click", function () {
    $(".movie").removeClass("done");
  });
};

$(window).on("load", function () {
  handleSearch();
});
