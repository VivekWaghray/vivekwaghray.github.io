const ghPages = require('gh-pages');

ghPages.publish('dist', (err) => {
  if (err) {
    console.error(err);
  }
});
