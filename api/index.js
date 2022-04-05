const { app } = require('./app')
const { createServer } = require("http")

const Application = createServer(app);

Application.listen(process.env.PORT || 3333, () => {
  console.info(`Server Listening port ${process.env.PORT || 3333}`);
});