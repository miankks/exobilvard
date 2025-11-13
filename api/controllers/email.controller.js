import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';


const sendEmail = async (req, res) => {
    const {username, email, subject, regnumber } = req.body
    console.log(req.body);
    
    try {   
        // create mail transporter
        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'miankks85@gmail.com',
                pass: 'qwerty123', // use app pasword if gmail
            }
        })
    // email content (send back to user)
    const mailOptions = {
        from: '"Exobil" techbilal85@gmail.com',
        to: email,
        subject: `Thanks for contacting us, ${username || 'friend'}`,
        html: `
            <h2>Hello ${username || ''}!</h2>
            <p>Thanks for reaching out</p>
            <p>We received your message:</p>
            <p>${subject}</p>
            <blockquote>${regnumber || 'No message provided'}</blockquote>
            <p>We'll get back to you soon.</p>
            <p>Exobil</p>
        `,
    }

    
    // send email
    await transpoter.sendEmail(mailOptions);
    res.status(200).json({success: true, message: 'Email sent to user'});
    } catch (error) {
        console.error(500).json({success: false, error: 'Failed to send email' });
        
    }
}

export {sendEmail}

  // create mail transporter
        // const transpoter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'miankks85@gmail.com',
        //         pass: 'qwerty123', // use app pasword if gmail
        //     }
        // })