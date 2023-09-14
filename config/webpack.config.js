const path = require('path');
const fs = require("fs")

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

const getAllFiles = (dirPath, arrayOfFilesOptional) => {
  const files = fs.readdirSync(dirPath);
  let arrayOfFiles = arrayOfFilesOptional || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

const files = getAllFiles(path.join(config.root, config.paths.src));
const entry = files.reduce((prev, curr) => {
  const newPrev = prev;
  const filename = path.basename(curr);
  const nakedFilename = path.parse(filename).name;
  const fileExtension = path.extname(filename);
  if (fileExtension === '.html') {
    const entryArray = [];
    entryArray.push(path.join(config.root, config.paths.src, 'stylesheets/styles.scss'));
    const dirPath = path.dirname(filename);
    const relativeDirectory = dirPath.split('src')[1] || '';
    const expectedJSFile = path.join(config.root, config.paths.src, 'javascripts', relativeDirectory, nakedFilename + '.js');
    if (fs.existsSync(expectedJSFile)) {
      entryArray.push(expectedJSFile);
    }
    newPrev[nakedFilename] = entryArray;
    return newPrev;
  }
  return newPrev;
}, {});
console.log('Using these entry files:');
console.log(entry);

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry,
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: '[name].[hash].js',
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool: config.env === 'production'
    ? 'hidden-source-map'
    : 'eval-source-map',
  devServer: {
    watchFiles: [
      config.paths.src + '/*',
      config.paths.src + '**/*',
      config.paths.config + '/*',
      config.paths.config + '**/*',
      config.paths.dist + '/*',
      config.paths.dist + '**/*',
    ],
    hot: true,
    open: true,
    port: config.port,
    host: config.dev_host,
  },
  module: {
    rules: loaders,
  },
  plugins,
};
