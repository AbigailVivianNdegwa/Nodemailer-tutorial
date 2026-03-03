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