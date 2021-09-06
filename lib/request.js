const requestParser = (req, res, next) => {
  console.log("Response is currently being parsed");
  console.log("*******************************************");
  console.log(new Date().toString())
  if (res.locals.result["status"] == "valid") {
    console.log(res.locals.result["message"]);
    res.status(200).send({ data: res.locals.result["data"] });
  } else {
    console.log(
      "HERE IS THE LOCAL ERROR CODE :" + res.locals.result["error_code"] + "\n"
    );
    console.log(res.locals.result["message"] + "\n");
    res
      .status(res.locals.result["responseStatus"])
      .send({ data: res.locals.result["data"] });
  }
  console.log("*******************************************");
};

module.exports = {
  requestParser,
};
