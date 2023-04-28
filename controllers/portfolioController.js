import { Admin } from "../models/adminModel.js";
import Portfolio from "../models/portfolioModel.js";

// Create a new portfolio
export const createPortfolio = async (req, res) => {
  try {
    // Extract admin ID from request body
    const { adminId } = req.body;

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create new portfolio
    const portfolio = new Portfolio({
      ...req.body,
      createdBy: admin._id,
    });

    // Save portfolio
    await portfolio.save();

    // Add portfolio to admin's portfolios array
    admin.portfolios.push(portfolio._id);
    await admin.save();

    res.status(201).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all portfolios
export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate({ path: "createdBy", select: "-password" });
    if (portfolios.length === 0) {
      res.status(404).json({ message: "Portfolios not available" });
    }
    res.json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get portfolio by ID
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate({ path: "createdBy", select: "-password" });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update portfolio by ID
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Extract admin ID from request body
    const { adminId } = req.body;

    // Check if admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update portfolio
    portfolio.name = req.body.name || portfolio.name;
    portfolio.email = req.body.email || portfolio.email;
    portfolio.phone = req.body.phone || portfolio.phone;
    portfolio.education = req.body.education || portfolio.education;
    portfolio.workExperience = req.body.workExperience || portfolio.workExperience;
    portfolio.skills = req.body.skills || portfolio.skills;
    portfolio.projects = req.body.projects || portfolio.projects;
    portfolio.createdBy = admin._id;

    // Save updated portfolio
    const updatedPortfolio = await portfolio.save();

    res.json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete portfolio by ID
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    // Remove portfolio from admin's portfolios array
    const admin = await Admin.findById(portfolio.createdBy);
    admin.portfolios = admin.portfolios.filter((p) => p.toString() !== portfolio._id.toString());
    await admin.save();

    // Delete portfolio
    await portfolio.deleteOne();

    res.json({ message: "Portfolio deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
