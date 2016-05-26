# Solutions to wire up
- Source control
    + git
    + gh
- Package Management
    + NPM
- Build
    + Webpack
    + Babel
    + ESLint
- Base deps
    + React
    + Lodash
- Publishing bleeding edge stuff to es5 compatible lib
- live coding
- production build
    + only uglify app code?
- deploying to ???
    + pushstate compatible server for nice single page app routing
- firebase
    + users?
- canvas
    + createjs
- webfonts
    + typekit
    + npm?
- deps:
    + redux?
    + immutable?
    + css/style?

# Steps Taken
- create a repo on Github
- add collaborators
- clone repo locally
- `npm init`
- add a `postversion` npm script to push after bumping version
- install some deps: 
    -- dev deps
    + webpack
    + babel babel-cli babel-core babel-loader babel-preset-es2015 babel-react
    + eslint
    -- deps
    + react, react-dom
    + lodash
- update NPM: `npm update npm -g`
- add a .gitignore
- wire babel setup in package.json
- setup eslint config
- setup eslint for editor (already setup.. not sure what I did)
- setup webpack dev
- setup webpack build
    + production
    + uglify
    + added babel polyfill for app & webpack config
    + sniffing ENV, default to 'development' and blows up on unknown
