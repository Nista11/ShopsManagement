const plugins = [
    [
        'babel-plugin-direct-import',
        { modules: ['@mui/material', '@mui/icons-material'] },
    ],
    ["@babel/plugin-proposal-class-properties"]
];

module.exports = { plugins,
    presets: ["@babel/preset-env", "@babel/preset-react"]
};
