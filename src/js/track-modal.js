(function($) {
  "use strict"; // Start of use strict

  var tracks = [
    {
      id: "Good Health & Wellbeing",
      title: "Good Health & Wellbeing",
      body:
        "You can start by promoting and protecting your own health and the health of those around you, by making well-informed choices, practicing safe sex, and vaccinating your children. You can raise awareness in your community about the importance of good health, healthy lifestyles, as well as peoples’ rights to quality health care services -especially for the most vulnerable, such as women and children. You can also hold your government, local leaders, and other decision makers accountable to their commitments to improve people’s access to health and health care.",
    },
    {
      id: "Quality Education",
      title: "Quality Education",
      body: "Ask our governments to place education as a priority in both policy and practice. Lobby our governments to make firm commitments to provide free primary school education to all, including vulnerable or marginalized groups."
    },
    {
      id: "Sustainable Cities",
      title: "Sustainable Cities",
      body: "Take an active interest in the governance and management of your city. Advocate for the kind of city you believe you need. Develop a vision for your building, street, and neighbourhood, and act on that vision. Are there enough jobs? Can your children walk to school safely? Can you walk with your family at night? How far is the nearest public transport? What’s the air quality like? What are your shared public spaces like? The better the conditions you create in your community, the greater the effect on quality of life."
    },
    {
      id: "Decent Work & Economic Growth",
      title: "Decent Work & Economic Growth",
      body:"Providing youth with the best opportunity to transition to a decent job calls for investing in education and training of the highest possible quality, providing youth with skills that match labour market demands, giving them access to social protection and basic services regardless of their contract type, as well as levelling the playing field. "
    },
    {
      id: "Industry, Innovation, & Infrastructure",
      title: "Industry, Innovation, & Infrastructure",
      body:"Establish standards and promote regulations that ensure company projects and initiatives are sustainably managed. Collaborate with NGOs and the public sector to help promote sustainable growth within developing countries. Think about how industry impacts on your life and well-being and use social media to push for policymakers to prioritize the SDGs.",
    },
    {
      id: "Reduced Inequalities",
      title: "Reduced Inequalities",
      body: "Reducing inequality requires transformative change. Greater efforts are needed to eradicate extreme poverty and hunger, and invest more in health, education, social protection, and decent jobs - especially for young people, migrants and refugees and other vulnerable communities. Within countries, it is important to empower and promote inclusive social and economic growth. We can ensure equal opportunity and reduce inequalities of income if we eliminate discriminatory laws, policies, and practices.",
    },
  ];

  function getNextTrackIndex(currentTrackId) {
    var currentIndex = tracks
      .map(function(track) {
        return track.id;
      })
      .indexOf(currentTrackId);

    return currentIndex === tracks.length - 1 ? 0 : currentIndex + 1;
  }

  function setTrackData(track) {
    var modal = $("#trackModal");
    modal.find(".modal-title").text(track.title);
    modal.find(".modal-body").text(track.body);
    modal.find(".track-img").css("background", 'url("' + track.img + '")');
    modal.data("id", track.id);
  }

  $("#trackModal").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var selectedTrackId = button.data("track"); // Extract info from data-* attributes

    var selectedTrack = tracks.filter(function(track) {
      return track.id === selectedTrackId;
    })[0];

    setTrackData(selectedTrack);
  });

  $("#nextTrack").on("click", function() {
    var currentTrackId = $("#trackModal").data("id");

    setTrackData(tracks[getNextTrackIndex(currentTrackId)]);
  });
})(jQuery); // End of use strict
