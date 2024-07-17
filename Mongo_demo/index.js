const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,

    //Built in validator
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "networkk"],
    lowercase: true,
    //uppercase : true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,

    //Custom validator
    validate: {
      validator: async function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 500,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "DSA Course",
    category: " WEB   ",
    author: "Hamid Shehzad",
    tags: ["WEB"],
    isPublished: true,
    price: 50.9,
  });
  try {
    // await course.validate((error)=>{
    //   if(error){
    //   }
    // });
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) console.log(err.errors[field].message);
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({
    author: "Hamid Shehzad",
    isPublished: true,
  })
    //.find({ author: /^Hamid/ }) //starts with
    //.find({ author: /Shehzad$/i }) //ends with
    //.find({ author: /.*Hamid.*/i }) //contain
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .countDocuments();
  //.select({ name: 1 });
  console.log(courses);
}

//1st approach (Query First)
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  //1st approach
  course.isPublished = true;
  course.author = "Mosh Hamedani";

  //2nd approach
  // course.set({
  //   isPublished: true,
  //   author: "Mosh Hamedani",
  // });

  const updatedCourse = await course.save();
  console.log(updatedCourse);
}

//2nd approach (Update First)
async function updateCourse2(id) {
  //1st approach
  const updatedCourse = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Hamid Shehzad",
        isPublished: false,
      },
    }
  );

  //2nd approach
  // const updatedCourse = await Course.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: {
  //       author: "Jack",
  //       isPublished: false,
  //     },
  //   },
  //   { new: true }
  // );
  console.log(updatedCourse);
}

async function removeCourse(id) {
  //1st
  const deletedCourse = await Course.deleteOne({ _id: id });

  //2nd
  // const course = await Course.findByIdAndDelete(id);
  console.log(deletedCourse);
}
// getCourses();
// updateCourse2("6694a0b9bdb95af76d95ebf0");
// removeCourse("6694a0b9bdb95af76d95ebf0");

createCourse();
