import Contact from '../models/contactModel.js';

export const newContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactData = new Contact({ name, email, subject, message });
    const savedData = await contactData.save();
    const { name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage } = savedData;

    res.status(201).json({ name: contactName, email: contactEmail, subject: contactSubject, message: contactMessage });
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contact form submissions:', error);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };
  