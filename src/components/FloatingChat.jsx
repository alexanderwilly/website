import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import json_obj from '../media/input.json';
import urls from '../media/urls.json';
import './styles/FloatingChat.css';
import loading_bar from '../media/loading_bar.gif';

function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);

    // history includes the first default message
    const [history, setHistory] = useState([
        {
            role: 'assistant',
            content: "Hey, I'm Alexander's AI Assistant. I'm here to help you learn about Alexander's background, skills, and experience. How can I help you today?"
        }
    ]);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [history, isGenerating, isOpen]);

    const submitPrompt = async (customPrompt) => {
        const textToSubmit = customPrompt || prompt;
        if (textToSubmit.trim().length === 0) return;

        const prompt_obj = { role: 'user', content: textToSubmit.slice(0, 128) };
        const assistant_obj = { role: 'assistant', content: null };

        setIsGenerating(true);
        if (!customPrompt) setPrompt('');

        const newHistory = [...history, prompt_obj];
        setHistory([...newHistory, assistant_obj]);

        try {
            // Need to filter out the initial prompt if it wasn't there before
            const apiHistory = newHistory.slice(1);

            const response = await fetch(urls.api_endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: apiHistory })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            if (!response.body) throw new Error('ReadableStream not supported.');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;

                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    setHistory(prev => {
                        const newHist = [...prev];
                        const lastIndex = newHist.length - 1;
                        const updatedMsg = { ...newHist[lastIndex] };
                        if (updatedMsg.content === null) updatedMsg.content = chunk;
                        else updatedMsg.content += chunk;
                        newHist[lastIndex] = updatedMsg;
                        return newHist;
                    });
                }
            }
        } catch (e) {
            console.error(e);
            setHistory(prev => {
                const newHist = [...prev];
                newHist[newHist.length - 1].content = `Sorry, it seems that you have encountered a technical issue. Please e-mail to ${json_obj.contacts[0].contact_display} if you have any questions.`;
                return newHist;
            });
            toast.error('Oops! An error occurred.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isGenerating) submitPrompt();
        }
    };

    return (
        <div className="floating-chat-wrapper">
            {isOpen ? (
                <div className="floating-chat-window">
                    <div className="fc-header">
                        <div className="fc-header-info">
                            <div className="fc-avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            </div>
                            <div className="fc-title-group">
                                <h3 className="fc-title">{json_obj.display_name.split(' ')[0]}'s AI Assistant <span className="fc-status-dot"></span></h3>
                                <p className="fc-status-text">Online</p>
                            </div>
                        </div>
                        <button className="fc-close-btn" onClick={toggleChat}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div className="fc-body">
                        {history.map((msg, idx) => (
                            <div key={idx} className={`fc-message-container ${msg.role === 'user' ? 'user-container' : 'assistant-container'}`}>
                                <div className="fc-message-label">
                                    {msg.role === 'assistant' ? (
                                        <>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            <span>{json_obj.display_name.split(' ')[0]}'s AI Assistant</span>
                                        </>
                                    ) : (
                                        <span>You</span>
                                    )}
                                </div>
                                <div className={`fc-message ${msg.role === 'user' ? 'user-msg' : 'assistant-msg'}`}>
                                    {msg.role === 'assistant' ? (
                                        msg.content === null ? (
                                            <img src={loading_bar} alt="Loading..." className="fc-loading-icon" />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content) }} />
                                        )
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="fc-footer">
                        <input
                            type="text"
                            placeholder="Ask about my background, skills, and experience..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isGenerating}
                        />
                        <button className="fc-submit-btn" onClick={() => submitPrompt()} disabled={isGenerating || !prompt.trim()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        </button>
                    </div>
                </div>
            ) : (
                <button className="floating-chat-bubble" onClick={toggleChat}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span>Ask me anything</span>
                </button>
            )}
        </div>
    );
}

export default FloatingChat;
