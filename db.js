const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://welovephysics524:RAMisRAM123098@cluster0.xiofvri.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

//Connecting to Database

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);//1st connect to the DB.
        console.log("Connected MongoDB to Mongoose");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();//we connected to Database specifically food_items collection
        //we perform await and find() toArray() in 1 go which is important
        //it will wait till all data in the collection is converted into Array then store it in fetched_data.
        //dont put callback function in toArray().
        
        // console.log(fetched_data);
        global.food_items = fetched_data;
        // console.log(global.food_items);

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

module.exports = mongoDB;
