const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is up and running at port ${PORT}`);
  })
})
.catch((err) => {
  console.log("MongoDB connection failed !!! ", err);
})
