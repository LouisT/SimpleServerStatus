<?php
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0",false);
header("Expires: Tue, 29 Jan 1991 12:00:00 GMT");
header("Pragma: no-cache");
header("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT");
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
