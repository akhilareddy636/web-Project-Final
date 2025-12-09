import mongoose from 'mongoose';
import fs from 'fs';


const MONGO_URI = 'mongodb+srv://akhilaavuldapuram_db_user:26Qn5OcJNPQujluv@cluster0.ns5hb7y.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


const weatherSchema = new mongoose.Schema({
  id: Number,
  location: String,
  temperature: Number,
  weatherCondition: String,
  forecast: String
});

const Weather = mongoose.model('Weather', weatherSchema);


const data = JSON.parse(fs.readFileSync('weatherdata.json', 'utf-8'));


const insertData = async () => {
  try {
    await Weather.deleteMany(); // clear old data
    // Convert numbers to plain JS numbers
    const formattedData = data.weather.map(item => ({
      id: item.id,
      location: item.location,
      temperature: Number(item.temperature),
      weatherCondition: item.weatherCondition,
      forecast: item.forecast
    }));

    await Weather.insertMany(formattedData);
    console.log('Weather data inserted successfully');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

insertData();
