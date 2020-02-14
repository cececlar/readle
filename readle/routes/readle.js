const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/api/titles", async (req, res, next) => {
  const title = req.query.title;

  console.log(title);

  const { data } = await axios.get(
    `http://openlibrary.org/search.json?q=${title}`
  );

  //   const isbn = data.docs;
  //   console.log(isbn);

  if (data.docs.length > 0) {
    res.json({ success: true, data });
  } else {
    res.json({ success: false, message: "No such book found" });
  }
});

router.get("/api/book", async (req, res, next) => {
  const isbn = req.query.isbn;

  const { data } = await axios.get(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
  );

  if (Object.getOwnPropertyNames(data).length !== 0) {
    res.json({ success: true, data });
  } else {
    res.json({ success: false, message: "No such book found" });
  }
});

module.exports = router;
