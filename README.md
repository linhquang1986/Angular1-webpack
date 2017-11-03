README
======

Serverless AngularJS.org v. 1.6 Client for THX Mark site

### Getting Started

Vagrant Install

1.	install [Vagrant](vagrantup.com) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for your host
2.	clone repo, open terminal, and command `vagrant up` and wait while box is downloaded and provisioned
3.	type `vagrant ssh` and then `cd /vagrant` from within the ssh session

Boostrapping the Dev env

1.	from within Vagrant, type `npm install`*NB- we use Node/npm/bower to manage the dev package environment, but production will be Serverless*
2.	start the dev server with `npm start` The App is available on 10.10.10.61:8000 of the host or localhost:8000 of the vagrant guest

Run Build

1. from within Vagrant, type `npm run build:prod` to build for production, all files will be stored in dist/ folder
2. start the http server with `npm run start:server` The App is available on 10.10.10.61:8000 of the host or localhost:8000 of the vagrant guest

Multiple site

1. add flag `--sitetype='value'` in run script, ie. `npm run build:prod --sitetype='production'`
2. by default `--sitetype='production'` for production build and `--sitetype='testing'` for development build


### Who do I talk to?

-	vincent@thx.com for repo and technical issues
-	peter@thx.com for all project matters
