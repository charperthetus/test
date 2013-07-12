savanna-4
=========

HTML client interface for Savanna 4

## Installation

Once you have cloned this repos, you will need to go into `src/` and run `npm install` which will get everything set up for you to be able to use [Node.js](http://nodejs.org/) as your server (of course this assumes you have Node.js](http://nodejs.org/) installed).

From there, if you are using IntelliJ Idea, you need to go to `Run -> Edit Configurations` and create a "Node" configuration that has `Working Directory` set to the path to `src/` and `Path to Node App js File` set to `server.js`.  Then it's as simple as starting the server from the toolbar.

If you like CLI, you can `cd /path/to/repos/src` and then `node server.js` which will do the same thing.

Next, you will need to navigate (via command line) to `src/public` and run `sencha app build` to build out the theme resources for thie project (NOTE: requires [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download))

Also, if this is your first time pulling up this app since you last started your browser, you will need to navigate to the certificate server to allow the browser to use the certificate.

Do this by:

1) Navigating to the app index page with your favorite browser's devtools enabled to see network activity
2) When you get the white screen, look for a failed request to GET loggedIn.html
3) Open the URL for that page in a new tab
4) Accept the certificate (you may have to do this more than once)
5) Navigate back to the index.html page for the application and it should come up

NOTE: you should only have to do this after quitting your browser, so even if your session times out, if the browser is still open you should be able to see the login page show up correctly.


