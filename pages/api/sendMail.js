import nodemailer from 'nodemailer';

// Debug object for logging errors
const Debug = {
    LogError: (msg) => console.error(msg)
};

// Function to generate styled HTML email content
function generateHtmlContent({ name, company, email, message, phone }) {
    // Build HTML template for email with basic styling
    return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          h2 { color: #333; }
          p { color: #555; line-height: 1.6; }
          .label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Contact Message</h2>
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          <p><span class="label">Company:</span> ${company ? company : 'N/A'}</p>
          <p><span class="label">Phone:</span> ${phone ? phone : 'N/A'}</p>
          <p><span class="label">Message:</span> ${message}</p>
        </div>
      </body>
    </html>
    `;
}

export default async function sendMail(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Extract fields from request body
    const { name, company, email, message, phone } = req.body;

    // Check required fields: name, email and message are required
    if (!name || !email || !message) {
        Debug.LogError('Name, email, and message are required');
        return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // Compose plain text content as fallback
    const plainTextContent = `Name: ${name}\nEmail: ${email}\nCompany: ${company ? company : 'N/A'}\nPhone: ${phone ? phone : 'N/A'}\nMessage: ${message}`;
    // Compose HTML content with styling
    const htmlContent = generateHtmlContent({ name, company, email, message, phone });

    try {
        // Create nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "hxgn.tech@gmail.com",
                pass: "dhxc rcje rccr kbqg"
            }
        });

        // Set up email options with both plain text and HTML
        let mailOptions = {
            from: 'hxgn.tech@gmail.com',
            to: 'jan@sonnevigolfdesign.com',
            subject: 'Sonnevi - Contacto',
            text: plainTextContent,
            html: htmlContent
        };

        // Send email and await result
        let info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
        return res.status(200).json({ message: 'Correo enviado' });
    } catch (error) {
        Debug.LogError('Error sending mail: ' + error);
        return res.status(500).json({ message: 'Error al enviar el correo' });
    }
}
