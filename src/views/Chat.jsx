import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from "react-toastify";

import loading_bar from '../media/loading_bar.gif'
import axios from 'axios';
import DOMPurify from "dompurify";
import json_obj from '../media/input.json'
import urls from '../media/urls.json'

import './styles/Chat.css'

function Chat() {
    const [history, setHistory] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const writePrompt = (e) => {
        setPrompt(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isGenerating) {
                submitPrompt();
            }
        }
    };

    const submitPrompt = async () => {
        try {
            if (prompt.trim().length === 0) {
                toast.info('Please ask me something 😊');
                return;
            }

            const prompt_obj = {
                'role': 'user',
                'content': prompt.slice(0, 128)
            };

            const assistant_obj = {
                'role': 'assistant',
                'content': null
            }

            setIsGenerating(true);
            setPrompt('');
            
            setHistory(prevHistory => [...prevHistory, prompt_obj, assistant_obj]);

            let res = await axios.post(urls.api_endpoint,
                {
                    history: [...history, prompt_obj, assistant_obj]
                }
            );

            setHistory(prevHistory => {
                const updatedHistory = [...prevHistory];
                updatedHistory[updatedHistory.length - 1].content = res.data.message;
                return updatedHistory;
            });

            setIsGenerating(false);

        } catch (e) {
            setHistory(prevHistory => {
                const updatedHistory = [...prevHistory];
                updatedHistory[updatedHistory.length - 1].content = `Sorry, it seems that you have encountered a technical issue. Please e-mail to ${json_obj.contacts[0].contact_display} if you have any questions.`;
                return updatedHistory;
            });
            setIsGenerating(false);
            toast.error('Oops! An error occurred: ' + e.message);
        }
    }

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    const PromptCard = ({ index, chatHistory }) => {
        return (
            <div className='pg-chat-prompt-card' id={`prompt-card-${index}`}>
                {
                    chatHistory.role === 'user' ?
                        <div className='pg-chat-user-container'>
                            <p>{chatHistory.content}</p>
                        </div>
                        : null
                }

                {
                    chatHistory.role === 'assistant' ?
                        (
                            chatHistory.content == null ?
                                <div className='pg-chat-assistant-container pg-chat-glass'>
                                    <img src={loading_bar} alt="Loading..." className="pg-chat-loading-icon" />
                                </div>
                                :
                                <div className='pg-chat-assistant-container pg-chat-glass'>
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chatHistory.content) }} />
                                </div>
                        ) : null
                }
            </div>
        );
    }

    useEffect(() => {
        scrollToBottom();
    }, [history, isGenerating]);

    return (
        <main id='pg-chat-main'>
            <Navbar />
            <section className='pg-chat-section'>
                <div className='pg-chat-container'>

                    {
                        history.length === 0 ?
                            <div className="pg-chat-hero-content">
                                <h1 className="pg-chat-gradient-text">Hello!</h1>
                                <h1>How can I help you today?</h1>
                            </div>
                            :
                            history.map((item, index) => (
                                <PromptCard
                                    key={index}
                                    index={index}
                                    chatHistory={item}
                                />
                            ))
                    }

                </div>
                
                <div className='pg-chat-input-box-container pg-chat-glass-panel'>
                    <div className='pg-chat-form'>
                        <input
                            id='pg-chat-input'
                            type='text'
                            placeholder='Ask me anything...'
                            maxLength={128}
                            onChange={writePrompt}
                            onKeyPress={handleKeyPress}
                            value={prompt}
                            disabled={isGenerating}
                            aria-disabled={isGenerating}
                        />
                        <button className='pg-chat-submit-btn' onClick={submitPrompt} disabled={isGenerating} aria-disabled={isGenerating}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                    <span>Note that this conversation will not be recorded</span>
                </div>
            </section>
        </main>
    );
}

export default Chat;