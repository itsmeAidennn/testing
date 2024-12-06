import React, { useState } from 'react';
import style from '../../../styling/LandingPage/FeedbackSection/Feedback.module.css';
import UdmLogo from '../../../media/udmlogo.png';

function FeedbackSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'item0',
        message: ''
    });
    const [messageFromTheEnd, setMessageFromTheEnd] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
        const response = await fetch('/api/submitFeedback', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            setMessageFromTheEnd(result.message);
            setFormData({ name: '', email: '', subject: 'item0', message: '' });
            alert(messageFromTheEnd);
        } else {
            setMessageFromTheEnd(result.message || 'Something went wrong!');
            alert(messageFromTheEnd);
        }
        } catch (error) {
        console.error('Error submitting feedback:', error);
        setMessageFromTheEnd('Error submitting feedback.');
        alert(messageFromTheEnd);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className={style.FeedbackSection}>
        <div className={style.FeedbackSectionLogo}>
            <img src={UdmLogo} alt="Udm Logo" id={`${style.FeedbackSectionLogo}`}/>
        </div>
        <form className={style.FeedbackSectionForm} onSubmit={handleSubmit}>
            <div className={style.FeedbackSectionFeedback}>
            <div className={style.FeedbackSectionTitle}>
                <label>FEEDBACK FORM</label>
            </div>
            <div className={style.FeedbackSectionName}>
                <label>Name:</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className={style.FeedbackSectionEmail}>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                />
            </div>
            <div className={style.FeedbackSectionSubject}>
                <label>Subject:</label>
                <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                >
                <option value="item0">Select Subject</option>
                <option value="item1">Feedback</option>
                <option value="item2">Suggestions</option>
                </select>
            </div>
            <div className={style.FeedbackSectionMsg}>
                <label>Message:</label>
                <textarea
                id="w3review"
                name="message"
                rows="4"
                cols="50"
                value={formData.message}
                onChange={handleInputChange}
                required
                ></textarea>
            </div>
            <div className={style.FeedbackSectionSubmit}>
                <button id={`${style.button}`} type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'SUBMIT'}
                </button>
            </div>
            </div>
        </form>
        {/* {messageFromTheEnd && <p>{messageFromTheEnd}</p>} */}
        </div>
    );
    }

export default FeedbackSection;
