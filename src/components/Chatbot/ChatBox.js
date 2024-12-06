// import '../styling/Chatbot.css';
import style from '../../styling/Chatbot.module.css'

const ChatBox = ({inputMessage, setInputMessage, handleSubmit}) => {
  return (
    <form id = {`${style.chatBox}`} class="p-4 border-t flex" onSubmit={handleSubmit}>
      <input onChange={e => setInputMessage(e.target.value)} value={inputMessage}  id="inputText" type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
      <button id={`${style.sendButton}`} type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
    </form>
  )
}

export default ChatBox;