<html>
  <head>
    <title>Trendy</title>
    <link rel="stylesheet" href="css/foundation.css" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/vendor/modernizr.js"></script>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/fastclick.js"></script>
    <script src="js/java.js"></script>
  </head>
        
  <body>
    <div class="wrap">
      <div id="topbar">
        Topic: <input type="txt" id="topic">
        Site Name: <input type="txt" id="sitename">
        Number of Results: <input type="txt" id="numresults" size="2" value="5">
        <br/>
        <button type="button" onclick="search()" class="small round button" id="searchbutton">Search</button>
        <button type = "button" onclick="save()" class = "small round button" id="save">Save Current Article List</button>
      </div>

      <div id="topicbar">
      </div>

      <div id="articlebox">
      </div>
    </div>
  </body>
</html>
