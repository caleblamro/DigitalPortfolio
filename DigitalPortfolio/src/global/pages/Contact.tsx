import React, { useState } from 'react';
import Button, { ButtonType } from '../../components/button/Button';
import { useTheme } from '../../App';
import { Text, TextType } from '../../components/text/Text';
import { message } from 'antd';
import "./Contact.css";


const ContactForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with the form data, e.g., send it to an API.
        console.log(formData);
        messageApi.open({
            type: 'success',
            content: <span style={{fontFamily: "AnonymousPro"}}>Success</span>,
        });
    };

    return (
        <form className='contactForm' onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
            {contextHolder}
            <div className='formElementGroup'>
                <div className='formElementContainer'>
                    <label htmlFor="name"><Text bold={true} color={theme.palette.text} content='Name' /></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className='formElement'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formElementContainer'>
                    <label htmlFor="Email"><Text bold={true} color={theme.palette.text} content='Email' /></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='formElement'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className='formElementContainer stretch'>
                <label htmlFor="message"><Text bold={true} type={TextType.BODY} color={theme.palette.text} content='Message' /></label>
                <textarea
                    id="message"
                    name="message"
                    className='formElement message'
                    value={formData.message}
                    onChange={(e) => handleChange(e)}
                    required
                ></textarea>
            </div>
            <div className='formElementGroup' style={{alignSelf: "center"}}>
                <Button type={ButtonType.TEXT} textProps={{color: theme.palette.alert.error}} content='Clear' />
                <Button type={ButtonType.BORDERED} style={{backgroundColor: theme.palette.primary}} content='Submit'/>
            </div>
        </form>
    );
};

export default ContactForm;