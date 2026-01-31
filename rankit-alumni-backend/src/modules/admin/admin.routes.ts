import { Router } from "express";
import { alumniData } from "../../../../src/data/mockData"; // Using frontend mock data for now

export const adminRouter = Router();

// In-memory store for processed alumni data (temporary, will be replaced by DB/JSON file)
let processedAlumniStore = [...alumniData]; // Initialize with all mock data

// Admin-only route to get raw alumni data (e.g., from Google Sheets)
// For now, it returns the full mock data.
adminRouter.get("/alumni/raw", (req, res) => {
  // In a later step, this will fetch from Google Sheets
  return res.json(alumniData);
});

// Admin-only route to process alumni data using LLM and save to public store
adminRouter.post("/alumni/process", (req, res) => {
  // This is a placeholder. In a later step, this will:
  // 1. Take admin-selected options/LLM prompt from req.body
  // 2. Call LLM service to filter/transform alumniData
  // 3. Update processedAlumniStore with the new data
  const { prompt, options } = req.body;
  console.log("Admin requested LLM processing with prompt:", prompt, "and options:", options);

  // For now, just simulate processing by reversing the list
  processedAlumniStore = [...alumniData].reverse(); 

  return res.status(200).json({ message: "Alumni data processing initiated and saved to public store." });
});

// Admin-only route to update the public alumni store directly (e.g., after manual edits)
adminRouter.post("/alumni/update-public-store", (req, res) => {
  const { updatedData } = req.body;
  if (!Array.isArray(updatedData)) {
    return res.status(400).json({ message: "Invalid data format. Expected an array." });
  }
  processedAlumniStore = updatedData;
  return res.status(200).json({ message: "Public alumni store updated successfully." });
});

// Export the processed store for use in the public alumni route
export const getProcessedAlumniStore = () => processedAlumniStore;