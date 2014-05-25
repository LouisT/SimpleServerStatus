Simple Status Server (v0.0.1-2)
=====
NOTE: Only tested on Linux and FreeBSD! Support for other platforms should be added eventually.

Tested with: Node.js 0.10.28, PHP5

A better README to come! For now, place the "web" files wherever you want to display the status for your servers.

Edit "conf.php" within the "web" folder to point to the servers you want to monitor.

Put "sss" on the servers you want to monitor and run.


Running:
------
    NOTE: Make sure "sss" is executable. Edit "conf.js" to fit your needs!

    Option 1) ./sss > /dev/null 2>&1 &
    Option 2) node sss > /dev/null 2>&1 &

    Cron   1) */5 * * * * /path/to/sss > /dev/null 2>&1
    Cron   2) */5 * * * * /path/to/node /path/to/sss > /dev/null 2>&1
