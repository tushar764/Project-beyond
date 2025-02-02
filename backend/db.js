const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://register-1:tusharwxyzab@cluster0.kwxzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 


const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
