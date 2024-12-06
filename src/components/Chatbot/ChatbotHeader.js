// import '../styling/Chatbot.css';
import style from '../../styling/Chatbot.module.css'

const ChatbotHeader = ({setChatbotHidden, typingState}) => {
  return (
    <div id={`${style.chatbotHeader}`} className="p-4 border-b text-white rounded-t-lg flex justify-between items-center">
      <p class="text-lg font-semibold">Admin Bot</p>
      {typingState ? <h6>Typing....</h6> : null }
      <button id='closeChat' className="text-white-300 hover:text-gray-400 focus:outline-none focus:text-gray-400" onClick={() => setChatbotHidden(true)}> 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  )
}

export default ChatbotHeader;