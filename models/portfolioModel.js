import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  branch: { type: String, required: true },
  name: { type: String, required: true },
  graduationDate: { type: Date },
});

const workExperienceSchema = new mongoose.Schema({
  company: { type: String },
  jobTitle: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

const skillSchema = new mongoose.Schema({
  name: { type: String },
  proficiency: { type: String },
});

const projectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  url: { type: String },
});

const portfolioSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    education: [educationSchema],
    workExperience: [workExperienceSchema],
    skills: [skillSchema],
    projects: [projectSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
