/*
 Config file for SimpleServerStatus
*/
module.exports = {
    title: "SSServer",                                   // Title for this process.
    addr: "0.0.0.0",                                     // IP to bind to.
    port: 8880,                                          // Port to bind to.
    hostname: "domain.tld",                              // Override the server host name. (optional)
    disk: {                                              // Only supported on Linux and FreeBSD currently!
        drive: '/',                                      // Drive to display
        display: true,                                   // Display disk usage.
    },
    load: {
        alert: 3,                                        // How high the load can be before an alert is shown.
        display: true,                                   // Display load averages.
        update: 5000,                                    // How often to pull load averages. (in ms)
    },
    provider: {
        name: "Provider Name",                           // The name of your server provider.
        url: "http://provider-url.tld/",                 // Provider url.
        location: "City, State",                         // Location of your server.
    },
    information: {
        services: ["Node.js"],                           // Services running on the server.
    },
    network: {                                           // Only supported on Linux and FreeBSD currently!
        update: 5000,                                    // How often to pull network traffic. (in ms)
        display: true,                                   // Display network traffic.
        iface: "eth0",                                   // Network inerface to query.
    },
};
