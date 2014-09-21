<?php
  $topic = $_POST["topic"];
  $site = $_POST["site"];
  $prev = $_POST["prevLinks"];
  $num = $_POST["num"];

/*  if($prev != "")
    $thing = popen("python " + $site + " " + $topic + " " + $num + " " + $prev, "r");

  else
    $thing = popen("python " + $site + " " + $topic + " " + $num, "r");

  $read = fread($thing, 2096);

  echo $read;
  pclose($thing);
 */
/*  $descriptorspec = array(
   0 => array("pipe","r"),
    1 => array("pipe","w"),
    2 => array("file","./error.log","a")
  ) ;

   $cwd = './' ;
   $process = proc_open('./trendy.py ' . $site . $topic . $num . $prev, $descriptorspec, $pipes, $cwd) ;
   if (is_resource($process)) {// print pipe output
   echo stream_get_contents($pipes1) ;// close pipe
   fclose($pipes1) ;
   proc_close($process) ;}
 */

  $stuff = 'python trendy.py '  . $site . ' ' . $topic . ' ' . $num .' ' . $prev;
/*
  $mystring = system('python trendy.py '  . $site . ' ' . $topic . ' ' . $num .' ' . $prev, $test);
  echo $mystring . $test . $stuff;
 */
  $command = escapeshellcmd("./test.sh");
  $output = exec($command, $debug, $ret);
  echo $output . implode("|", $debug) . $ret;
?>
