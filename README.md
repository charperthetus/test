savanna-4
=========

HTML client interface for Savanna 4

## Prerequisites
1. Git
2. Ruby (gems)
3. Sencha CMD
4. Maven (and a settings.xml from [Artifactory](http://artifactory))
5. Node.js
6. Phantom.js (optional)

For Mac users, a bulk of this can be aquired by downloading X-Code and installing Developer Tools. Things like git, ruby and maven will be added.

## Installation

Once you have cloned this repos, you will need to go into `src/` and run `npm install` which will get everything set up for you to be able to use [Node.js](http://nodejs.org/) as your server (of course this assumes you have Node.js](http://nodejs.org/) installed).  If you are using Idea12 you should have the Node.js plug-in already available.  If not, it is a standard IntelliJ plugin.

From there, if you are using IntelliJ Idea, you need to go to `Run -> Edit Configurations` and create a "Node" configuration that has `Working Directory` set to the path to `src/` and `Path to Node App js File` set to `server.js`.  Then it's as simple as starting the server from the toolbar. It's also important to set the working directory to `src/` as the test-chooser is expecting the file structure to be setup with `src/` being the root of the project.

If you like CLI, you can `cd /path/to/repos/src` and then `node server.js` which will do the same thing.

Next, you will need to navigate (via command line) to `src/public` and run `sencha app build` to build out the theme resources for thie project (NOTE: requires [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download) which in turn requires [Ruby 1.9.3](http://www.ruby-lang.org/en/downloads/))

### Sencha Cmd installation

1) validate that you have ruby 1.9.3 installed
2) if you do not, either install [rvm](https://rvm.io/rvm/install) and install 1.9.3 (setting it to be your default version) or directly install it from [ruby-lang.org](http://www.ruby-lang.org/en/downloads/).
1) Dowload [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/download)
2)

Also, if this is your first time pulling up this app since you last started your browser, you will need to navigate to the certificate server to allow the browser to use the certificate.

Do this by:

1) Navigating to the app index page with your favorite browser's devtools enabled to see network activity
2) When you get the white screen, look for a failed request to GET loggedIn.html
3) Open the URL for that page in a new tab
4) Accept the certificate (you may have to do this more than once)
5) Navigate back to the index.html page for the application and it should come up

NOTE: you should only have to do this after quitting your browser, so even if your session times out, if the browser is still open you should be able to see the login page show up correctly.


## Theme updates

In order to pull in any changes made to the theme, you will need to run the `mvn clean package` command in the root of the project to pull in said changes.

## Troubleshooting

Q: I'm getting 404's in my project looking for `thetus-uikit`, what gives?
A: UIKit is a separate resource that is a Maven dependency in this project. Run `mvn clean package` in the root of the project to download it (it's not under git).

Q: My `mvn` is failing on UIKit, saying the resource is unavailable.
A: You need a `settings.xml` in the `.m2` of your machine. Typically this is in your home (~) folder on Mac/Unix machines and IS HIDDEN! Visit [Artifactory](http://artifactory) to generate one.

Q: The `mvn` build is failing saying that it can't resolve or find phantom.js
A: You need to export it in your `.bash_profile` (or equivalent) on your machine. This might look like: `export PATH:/Users/your-name/bin/Sencha/Cmd/3.1.2.342/phantomjs/phantomjs`

Q: My build is warning me that the deft.js dependency isn't being resolved.
A: This should now be fixed, but you'll likely need to run `sencha repo add -address http://packages.deftjs.org/ -name deftjs`

Q: My theme isn't working properly, or my JavaScrip override isn't working.
A: Currently, `mvn clean package` and `sencha app build` don't update the bootstrap.js manifest (which organizes the javascript class-path mapping). Run `sencha app refresh && sencha app build` to resolve.