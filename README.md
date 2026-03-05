**Imagine this...**
You have built a beautiful website or portfolio using NextJs,
Your contact form looks perfect,
The end-users can interact with the form, they can enter their names, emails and the message...

But when they click "Submit", nothing happens.
There's no email, no notification and definitely no way for you to receive the message. 

In this article, I will show you how to connect Nodemailer to your NextJs contact form so that you can start receiving real emails directly from your website. 

**What we will build**

A working contact form that will:

- Send email directly to your inbox.

- Uses Nodemailer.

- Uses a secure API route in Next.js.

- Handles success and error responses.

## Prerequisites
- Basic knowledge of React or Next.js.

- A next.js project set-up.

- Node.js installed.

- A Gmail account or SMTP Provider.

## Setting up a Next.js project.
On the terminal, run the following command to create a new Next.js project.

```
npx create-next-app@latest
```
Once you run the command, you will get a prompt to add the name of your project. 
I named mine _nodemailer-tutorial._ 
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y8l27b3hi3sqn7fj214r.JPG)

You can choose to proceed with the recommended defaults or customize the settings for your project. 
Once you are done with the settings, navigate to:
```
app/page.js 
app/layout.js
```
Clear the page.js file and edit the layout.js to add the title and description of your project.

## Installing the necessary dependencies.
For this project, I am using React icons and nodemailer.

**Nodemailer** is a Node.js module that allows you to send emails from your backend.
Use the following command to install nodemailer:

```
npm install nodemailer
```

**React-icons** is a popular Javascript library that provides an easy way to incorporate icons from various icon sets into your React applications. 
Use the following command to install React-icons:

```
npm install react-icons --save
```

## Create an API Route in Next.js
For security reasons, we don't send emails directly from the front-end, we instead create an API route that handles the email logic from the server side. 

The following is the file structure for creating an API route in Next.js:

```
app/api/contact/route.js
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qp71qx5s1gnp4xygb6yy.JPG)

`route.js code`:

```
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

   if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: process.env.GMAIL_USERNAME,
      subject: `New message from ${name}`,
      text: message,
      replyTo: email,
    });

    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
```
The above code does the following:

- Receives form data

- Checks that all fields are filled. 

- Logs into Gmail securely.

- Send's you an email with the User's message.
- Returns a success or error response. 

## Configure Nodemailer Transporter. 
The transporter is what connects our application, in this case, the contact form to an email service like Gmail and allows us to send emails. 

On the root directory, create a `.env.local` file

```
.env.local
```
It should look something like:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8bv4pa0cibft436hw3gw.JPG)

Your code should look something like this:

```
GMAIL_USERNAME=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
GMAIL_TO=your-email@gmail.com
```

- Ensure that there are no spaces and that your gmail account has Two-step verification enabled. (This is necessary, I will explain the reason in the following step.)

- Ensure that you add the correct credentials in the `.env.local` file.

- What happens is that, the transporter will connect our application to Gmail's SMTP (Simple Mail Transfer Protocol). Nodemailer will then used that connection such that the Gmail is delivered to your inbox. 

- This is as a result of the configuration we made on our route.js code:

```
const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
```
**Note:** The environment variable names in your `.env.local` file must match exactly what you use in your `route.js ` file. If you reference `process.env.GMAIL_USERNAME` in your code, then your `.env.local ` file must define `GMAIL_USERNAME` as well. 

## Create an APP Password for your Gmail Account.
Gmail allows you to create app passwords for your applications, provided you have enabled Two-Step verification for your account. 

This app password is essential as it will be the one you will add on your `.env.local` file as the gmail password. (_You are not supposed to add your literal gmail password._)
Under the security tab, open the App passwords option to create one:

It should look something like this:

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvez2ica79q4uxp7cxa3.JPG)

Google will give you a 16 letter password which you will use in the `.env.local` file.
**Note:** When entering the password in your `.env.local` file, **DO NOT** leave any whitespaces. 

## Connect the Front-end Contact Form

So far, our backend knows how to send emails and we our front-end collects the user information through the Contact Me Form. 

`contact.jsx`

```
"use client";

import { FaPaperPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

export default function Contact (){

    const handleSubmit = async (event) => {
        event.preventDefault ();
        const formData = new FormData (event.target);
        const data = Object.fromEntries(formData);

        try{
            const response = await fetch('/api/contact', {
                 method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (response.ok){
                alert('Email sent successfully!');
            } else{
                alert('Failed to send email.');
            }
        } catch (error){
            console.error('Error:', error);
        }
    };
    

    return(
        <section
            className="pt-20 pb-10"
            id="contact"
        >
            <div className="max-w-7xl mx-auto px-5 md:px-20">
               <h2 className="text-4xl md:text-5xl font-bold text-center text-[var(--text-color)]">
                    CONTACT ME
                </h2>
                <div className="pt-20 flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div className="space-y-6">
                            <p className=" flex gap-5 text-lg md:text-xl font-bold text-[var(--text-color)]">
                               <FaPaperPlane />
                                test@gmail.com
                            </p>
                            <p className="flex gap-5 text-lg md:text-xl font-bold text-[var(--text-color)]">
                                <FaPhone />
                                0712345678
                            </p>
                        </div>
                        <div className=" pt-10 flex-1">
                            <form onSubmit={handleSubmit}
                                className="space-y-4 mb-8"
                                id="contact-form"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full border-0 outline-none bg-[var(--snd-bg-color)] px-4 py-4 text-[var(--text-color)] text-lg rounded-[6px]"
                                /> 
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full border-0 outline-none bg-[var(--snd-bg-color)] px-4 py-4 text-[var(--text-color)] text-lg rounded-[6px]"
                                />
                                <textarea
                                    name="message"
                                    rows="6"
                                    placeholder="Add your message"
                                    className="w-full border-0 outline-none bg-[var(--snd-bg-color)] px-4 py-4 text-[var(--text-color)] text-lg rounded-[6px] resize-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-4 bg-[var(--main-color)] rounded-full shadow-lg font-semibold text-base md:text-xl text-[var(--bg-color)] tracking-wide hover:shadow-none transition"
                                >
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
```
In order to connect the two, we use the handleSubmit function. 

`handleSubmit` function:

```
const handleSubmit = async (event) => {
        event.preventDefault ();
        const formData = new FormData (event.target);
        const data = Object.fromEntries(formData);

        try{
            const response = await fetch('/api/contact', {
                 method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (response.ok){
                alert('Email sent successfully!');
            } else{
                alert('Failed to send email.');
            }
        } catch (error){
            console.error('Error:', error);
        }
    };
```
The above code segment performs the following tasks:

- By default, forms reload the page when submitted. We use the `event.preventDefault ();` to prevent this so that the submission can be handled by `JavaScript` instead. 

- The `const formData = new FormData (event.target);` `const data = Object.fromEntries(formData);` takes all the input from the form in this case (Name, Email and Message) and converts them to JavaScript objects. This gives the data structure so that it can be sent to the backend. 

- A request is then sent to `api/contact` which matches the `route.js` we had created earlier on. 

- We use the **POST** Method mainly because we are sending the data to the server and POST is used to submit data securely.

- We use `  body: JSON.stringify(data),` to stringify JSON because when sending data through `fetch` the body must be a string. This helps the server to understand the data. 

## Success and Error handling
 Success and Error handling is important mainly because it is the way our backend will communicate to the user. The user will be able to know if their email was sent or not based on the notification after submitting the form details. 

`code segment`

```
 if (response.ok){
                alert('Email sent successfully!');
            } else{
                alert('Failed to send email.');
            }
        } catch (error){
            console.error('Error:', error);
        }
```
 If the backend successfully sends the email, the user gets a confirmation message saying `Email sent successfully` and if something fails they are notified by a notification saying `Failed to send email.`

The following images show the different outcomes:

- In the instance the email is not sent, you will receive the following error message:


![Error Message](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/02dxsm07yyc6zn4mdq0v.JPG) 

- In the instance the email is sent, you will receive the following success message:

![Success Message](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uzk9katy2vu2zttnmk3f.JPG)


By the end of this blog, you will be able to connect Nodemailer to your Next.js project. 
**See you on the blog!**

**~CodesbyAbby**
