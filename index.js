const express = require("express");
const app = express();
const fs = require("fs").promises;
app.use(express.json());
app.get("/hello", async (req, res) => {
  // // res.send('Hello World');
  // fs.readFile("./hello.json","utf8",(err,data) =>{
  //     if(err){
  //          res.send(err);
  //     }
  //     else{
  //         let pdata = JSON.parse(data);
  //         res.setHeader('Content-Type','application/json');
  //         //res.json(pdata);
  //         res.status(200).json({"status":"200","message":"success",response:pdata});
  //         res.end();
  //     }
  // })
  try {
    let data = await fs.readFile("./hello.json", "utf8");
    let pdata = JSON.parse(data);
    res
      .status(200)
      .json({ status: "200", message: "success", response: pdata });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err: err });
  }
});
app.post("/hello", async (req, res) => {
  try {
    let newdata = req.body;
    let existingdata = await fs.readFile("./hello.json", "utf8");
    let existingdata1 = JSON.parse(existingdata);
    existingdata1.push(newdata);
    console.log(existingdata1);
    await fs.writeFile("./hello.json", JSON.stringify(existingdata1), "utf8");
    res
      .status(201)
      .json({ status: "200", message: "success", response: newdata });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err: err });
  }
});
app.get("/hellobyid/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await fs.readFile("./hello.json", "utf8");
    let pdata = JSON.parse(data);
    res
      .status(201)
      .json({ status: "200", message: "success", response: pdata[id] });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err: err });
  }
});
app.get("/hellobyname/:name", async (req, res) => {
  try {
    let name1 = req.params.name.toLowerCase();
    let data = await fs.readFile("./hello.json", "utf8");
    let pdata = JSON.parse(data);
    let op = pdata.filter((x, y) => {
      return x.name == name1;
    });
    if (op.length > 0) {
      res.status(201).json({ status: "200", message: "success", response: op });
    } else {
      res
        .status(404)
        .json({
          status: "404",
          message: "Data not found",
          response: "No data found",
        });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err: err });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
