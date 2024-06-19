import Contact from '../models/contactModel.js';


export const newContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactData = new Contact({ name, email, subject, message });
    const savedData = await contactData.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


export const getContactSubmissions = async (req, res) => {
    try {
      const { page = 1, limit = 7 } = req.query;
      const skip = (page - 1) * limit;
  
      const [submissions, totalSubmissions] = await Promise.all([
        Contact.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Contact.countDocuments()
      ]);
  
      const totalPages = Math.ceil(totalSubmissions / limit);
  
      res.status(200).json({ submissions, totalPages });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };
  