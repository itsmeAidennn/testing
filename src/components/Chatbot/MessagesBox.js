import {useEffect} from 'react';

const MessagesBox = ({chat}) => {
  useEffect(() => {
    console.log("Called");
    const chatbox = document.getElementById('messagesBox')
    chatbox.scrollTop = chatbox.scrollHeight;
    console.log(chat)
  }, [chat])
  
  const RenderedContent = (user) => {
    if(user.msg){
      return(
        <p className={style.botMessagePopIn} >
          {user.msg}
        </p>
      )
    }
    if(user.img){
      return(
        <img className={`${style.messageContainer} ${style.botMessagePopIn}`} src={user.img} alt="Sent an image."></img>
      )
    }
  }

  return (
    <div id={style.messagesBox} class="p-4 h-80 overflow-y-auto">
      {chat.map((user, key) => (
        <>
          {user.sender === 'bot' ? (
            <div key={key} class="mb-2 flex">
              {RenderedContent(user)}
            </div>) : (
              <div key={key} class="mb-2 text-right">
                <p className="bg-blue-500 ml-24 text-white right rounded-lg py-2 px-4 inline-block userMessagePopIn">
                  {user.msg}
                </p>
              </div>
            )}
        </>
      ))}
    </div>
  )
}

export default MessagesBox;
