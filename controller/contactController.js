import nodemailer from 'nodemailer';
import Contact from '../models/contactModel'; // Assuming Contact model is defined

// Function to send email notification
const sendEmailNotification = async (name, email, subject, message) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.irrecordings.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'manas.nikte@irrecordings.com',
        pass: 'Mcn78554714@',
      },
    });

    // Define email content using HTML for better formatting
    let htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p style="margin-top: 20px; color: #888;">This email was sent from WitJab Technologies.</p>
        </body>
      </html>
    `;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'WitJab Technologies <manas.nikte@irrecordings.com>', // sender address
      to: 'manas.nikte@gmail.com', // list of receivers
      subject: 'New Contact Form Submission', // Subject line
      html: htmlContent, // html body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Controller function to handle new contact form submission
export const newContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactData = new Contact({ name, email, subject, message });
    const savedData = await contactData.save();

    // Send email notification after saving contact data
    await sendEmailNotification(name, email, subject, message);

    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error saving contact form submission:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


export const getAllContacts = async (req, res) => {
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
  