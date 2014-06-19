<?php
$conf = Array(
   "cache"   => "./cache/",           // Location to cache status requests.
   "cache-time" => 5,                 // How long (in seconds) to keep cache.
   "update"  => 10,                   // How long (in seconds) for the servers to update.
   "servers" => Array(                // Array of servers to query.
         // "opts" is the http options for stream_context_create in stream_context_create(array('http'=>$opts));
         "hostname.tld" => Array("url" => "http://hostname.tld:port/", "opts" => Array("timeout" => 5)),
         "hostname2.tld" => Array("url" => "http://hostname2.png/", "opts" => Array("timeout" => 5)),
         "subdomain.hostname2.tld" => Array("url" => "http://subdomain.hostname2.png:8880/", "opts" => Array("timeout" => 5)),
    ),
);
?>
