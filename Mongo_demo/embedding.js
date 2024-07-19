const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Define the Author schema with proper type for name
const authorSchema = new mongoose.Schema({
  name: String, // String type ensures data integrity
});

// Define the Course schema embedding the author document
const courseSchema = new mongoose.Schema({
  name: String,
  author: authorSchema, // Embed the author schema directly
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(courseName, authorName) {
  const course = new Course({
    name: courseName,
    author: { name: authorName }, // Create the author object within the course
  });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().select("name -_id author");
  console.log(courses);
}

async function updateCourse(courseId) {
  // Update the embedded author document using findByIdAndUpdate
  const course = await Course.findByIdAndUpdate(
    courseId,
    { $set: { "author.name": "John Smith" } },
    { new: true } // Return the updated document
  );
  console.log(course);
}

// Example usage
// createCourse("Node.js", "Hamid Shehzad"); // Create a course with the author

// Uncomment to list courses
// listCourses();

// Uncomment to update a course (use the actual course ID)
updateCourse("669972b8ac239e74d55b5062"); // Replace with the course ID you want to update
