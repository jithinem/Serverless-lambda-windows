const mongoose = require('mongoose');

mongoose.connect('mongodb_atlas_url');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String
    }
  });

  const User = mongoose.model('user', userSchema);


  module.exports.create = async (event) => {
    const data = JSON.parse(event.body);
  
    try {
      const newUser = await User.create(data);
  
      return {
        statusCode: 200,
        body: JSON.stringify(newUser)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error })
      };
    }
  };
  
  
  module.exports.read = async (event) => {
    try {
      const users = await User.find();
  
      return {
        statusCode: 200,
        body: JSON.stringify(users)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error })
      };
    }
  };
  
  
  module.exports.update = async (event) => {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
  
    try {
      const users = await User.findOneAndUpdate({
        _id: id
      }, {
        $set: { data }
      }, { new: true });
  
      return {
        statusCode: 200,
        body: JSON.stringify(users)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error })
      };
    }
  };
  
  
  module.exports.delete = async (event) => {
    const { id } = event.pathParameters;
  
    try {
      await User.findByIdAndDelete(id);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User deleted Succesfully' })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error })
      };
    }
  };