# Active Handout Plugins

**If you are not developing a new plugin you probably don't need to worry about this folder.**

You can develop plugins using either React (with PropTypes and Styled-Components) or pure JS syntax.

## Setup

Run the following commands from the project's root directory:

    $ cd plugins-js
    $ npm install

## Developing plugins

Create and edit your files in the `src` folder. Then, run the following command from the `plugins-js` directory to compile and export the bundle to `content/js`:

    $ npm run dev

**Important:**

1. when you create a new file, import it on `plugin-bundle.js` so it gets exported correctly.
2. before creating a commit, run `npm run build` to generate a production bundle.
3. do not add `plugin-bundle.js.map`
