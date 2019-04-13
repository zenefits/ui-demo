Here's how we do cross browser testing with VMs on a Mac:

1.  Install Virtual Box from https://www.virtualbox.org/wiki/Downloads

1.  Download the file _Zenefits - Win10 - before AD Bind.zip_ from https://zenefits.box.com/s/xv1r3vzn5et8uw09ez8qh6eces5qkgmu

1.  Open _Zenefits - Win10 - before AD Bind.zip_ and open _Zenefits - Win10 - before AD Bind.vbox_

1.  Windows VM should be open and you will be prompted to login as _zenefits-test_, the password is `ChangeMe98%`

1.  After login, you might see a _Readme_ file on desktop, please read

1.  For apps to work locally in IE 11, run `BABEL_ENV='production' yarn start` for the app you want to start and for the graphql server in YP3, run `BASEURL=http://localhost:8000 yarn start` .

1.  Now you can start testing IE and Edge by going to something like http://10.0.2.2:3020/app/example/#/overview (in VM `localhost` is replaced by `10.0.2.2`)

1.  Ask IT people (e.g. Artie) to bind your VM to Active Directory.
