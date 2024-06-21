import Newsletter from "../models/newsletterModel.js";
import nodemailer from "nodemailer";
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "manas.nikte@irrecordings.com", // WitJab Technologies email
    pass: "Mcn78554714@", // password
  },
});

const sendWelcomeEmail = async (email) => {
  const unsubscribeLink = `https://witjabtechnologiescombo.onrender.com/unsubscribe/${encodeURIComponent(email)}`;

  const mailOptions = {
    from: '"WitJab Technologies" <manas.nikte@irrecordings.com>', // sender address
    to: email, // list of receivers
    subject: "Welcome to WitJab Technologies Newsletter", // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="https://res.cloudinary.com/deutek0w7/image/upload/v1718981832/uzmpjtmirqfueoewdbhb.png" alt="WitJab Technologies" style="width: 150px; margin-bottom: 20px;">
        <h2>Welcome to WitJab Technologies Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. We are thrilled to have you with us.</p>
        <p>You will receive the latest updates, news, and exclusive offers directly to your inbox.</p>
        <p>Best Regards,<br>WitJab Technologies Team</p>
        <p style="margin-top: 20px;">To unsubscribe, <a href="${unsubscribeLink}" target="_blank">click here</a>.</p>
        <p style="font-size: 12px; color: #888;">You are receiving this email because you subscribed to our newsletter.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const newNewsletter = new Newsletter({ email });
    const savedNewsletter = await newNewsletter.save();

    // Send welcome email
    await sendWelcomeEmail(email);

    res.status(201).json(savedNewsletter);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllNewslettersSubscribers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Adjust the limit as per your requirement
    const skip = (page - 1) * limit;
  
    try {
      const newsletters = await Newsletter.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
        .skip(skip)
        .limit(limit);
  
      const totalDocuments = await Newsletter.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);
  
      res.status(200).json({ newsletters, totalPages });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const deletedNewsletter = await Newsletter.findOneAndDelete({ email });
    if (!deletedNewsletter) {
      return res.status(404).json({ msg: 'Newsletter subscription not found' });
    }
    res.status(200).json({ msg: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ msg: 'Failed to unsubscribe' });
  }
};
