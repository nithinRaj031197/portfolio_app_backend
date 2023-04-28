import mongoose from "mongoose";
import { ADMIN, CANDIDATE } from "../enums.js";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ADMIN, CANDIDATE],
    default: CANDIDATE,
  },
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
});

const Admin = mongoose.model("Admin", adminSchema);

export { Admin };
