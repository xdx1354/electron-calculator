# Electron.js Calculator
Electron JS powered desktop app custom designed and fitted for the needs of the company.

**THIS PROJECT IS STILL IN THE DEVELOPMENT PHASE!**

## Goal of the Project
This project aims to create a convenient app that fits all the needs of the employees using it. It will be used daily and will significantly reduce time spent on repetitive processes while minimizing the chance of errors.

**Provided functionalities:**
- Custom calculator for calculating prices of orders for multiple product types (in this case, products are stickers and printings).
- Product profiles editor allowing the configuration of products (e.g., price per square meter, discount ranges for larger orders, additional features).

## Approach
### Product Profiles
Profiles are implemented in JSON format to facilitate future conversion or reuse in other projects.

### Scalable Approach
Profiles are stored in the app's files as JSON, but access is managed by an Express.js server through designed endpoints. This approach allows the future option of moving the JSONs to a web server to share them among all app instances on different workstations.

### Why Express.js
The Express.js server is used for file system access instead of Electron's IPC channel because I wanted to keep it as close as possible to server-client architecture due to the future plans (see [Future Plans](#future-plans)). Server is set up within the Electron process for easier developement as it does not require runing and managing state of seprate process.

## Future plans
### Web Calculator
The implementation of this calculator as an Electron.js desktop app is a first step and a prototype for a future feature that will be integrated into the company's website.

## Challenges and Problems
### Product Profiles
JSON format was chosen for storing profile data as a convenient way to send them through the API and manage them easily in TypeScript. The main challenge was creating a unified file structure that fits all profile types and is easy to manage and extend.

### Multiple Access to Files
Currently, Express.js serves the files through the API but does not limit or control how they are edited. This is acceptable within this Desktop App architecture but will need to be redesigned in the future. Using a database might be a good idea at that point.

## How to Run
Information on running the app is provided in the `/calculator/README.md` file.
