import Portfolio from '../models/portfolioModel.js';

export const createPortfolioItem = async (req, res) => {
  console.log('Request received to create portfolio item');
  try {
    const { title, text, date, status, colorful, weburl } = req.body;
    if (!req.file) {
      console.error('File is missing in the request');
      return res.status(400).json({ msg: "File is required" });
    }

    const file = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    if (!title || !text || !date || !status) {
      console.error('Missing required fields', { title, text, date, status });
      return res.status(400).json({ msg: "All fields are required" });
    }

    const portfolioItem = new Portfolio({ title, text, date, status, file, colorful, weburl });

    const savedItem = await portfolioItem.save();

    console.log('Portfolio item saved successfully:', savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Failed to save portfolio item:', error);
    res.status(500).json({ msg: 'Failed to save portfolio item', error: error.message });
  }
};

export const getAllPortfolioItems = async (req, res) => {
  try {
    const portfolioData = await Portfolio.find();
    if (!portfolioData || portfolioData.length === 0) {
      return res.status(404).json({ msg: "Portfolio data not found" });
    }
    res.status(200).json(portfolioData);
  } catch (error) {
    console.error('Error getting all portfolio items:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getPortfolioItemById = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ msg: "Portfolio item not found" });
    }
    res.status(200).json(portfolioItem);
  } catch (error) {
    console.error('Error getting portfolio item by ID:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const updatePortfolioItem = async (req, res) => {
  try {
    const { title, text, date, status, visibility, colorful, weburl } = req.body;
    let file = req.body.file; // Assuming 'file' is the field name for the image in FormData

    // Check if portfolio item exists
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ msg: "Portfolio item not found" });
    }

    // Proceed with updating the portfolio item
    if (req.file) {
      file = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedData = await Portfolio.findByIdAndUpdate(req.params.id, {
      title,
      text,
      date,
      status,
      visibility,
      file, // Update the file field if a new image was uploaded
      colorful,
      weburl,
    }, { new: true });

    if (!updatedData) {
      return res.status(404).json({ msg: "Portfolio item not found after update" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};



export const deletePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ msg: "Portfolio item not found" });
    }
    const deletedData = await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedData);
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
