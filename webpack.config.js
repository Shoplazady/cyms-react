const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/uploads/images_order'),
    },
  },
};