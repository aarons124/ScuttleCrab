const Mongoose = require('mongoose');

Mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  },
  (error) => {
    if (error) return console.error(error);
    console.log(`[DATABASE] Successful connection to the database.`);
  }
);
