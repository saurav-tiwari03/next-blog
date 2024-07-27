import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  tags:[{
    type: String,
    required: true, 
  }], 
  imageUrl:{
    type: String,
  },
  comments:[{
    type:mongoose.Schema.ObjectId,
  }],
  likes:[{
    type: mongoose.Schema.ObjectId,
  }]
},{timestamps:true});

const Blog = mongoose.models.blog || mongoose.model("blog",blogSchema);

export default Blog;