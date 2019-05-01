# Example App

<Short app description>

### Local setup/development:

First make sure you have your backend servers running (YP3 and Graphql server).

- For more information about general local setup (YP3) go here ([Local Machine Setup](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=ENG&title=Local+Machine+Setup+Guide)).
- For info about graphql go here ([Graphql readme in YP3 repo](https://github.com/zenefits/yourPeople3/tree/master/graphql))

The commands used to run this app are the same as any other react app under [z-frontend](https://github.com/zenefits/z-frontend).

Run the <TODO app-name> Admin/Console view using given URL's: 1. Admin View :
`http://localhost:TODO/app/TODO/#/TODO` 2. Console View:
`http://localhost:TODO/app/TODO/#/console/company/{companyId}/TODO/`

#### Seeder

In order to populate your database with the demo data for <TODO> using seeders, do the following steps:

1.  Go to the django shell
2.  Run the following commands in that shell

```
<TODO>
```

#### Console

To be able to access console views locally, you need to create a superuser with the following command in the root directory of YP3:
`python manage.py createsuperuser`

#### Pre-seeded data

If you're using the growth seeders use the following credentials to test the app:

_Admin_: <TODO:email>/<TODO:password>
_EE_: <TODO:email>/<TODO:password>
_Console_: <TODO:email>/<TODO:password>
