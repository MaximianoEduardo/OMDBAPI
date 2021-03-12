const handleSearch = () => {
  $("#search").on("click", function () {
    let value = $("#input")[0].value;

    let string = value.replace(" ", "&");

    axios
      .get("http://www.omdbapi.com/", {
        params: {
          t: string,
          apikey: "5ea2fa4a",
          plot: "full",
        },
      })
      .then((response) => {
        $(".movieLoading").addClass("loading");
        const data = response.data;

        data.Response === false
          ? setTimeout(() => {
              $(".movieLoading").removeClass("loading");
              $(".movie").addClass("done");

              $(".movie .title h2").text("Filme não entrado");

              $(".movie").addClass("notFound");
            })
          : setTimeout(() => {
              $(".movieLoading").removeClass("loading");
              $(".movie .description").remove("notFound");

              let title = data.Title;
              let plot = data.Plot;
              let actor = data.Actors;
              let poster = data.Poster;

              $(".movie .title h2").text(`${title}`);

              $(".movie .description p").text(`${plot}`);

              $(".movie .infos #Actor p").text(`${actor}`);

              $("#image").attr("src", poster);
            }, 1000 * 3);

        console.log(response);
      });
  });
};

const handleClear = () => {
  $("#reset").on("click", function () {
    $(".movie").removeClass("done");
  });
};

$(window).on("load", function () {
  handleSearch();
});
