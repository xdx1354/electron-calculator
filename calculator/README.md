### Electron App

To run **Electron App**
```bash
cd .\contraprint\calculator
npm run electron
```
This runs scrips from `.\contraprint\calculator\package.json` which:
- tries to run server.js (_not existing yet_)
- runs client app (_react frontend app_)


### React Web App

To run **React Web App**

```bash
cd .\contraprint\calculator\client
npm start
```


### Project structure
Project is divided into 3 parts:

- React Web App in `/client` dir
- Node.js server in `/server` dir (_to be implemented_)
- `./calculator` dir which holds both `/client` and `/sever` dirs and **Electron** config

### Approach overview

Goal of the Node.js server is to provide possibility for storing configuration json files for calculator profiles.
All calculations will be held by the client side.
Electron framework is used for convenient access to the app.