/* config-overrides.js */
/* eslint-disable react-hooks/rules-of-hooks */
//const { useBabelRc, override } = require('customize-cra');

//module.exports = override(useBabelRc());
/*const plugins = [
    [
        'babel-plugin-direct-import',
        { modules: ['@mui/material', '@mui/icons-material'] },
    ],
    ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-jsx"]
];



module.exports.plugins = plugins
module.exports.presets = ["@babel/preset-env", "@babel/preset-react"]*/
const path = require("path");
module.exports = {
    webpack: function(config, env) {
        config = {
            entry: './src/main/js/app.js',
            devtool: 'eval',
            cache: true,
            mode: 'development',
            optimization: {minimize: false},
            output: {
                path: path.join(__dirname, "/src/main/resources/static/built"),
                filename: 'bundle.js'
            },
            watchOptions: {
                ignored: /node_modules/
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                       exclude: /(node_modules)/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-react"],
                                cacheDirectory: true,
                                cacheCompression: false
                            },
                        }]
                    },
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader", "postcss-loader"]
                    }
                ]
            }
        };
        return config;
    },

    paths: function(paths, env) {
        const root = __dirname
        paths.appBuild = `${root}/target/classes/static/built`
        paths.appPublic = `${root}/src/main/resources/static/built`
        paths.appHtml = `${root}src/main/resources/templates/index.html`
        paths.appIndexJs = `${root}/src/main/js/app.js`
        paths.appPackageJson = `${root}/package.json`
        paths.appSrc = `${root}/src/main/js`
        // paths.appTsConfig = `${root}/tsconfig.json`
        // paths.appJsConfig = `${root}/jsconfig.json`
        // paths.yarnLockFile = `${root}/yarn.lock`
        //paths.testsSetup = `${root}/src/test/js/setupTests.js`
        // paths.proxySetup = `${root}/src/main/js/setupProxy.js`
        paths.appNodeModules = `${root}/node_modules`
        // paths.swSrc = `${root}/src/main/js/service-worker.js`
        // paths.publicUrlOrPath = '/'
        // paths.ownPath = `${root}/node_modules/react-scripts`
        // paths.ownNodeModules = `${root}/node_modules/react-scripts/node_modules`
        // paths.appTypeDeclarations = `${root}/src/react-app-env.d.ts`
        // paths.ownTypeDeclarations = `${root}/node_modules/react-scripts/lib/react-app.d.ts`
        //console.log(paths)
        return paths;
    }
}
