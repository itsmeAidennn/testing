import style from '../../styling/Chatbot.module.css'
import chatIcon from '../../media/chatIcon.png';

const ChatbotToggle = ({chatbotHidden, setChatbotHidden, firstOpen, setFirstOpen}) => {
  const toggleChatbot = () => {
    setChatbotHidden(!chatbotHidden);
    // console.log(chatbotHidden);
    if (firstOpen) {
      setFirstOpen(false);
    }
  }
  return (
    <div className="fixed bottom-3 right-0 mb-4 slideLeftIn">
      <button id="openChat" className={`text-white py-2 px-4 rounded-md transition duration-300 flex items-center ${style.chatbotIcon} ${style.toggleButton}`} onClick={toggleChatbot}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg> */}
        <img src={chatIcon} style={{ width: '30px', height: '30px'}} />
        Chatbot
      </button>
    </div>
  )
}
// ="text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center chatbotIcon toggleButton"

export default ChatbotToggle;