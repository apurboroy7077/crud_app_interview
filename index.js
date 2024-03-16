let usersData = [
  { username: "john_doe", password: "password123" },
  { username: "jane_smith", password: "letmein" },
  { username: "mike_jackson", password: "abc123" },
  { username: "sara_wilson", password: "qwerty" },
  { username: "chris_miller", password: "pass1234" },
  { username: "emily_roberts", password: "secret" },
  { username: "alex_harris", password: "password" },
  { username: "lisa_jones", password: "123456" },
  { username: "kevin_clark", password: "iloveyou" },
  { username: "amanda_brown", password: "welcome" },
  { username: "ryan_taylor", password: "password!" },
  { username: "natalie_young", password: "letmein123" },
  { username: "david_martin", password: "p@ssw0rd" },
  { username: "jessica_white", password: "hello123" },
  { username: "brandon_carter", password: "securepassword" },
  { username: "ashley_green", password: "abc@123" },
  { username: "justin_anderson", password: "12345678" },
  { username: "sophia_king", password: "ilovecoding" },
  { username: "tyler_hill", password: "password12" },
  { username: "olivia_scott", password: "mypassword" },
];

let express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET ALL THE USERS-----------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  try {
    res.status(200).json({ usersData });
  } catch (error) {
    console.log(error);
  }
});

// GET SPECIFIC USER BY USERNAME--------------------------------------------------------------------------------------------------
// USED FOR LOOP, BUT CAN USE FILTER OR OTHER METHODS AS WELL-------------------------------------------------------------
app.get("/:username", async (req, res) => {
  try {
    let receivedUsername = req.params.username;
    let matchedUser = [];
    for (let i = 0; i < usersData.length; i++) {
      let user = usersData[i];
      if (user.username == receivedUsername) {
        matchedUser.push(user);
      }
    }
    if (matchedUser.length > 0) {
      res.status(200).json({ data: matchedUser });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// CREATE A NEW USER--------------------------------------------------------------------------------------------------------
app.post("/", (req, res) => {
  try {
    let { username, password } = req.body;
    if (username && password) {
      let newUser = { username, password };
      usersData.push(newUser);
      res.status(201).json({
        message: `User ${username} is Successfully Created`,
      });
    } else {
      res.status(404).json({
        message: `Please Enter Name and Password`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// DELETE A USER BY USERNAME------------------------------------------------------------------------------------------
// USED FILTER METHOD -------------------------------------------------------------------------------------------------
app.delete("/", async (req, res) => {
  try {
    let receivedUsername = req.body.username;
    usersData = usersData.filter((data) => data.username != receivedUsername);
    res
      .status(200)
      .json({ Message: "Deleted Successfully", remainingUsers: usersData });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE A USER'S PASSWORD BY USERNAME---------------------------------------------------------------
// USED LOOP METHOD, BUT CAN USE OTHER METHODS AS WELL------------------------------------------------------------
app.patch("/", async (req, res) => {
  try {
    let receivedUsername = req.body.username;
    let newPassword = req.body.password;
    console.log(receivedUsername, newPassword);
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].username == receivedUsername) {
        usersData[i].password = newPassword;
        return res
          .status(200)
          .json({ Message: "Password Updated Successfully" });
      }
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    console.log(error);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
