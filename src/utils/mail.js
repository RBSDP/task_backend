// email is crafted by mailgen
// email is send using node mailer


import Mailgen from "mailgen";


const sendMail = async (options) =>{

    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            
            name: 'Task Mnager',
            link: 'https://mailgen.js/'
            
        }
    });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailBody = mailGenerator.generate(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_SMTP_USER,
          pass: process.env.MAILTRAP_SMTP_PASS,
        },
      });

    const mail = {
       
            from: 'mail.tasakmanager@example.com', // sender address
            to: options.email, // list of receivers
            subject: options.subject, // Subject line
            text: emailText, // plain text body
            html: emailBody ,


    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("email failed", error)
    }
    
}

const emailVerificationMailGenContent = (username, verificationUrl) => {


return {
        body: {
            name: username,
            intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
   



}







}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {


    return {
            body: {
                name: username,
                intro: 'request for password reset',
                action: {
                    instructions: 'click on url',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'click to reset password',
                        link: passwordResetUrl
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
       
    
    
    
    }
    
    
    
    
    
    
    
    }