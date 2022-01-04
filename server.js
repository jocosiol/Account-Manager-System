const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { postgrator } = require("./lib/db");
const accountRoute = require("./routes/account");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/account', accountRoute);


postgrator
  .migrate()
  .then((result) => {
    console.log(`Migrated DB successfully:`, result);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));
