var topics = {};

function search(){

  var site = $("#sitename").val(); // the name of the site being searched
  var topic = $("#topic").val(); //the topic being searched
  var numResults = $("#numresults").val(); //the number of results requested

  // if the topic is new
  if(topics[topic] == null){

    topics[topic] = {};
    topics[topic]["id"] = Object.keys(topics).length;
    topics[topic]["html"] = $('<div>', {
      class: "topic", 
      id: "topic" + topics[topic]["id"],
      text: topic});
    $("#topicbar").append(topics[topic]["html"]);

    topics[topic]["articlehtml"] = $('<div>', {
      class: "article",
      id: "article" + topics[topic]["id"]
    });

    $("#articlebox").append(topics[topic]["articlehtml"]);

    topics[topic]["html"].click(function(){

      $(".topic").removeClass("selected");
      $(this).addClass("selected");
      $(".article").hide("fast");

      var id= $(this).attr("id").substr(5);
      $("#article" + id).show("fast");
    });
  } //if

  $(".topic").removeClass("selected");
  topics[topic]["html"].addClass("selected");

  // if the site is new to the topic
  if(topics[topic][site] == null){

    topics[topic][site] = {};
    topics[topic][site]["id"] = "T" + topics[topic]["id"] + "S" + site;
    topics[topic][site]["html"] = $('<div>');
    topics[topic][site]["html"].append("<h1>" + site + "</h1><ul>");
    topics[topic][site]["linkhtml"] = $('<div class="test">');
    topics[topic][site]["html"].append(topics[topic][site]["linkhtml"]);
    topics[topic][site]["html"].append("</ul><button type='button' onclick='more(this)' id='more" + topics[topic][site]["id"] + "'>More Results</p>");

    topics[topic]["articlehtml"].append(topics[topic][site]["html"]);
  } //if

  $(".article").hide("fast");
  topics[topic]["articlehtml"].show("fast");

  var prevLinks = ""; //contains the previous links on the site on the topic

  if(topics[topic][site][links] == null)
    topics[topic][site][links] = [];

  for(link in topics[topic][site][links]){

    prevLinks = prevLinks.concat(link).concat("^");
  } //for

  var titles = []; //the list of new titles
  var links = []; //the list of new links
  var tals = ""; //contains the titles and links in one string
  var count = 0; //the count of new links

  //requests that the php server return the search results
  $.ajax({
    type: "POST",
    url: "search.php",
    async: false,
    data: {topic: topic, site: site, num: numResults, prevLinks: prevLinks}
  })
  .then(function(msg){

    console.log(msg);
    //pases the returned msg for the links and titles
    while(msg.indexOf("^") != -1){

      titles[count] = msg.substring(0, msg.indexOf("@"));
      links[count] = msg.substring(msg.indexOf("@") + 1, msg.indexOf('^'));
      msg = msg.substr(msg.indexOf("^") + 1);
      count ++;
    } //while
  }); //then

  //for each link returned add it to the site list
  for(var i = 0; i < count; i++){
    
    topics[topic][site]["linkhtml"].append("<li><a target='_blank' href='" + links[i] + "'>" + titles[i] + "</a></li>");
  } //for
} //search

function more(mRes){

  var id = $(mRes).attr("id");
  var topic = $(mRes).attr("id").substring(5, $(mRes).attr("id").indexOf("S"));
  var site =  id.substring(id.indexOf("S") + 1);
  
  for(topi in topics){

    if(topi["id"] = topic)
      topic = topi;
  } //for


  console.log(topic);
  
  $("#topic").val(topic);
  $("#sitename").val(site);

  search();
} //more
