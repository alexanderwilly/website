import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { toast } from "react-toastify";

import loading_bar from '../media/loading_bar.gif'
import axios from 'axios';
import DOMPurify from "dompurify";
import json_obj from '../media/input.json'
import urls from '../media/urls.json'

import './styles/Chat.css'


function Chat(){
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
        try{
            if(prompt.trim().length == 0){
                toast.info('Please ask me something 😊');
                return;
            }


            const prompt_obj = {
                'role' : 'user',
                'content': prompt.slice(0, 128)
            };
            
            const assistant_obj = {
                'role' : 'assistant',
                'content' : null
            }

            setIsGenerating(true);
            history.push(prompt_obj);
            history.push(assistant_obj);
            setPrompt('');
 
            let res = await axios.post(urls.api_endpoint,
                {
                    history: history
                }
            ) ;


            history[ history.length - 1 ].content = res.data.message;
            setIsGenerating(false);

        }catch(e){
            history[ history.length - 1 ].content = `Sorry, it seems that you have encountered a technical issue. Please e-mail to ${json_obj.contacts[0].contact_display} if you have any questions.`
            setIsGenerating(false);
            toast.error('Oops! An error occured:', e);
            
        }
         
        
    }

    const scrollToBottom = () => {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth', 
        });
    };

    const PromptCard = ({index, history}) => {
        return (
            <div className = 'prompt-card' id = {`prompt-card-${index}`} index = {index}>

                {
                    history.role == 'user'?
                    <div className = 'user-chat-container'>
                        <p>{history.content}</p>
                    </div>
                    :
                    null
                }

                {
                    history.role == 'assistant'?
                    (
                        history.content == null ?
                        <div className = 'assistant-chat-container'>
                            <img src = {loading_bar} />
                        </div>
                        :
                        <div className = 'assistant-chat-container'>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(history.content) }} />
                        </div>
                    ):
                    null
                    
                }

                
            </div>
        );
    }

    useEffect(()=>{
        scrollToBottom();
    },[isGenerating])

    return(
        <main id = 'chatbot'>
            <Navbar/>
            <section className = 'chat-section'>
                <div className = 'chat-container'>

                    {
                        history.length == 0 ? 
                        <div className = "chat-hero-content-container"> 
                            <h1 className = "section-heading"><span>Hello!</span></h1>
                            <h1 className = "section-heading">How can I help you today?</h1>
                        </div>
                        :
                        history.map( (history, index) => (
                            <PromptCard
                                key = {index}
                                index = {index}
                                history = {history}
                            />
                        )
                            
                        )
                    }

                </div>
                <div className = 'user-input-box-container'>
                    <div className = 'chatbox-form' >
                        <input 
                            id = 'input-box' 
                            type = 'text' 
                            placeholder='Ask me' 
                            maxLength={128} 
                            onChange = {writePrompt}
                            onKeyPress={handleKeyPress}
                            value={prompt} 
                            disabled={isGenerating} 
                            aria-disabled={isGenerating}
                        />
                        <button className = 'submit-chatbox-button' onClick={submitPrompt} disabled={isGenerating} aria-disabled={isGenerating}>
                            {`>`}
                        </button>
                    </div>
                    <span>Note that this conversation will not be recorded</span>
                    
                </div>
            </section>
            

        </main>
    );
}

export default Chat;