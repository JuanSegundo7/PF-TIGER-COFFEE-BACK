const nodemailer = require('nodemailer');
require('dotenv').config();
const { EMAIL_USER,  EMAIL_PASSWORD } = process.env;


const sendEmail = async (data)=>{
    
    const { email, name, cart, error } = data;

    //General configuration for email sender
    const mail ={
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
    const configuration = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: mail.user,
            pass: mail.pass,
          },
    }
    // TRANSPORTER
    const trasport = nodemailer.createTransport(configuration);

    
    if (email && name && cart){
        const upperCaseName = name.toUpperCase();
        const products = cart.map(unProducto => `<p>Product: ${unProducto.name} - Units: ${unProducto.quantity}
        - Unit Price: ${unProducto.price} - Subtotal: ${unProducto.price*unProducto.quantity}
        </p><img src="${unProducto.image.url}" alt=${unProducto.name} width="200px" height="200px"/>`);
        const productsWithoutCommas = products.join('');
    
        let total = 0;
        if (cart && cart.length)
        for (let i=0; i<cart.length; i++)
            total = total + cart[i].price*cart[i].quantity;

        const mensaje = {
            from: `"Tiger Coffee ☕" <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject: "Thank you for buying in Tiger Coffee Store ☕", // Subject line
            text: "Hello world?", // plain text body not used in this case (using html instead)
            html: ` <div>
                        <h2>${upperCaseName}, we are happy to let you know that we've received your coffee order ☕ </h2>
                        <p>Once your package ships, we will send you an email with a tracking number and link so you can see the movement of it.</p>
                        <h4>Purchase Summary:</h4>
                        ${productsWithoutCommas}
                        <p>Total Price: US$${total}</p>
                        <p>To keep buying, please go to: https://tigercoffee.vercel.app/</p>
                        <p>${upperCaseName}, we thank you once again for trusting us!</p>
                        <img src="https://res.cloudinary.com/drscelx6f/image/upload/v1668883704/ynhwwb7jrqukf6esg1ya.jpg" width="200px" height="200px" />
                    </div>`
            }

    //Sending the email if everything was OK.
    const info = await trasport.sendMail(mensaje);
    return;

    }
    
    if (email && name && error){
        const upperCaseName = name.toUpperCase();
        const mensaje = {
            from: `"Tiger Coffee ☕" <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject: "Purchase error notification!!! ☕", // Subject line
            text: "Hello world?", // plain text body not used in this case (using html instead)
            html: ` <div>
                        <h2>${upperCaseName}, we are sad to inform you something went wrong with your purchase! ☕ </h2>
                        <h4>You can go back to your cart at any time and try again with a different payment method!:</h4>
                        <p>${upperCaseName}, we thank you once again for trusting us!</p>
                        <img src="https://res.cloudinary.com/drscelx6f/image/upload/v1668883704/ynhwwb7jrqukf6esg1ya.jpg" width="200px" height="200px" />
                    </div>`
            }
        //Sending the email if something went wrong with the purchase.
        const info = await trasport.sendMail(mensaje);
        return;
    }
           
}

module.exports = sendEmail;