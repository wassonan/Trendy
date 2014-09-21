function search(){
  
  var site = $("#sitename");
  var topic = $("#topic");
  var numResults = $("#numresults");

  addTopic(topic, site);
} //search

var topics = [];
var sites = [];
var numTopics = 0;
var activeArticle = null;
var activeTopic = null;
var tals = [];

function addTopic(topic, site){ 
  $(".article").hide("fast");
  $(".topic").removeClass("selected");

  var topicBar = $("#topicbar");
  numTopics++;
  jQuery('<div/>', {
    class: "topic", id: "topic" + numTopics,
    text: topic.val()
  }).appendTo(topicBar);

  topics[numTopics] = topic.val();
  sites[numTopics] = []
  var title = [];
  var link = [];
  var count = 0;

  $.ajax({
    type: "POST",
    url: "search.php",
    async: false,
    data: {topic: topic.val(), site: site.val()}
  })

    .then(function(msg){

      tals[numTopics] += msg;
      while(msg.indexOf("^") != -1){

        title[count] = msg.substr(0, msg.indexOf("@"));
        link[count] = msg.substr(msg.indexOf("@") + 1, msg.indexOf("^")); 
        msg = msg.substr(msg.indexOf("^") + 1);
        count++;
      } //while
    });

  var articleBox = $("#articlebox");
  articleBox.append(jQuery('<div/>', {
    class: "article",
    id: "article" + numTopics
  }));
  
  $("#article" + numTopics).append("<h1>" + site.val() + "</h1><ul>");

  for(var i = 0; i < count; i++){

    $("#article" + numTopics).append(jQuery("<li><a href='" + link[i] + "'>" + title[i] + "</a></li>"));
  } //for

  $("#article" + numTopics).append("</ul><p class='more' id='more" + numTopics + "'>More Results</p>");
  articleBox.append($("article" + numTopics));

  $("#topic" + numTopics).addClass("selected");
  activeArticle = $("#article" + numTopics);
  activeTopic = $("#topic" + numTopics);

  $("#topic" + numTopics).click(function(){
    $(".topic").removeClass("selected");
    $(this).addClass("selected"); $(".article").hide("fast");
    var id = $(this).attr('id');
    var num = id.charAt(id.length - 1);
    $("#article" + num).show("fast");
    activeArticle = $("#article" + num);
    activeTopic = $("#topic" + num);
  });
} //addTopic

function moreResults(){

} //moreResults

function save(){
}
