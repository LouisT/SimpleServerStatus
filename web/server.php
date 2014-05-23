<?php
error_reporting(0);
header("Content-Type: application/json");
if (!isset($_GET["callback"])) {
   die(json_encode(Array("error"=>"No callback specified.")));
};
include_once 'conf.php';
if (isset($_GET["id"])) {
   $id = $_GET["id"];
   if (isset($conf["servers"][$id])) {
      $url = $conf["servers"][$id];
      $md5 = md5($url);
      $file = $conf["cache"].$md5;
      if (!@file_exists($file) || @filemtime($file) < time()-$conf["cache-time"]) {
         if (($json = @file_get_contents($url))) {
            file_put_contents($file,$json);
          } else {
            $json = json_encode(Array("error"=>"Could not read from server.","offline"=>true));
         };
       } else {
         $json = file_get_contents($file);
      };
    } else {
      $json = json_encode(Array("error"=>"No such server."));
   };
 } else if (isset($_GET["list"])) {
   $json = json_encode(Array("update"=>$conf["update"],"ids"=>array_keys($conf["servers"])));
 } else {
   $json = json_encode(Array("error"=>"No server ID."));
};
if (isset($id)) {
   $json = json_decode($json,true);
   $json["__requestid__"] = $id;
   $json = json_encode($json);
};
echo $_GET["callback"]."(".$json.")";
?>
