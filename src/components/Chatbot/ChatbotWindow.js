import {useState} from 'react';
import ChatbotHeader from './ChatbotHeader';
import MessagesBox from './MessagesBox';
import ChatBox from './ChatBox';
import style from '../../styling/Chatbot.module.css'
// import '../styling/Chatbot.css';

const ChatbotWindow = ({chatbotHidden, setChatbotHidden, firstOpen}) => {
  const [typingState, setTypingState] = useState(false);
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  

  const rasaAPI = async function handleClick(name,msg) {
    try {
      await fetch('http://192.168.1.48:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset':'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": name, "message": msg }),
      })
      .then(response => response.json())
      .then((response) => {
        if(response){
          for(let x in response) {
            const temp = response[x];
            if (temp["text"]){
              const recipient_id = temp["recipient_id"];
              const recipient_msg = temp["text"];
              const response_temp = {sender: "bot", recipient_id : recipient_id, msg: recipient_msg};
              setChat(chat => [...chat, response_temp]);
            }
            if (temp['image']) {
              const recipient_id = temp["recipient_id"];
              const recipient_img = temp["image"];
              const response_temp = {sender: "bot", recipient_id : recipient_id, img: recipient_img};
              setChat(chat => [...chat, response_temp]);
            }
          }
          setTypingState(false);
        }
      }) 
    }
    catch(e){
      alert("Our chatbot is stull sleeping at the moment");
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "Chris";
    const request_temp = {sender: "user", sender_id: name, msg: inputMessage};

    if(inputMessage !== ""){
      setChat(chat => [...chat, request_temp]);
      setTypingState(true);
      setInputMessage('');
      rasaAPI(name, inputMessage);
    } else {
      alert("You didn't put anything on the box.")
    }
  }

  return (
    <div id={`${style.chatContainer}`} className={`fixed bottom-20 right-8 w-96 ${firstOpen ? style.hidden : ``} ${chatbotHidden ? style.closeChatWindow : style.openChatWindow}`}>
      <div id = {`${style.chatWindow}`} class="bg-white shadow-md rounded-lg max-w-lg w-full">
        <ChatbotHeader setChatbotHidden = {setChatbotHidden} typingState = {typingState} />
        <MessagesBox chat = {chat} />
        <ChatBox inputMessage = {inputMessage} setInputMessage = {setInputMessage} handleSubmit = {handleSubmit} />
      </div>
    </div>
  )
}

export default ChatbotWindow;