const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const EmployeeModel=require('./models/Employee')

const app=express()
app.use(cors(
  {
    origin:["https://stack-client-bay.vercel.app/"],
    methods:["POST","GET"],
    credentials:true
  }
 ));
app.use(express.json())

mongoose
  .connect("mongodb+srv://Bhakti12:12345678a@cluster.hozl3.mongodb.net/employee?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
//mongoose.connect("mongodb+srv://<Bhakti12>:<12345678a>@cluster.hozl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");

app.get("/",(req,res)=>{
  res.json("Hello")
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Success", user }); // Send success message
        } else {
          res.status(401).json({ message: "The password you have entered is incorrect" }); // Password incorrect
        }
      } else {
        res.status(404).json({ message: "No record existed" }); // User not found
      }
    })
    .catch(err => res.status(500).json(err)); // Server error
});


app.post('/', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employees=> res.json(employees))
    .catch(err=>res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})


