// import express from 'express'
// import mongoose from 'mongoose';
// import cors from 'cors'
// import { mongodbURL, PORT } from './config.js';

// import {User} from './models/userModel.js'
// import { auth } from "./authMiddleware.js";


// var app=express()

// app.use(cors())
// app.use(express.json());
// app.listen(PORT, () => {
//   console.log(`DB CONNECTED ${PORT}`)
// })

// app.get('/', (req, res) => {
//   console.log(req.body)
//   res.send('Hello World!')
// })


// //Route for create user in db

// app.post("/signup", async (req, res) => {
//   try {
//     let { username, email, password, confirmpassword } = req.body;
//     console.log(req.body);
//     if (!username || !email || !password || !confirmpassword) {
//       return res
//         .status(400)
//         .send("Required username,email,password,confirmpassword");
//     }

//     if (password !== confirmpassword) {
//       return res.status(400).send("Passwords not matched");
//     }

//     let newUser = {
//       username,
//       email,
//       password,
//       confirmpassword,
//     };

//     let emailExist = await User.findOne({ email: email });

//     if (emailExist) {
//       return res.status(400).send("User already exist in DB");
//     }
//     let user = await User.create(newUser);
//     return res.status(201).send(user);
//     // return res.status(201).send('User is created successfully');
//   } catch (error) {
//     res.status(500).send("Internal server Error");
//   }
// });

// //Rote for user login

// app.post("/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     console.log(req.body);

//     if (!email || !password) {
//       return res.status(400).send("Required email and password");
//     }

//     let existUser = await User.findOne({ email });
//     console.log(existUser);

//     if (!existUser) {
//       return res.status(404).send("User not found");
//     }
//     if (existUser.password !== password) {
//       return res.status(400).send("Invalid Credentials");
//     }

//     if (existUser.email && existUser.password) {
//       let token = jwt.sign({ id: existUser._id }, "secret", {
//         expiresIn: "1d",
//       });
//       console.log(token);

//       return res.json({ token, userId: existUser._id });
//     }

//     // if (existUser) {
//     //   return res.status(200).send("Login success");
//     // }
//   } catch (error) {
//     res.status(500).send("Internal server error");
//   }
// });

// app.get("/profile", auth, async (req, res) => {
//   try {
//     let exist = await User.findById(req.id);
//     console.log("user from db after auth", exist);
//     if (!exist) {
//       return res.send("User not found");
//     } else {
//       return res.json(exist);
//     }
//   } catch (error) {
//     return res.status(500).send("Internal server error");
//   }
// });





// mongoose.connect(mongodbURL)
//   .then((res) => {
//   console.log('Connected to MongoDB')
//   })
//   .catch((error) => {
//   console.log(error)
// })



import express from "express";

import { PORT } from "./config.js";
import { dbURL } from "./config.js";
import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { StudentModel } from './models/studentModel.js';

import { auth } from "./authMiddleware.js";

let app = express();

// to parse the body
app.use(express.json());

//to unlock cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Iam from Server updated");
});

//Route for create user in db


app.post("/signup", async (req, res) => {
  try {
    let { username, email, password, confirmpassword } = req.body;
    console.log(req.body);
    if (!username || !email || !password || !confirmpassword) {
      return res
        .status(400)
        .send("Required username,email,password,confirmpassword");
    }

    if (password !== confirmpassword) {
      return res.status(400).send("Passwords not matched");
    }

    let newUser = {
      username,
      email,
      password,
      confirmpassword,
    };

    let emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(400).send("User already exist in DB");
    }
    let user = await User.create(newUser);
    return res.status(201).send(user);
    // return res.status(201).send('User is created successfully');
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});


//Rote for user login

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("Required email and password");
    }

    let existUser = await User.findOne({ email });
    console.log(existUser);

    if (!existUser) {
      return res.status(404).send("User not found");
    }
    if (existUser.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }

    if (existUser.email && existUser.password) {
      let token = jwt.sign({ id: existUser._id }, "secret", {
        expiresIn: "1d",
      });
      console.log(token);

      return res.json({ token, userId: existUser._id });
    }

    // if (existUser) {
    //   return res.status(200).send("Login success");
    // }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

//my profile

app.get("/profile", auth, async (req, res) => {
  try {
    let exist = await User.findById(req.id);
    console.log("user from db after auth", exist);
    if (!exist) {
      return res.send("User not found");
    } else {
      return res.json(exist);
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

app.post('/students', async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.qualification ||
      !req.body.age ||
      !req.body.address ||
      !req.body.courses ||
      !req.body.gender
    ) {
      return res.status(400).send('Required product name & price & quantity');
    }

    var newProduct = {
      name: req.body.name,
      qualification: req.body.qualification,
      age: req.body.age,
      address: req.body.address,
      courses: req.body.courses,
      gender:req.body.gender
    };

    var result = await StudentModel.create(newProduct);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    var { id } = req.params;
    var singleProduct = await StudentModel.findById(id);
    res.status(200).send(singleProduct);
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.qualification ||
      !req.body.age ||
      !req.body.address
    ) {
      return res.status(400).send('Required product name & price & quantity');
    }

    var { id } = req.params;
    var result = await StudentModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send('Product not found');
    } else {
      return res.status(200).send('Product updated in db');
    }
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    var { id } = req.params;
    var result = await StudentModel.findByIdAndDelete(id);
    console.log(result);
    if (!result) {
      return res.status(404).send('Product not found');
    }
    return res.status(200).send('Product delete in DB');
  } catch (error) {
    res.status(500).send('server error');
  }
});

app.get('/students', async (req, res) => {
  try { 
    const students = await StudentModel.find({})
    res.send(students)
    
  
    console.log(students)
  } catch (error) {
    console.error(error)
  }
  

 
})


mongoose
  .connect(dbURL)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY");
    app.listen(PORT, () => {
      console.log(`Server started in PORT  ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error");
  });