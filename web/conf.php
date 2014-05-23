<?php
$conf = Array(
   "cache"   => "./cache/",           // Location to cache status requests.
   "cache-time" => 5,                 // How long (in seconds) to keep cache.
   "update"  => 10,                   // How long (in seconds) for the servers to update.
   "servers" => Array(                // Array of servers to query.
          "hostname.tld" => "http://hostname.tld:port/",
          "hostname2.tld" => "http://hostname2.tld:port/",
          "subdomain.hostname.tld" => "http://subdomain.hostname.tld:port/",
    ),
);
?>
