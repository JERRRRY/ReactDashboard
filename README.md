Try to build a dashboard:

At the local side, it tested successfully, 
Express.js(framework) + Node.js(local Environment for running JS) = server (in the project folder)
GraphiQL(like REST service) 
MySQL(local)


Might edit place:
Package.json
"homepage": "https://jerry93169.github.io/ReactDashboard",
“script”


plan:
Try to connect my own supabase and import the data then i asked for the real supabase. 
Change my build into supabase version(right now it's mysql) 
Also try to remain the local side(also connect to supabase) through GraphiQL
Set the webpage on github or render(try to know the fauculty)


Local testing:

webpack-dev-server (WDS) 
1. Node.js-based HTTP server
2. Located in http://localhost:3000
3. 
4. run middleware(the running process after received request and before sending response) like serving file from memory, processing HMR logic,  
5. apply the file changing immediately to the React app. (Hot reloads), 
6. won't change the current status like scrolling (Hot Module Replacement (HMR))
use:

npm install --save-dev webpack-dev-server

"scripts": {
  "start": "webpack-dev-server --mode development"
}

example:

open webpage, client(browser) sent request to webpack server(http://localhost:3000)
webserver start running middleware: 
save the request to log, open React file from memory




When using **development tools `webpack-dev-server`**, the **server perform compile steps**, while the **client mainly loads the result and handles reloading when things change**.

---

## 🔧 Server-Side: What `webpack-dev-server` Does

### 1. **Run Webpack**

webpack is chef who prepare the food, wds is the kitchen

Webpack reads the `webpack.config.js`(**tells Webpack how to build app**). 
Then read index.js(which conclude all the files, eg. import './styles.css')
bundle all the files into single file **bundle.js** and all style into **style.css** by **removing unused code** and **transforming all files by loader**.  

Webpack uses loaders to transform non-JavaScript files (like .css, .png, .ts, etc.) into JavaScript modules — because the browser can only run JavaScript.

| File Type     | Transformed Into                              | Why                                                  |
|---------------|-----------------------------------------------|-------------------------------------------------------|
| `.js`  | Browser-compatible JavaScript               | Babel or TypeScript transpiles typed code     |
| `.css`        | JavaScript that injects CSS into `<style>` tags | So styles are loaded dynamically in JS               |
| `.png` / `.jpg` | JavaScript exporting a URL or base64 string    | So the image can be imported like a module           |
| `.svg`        | Inline SVG or a JS URL string                  | Same reason as above                                 |
| `.json`       | Parsed JS object                               | So you can `import data from './data.json'`          |


**webpack.config.js:**

| Section        | What It Controls                             | Example                                       |
| -------------- | -------------------------------------------- | --------------------------------------------- |
| `entry`        | Where your app starts                        | `'./src/index.js'`                            |
| `output`       | Where to put the bundled file                | `'./dist/bundle.js'`                          |
| `module.rules` | How to handle different file types           | Use Babel for `.js`, loaders for `.css`, etc. |
| `plugins`      | Extra functionality                          | HMR, HTML template injection, etc.            |
| `devServer`    | WDS behavior  | Port, HMR, open browser, etc.                 |
| `mode`         | Optimize for development or production       | `'development'` or `'production'`             |
 
**Webpack only ignore the 'devServer', WDS will read config when it need the settings.**
**Webpack Sets up loaders and registers plugins.(like the staff in kitchen)**
They can help Webpack finish its works.
Plugin would modify the bundle every time webpack need them by listening to the emit.

- **HtmlWebpackPlugin**: Creates /dist/index.html(open-1st file), Injects `<script src="bundle.js">`
- **DefinePlugin**: Replaces strings defined in .env like process.env.API_KEY to real value
- **CopyWebpackPlugin**: copy file .png into /dist/assets/dog.png from /public/assets/dog.png
- **CompressionPlugin**: compress /dist/bundle.js to /dist/bundle.js.gz 
- **HotModuleReplacementPlugin**: 
Wraps each module with HMR runtime code. 
Add if (module.hot) {module.hot.accept();} under each module
“Hey, I can be hot-replaced if this file changes.”

### 2. **Start a Local HTTP Server**

* Runs on a port like `http://localhost:3000`
* Serves files from memory (not disk!)

### 3. **Compile Your Code**

* Parses JS, CSS, JSX, etc.
* Runs through loaders like Babel or TypeScript
* Outputs bundles (e.g., `bundle.js`) **in memory**
* Watches for file changes

### 4. **Enable Middleware**

* Uses middleware to serve the compiled assets
* Injects a WebSocket connection into your client bundle for HMR

### 5. **Hot Module Replacement (HMR)**

* When a file changes:

  * Recompiles just that module
  * Sends updates via WebSocket to the client
  * Doesn't reload the full page (unless necessary)

---

## 💻 Client-Side: What the Browser (Client) Does

### 1. **Loads the Page**

* Makes a request to `localhost:<port>/`
* Loads the bundle served by the dev server

### 2. **Executes JavaScript**

* Runs your app using the bundled JS

### 3. **Connects to Dev Server via WebSocket**

* Uses HMR client injected by `webpack-dev-server`
* Listens for module updates

### 4. **Handles HMR Updates**

* When the server detects a change:

  * It recompiles just the affected module
  * Sends it over WebSocket
  * The client **replaces the module in memory** without reloading the page

---

## ✅ Summary

| Action             | Server (webpack-dev-server) | Client (Browser)                  |
| ------------------ | --------------------------- | --------------------------------- |
| Initialize config  | ✅ Load `webpack.config.js`  | ❌                                 |
| Compile code       | ✅ With loaders and plugins  | ❌                                 |
| Serve content      | ✅ In-memory file system     | ✅ Fetches from `localhost:<port>` |
| Watch file changes | ✅ Watches filesystem        | ❌                                 |
| HMR communication  | ✅ Sends diffs via WebSocket | ✅ Receives and applies updates    |
| Re-render updates  | ❌                           | ✅ Patches DOM without reload      |

Let me know if you want a visual diagram or code example to clarify this even further.
