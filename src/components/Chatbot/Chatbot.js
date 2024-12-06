import {useState} from 'react';
import ChatbotToggle from './ChatbotToggle';
import ChatbotWindow from './ChatbotWindow';

const Chatbot = () => {
  const [chatbotHidden, setChatbotHidden] = useState(true);
  const [firstOpen, setFirstOpen] = useState(true);
  return (
    <>
        <ChatbotToggle chatbotHidden = {chatbotHidden} setChatbotHidden = {setChatbotHidden} firstOpen = {firstOpen} setFirstOpen = {setFirstOpen} />
        <ChatbotWindow chatbotHidden = {chatbotHidden} setChatbotHidden = {setChatbotHidden} firstOpen = {firstOpen} />
    </>
  )
}

export default Chatbot;