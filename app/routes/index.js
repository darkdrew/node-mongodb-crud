// importing blog routes
const blogPostRoutes = require('./blog_routes');

module.exports = (app , db) => {
  // All blog Routes
  blogPostRoutes(app , db);
}
