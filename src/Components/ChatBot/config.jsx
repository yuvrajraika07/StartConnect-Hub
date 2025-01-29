import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from "../ChatAssistant/Avatar";
import UserAvatar from "../ChatAssistant/UserAvatar";
import Options from './Options';

const config = {
  botName: 'InvestIQ',
  initialMessages: [
    createChatBotMessage('Welcome to StartConnect-Hub! 🙌 How can I help you?', { 
      widget: 'options' 
    }),
  ],
  customComponents: {
    botAvatar: (props) => <Avatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />,
    header: () => (
      <div
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px',
          borderRadius: '3px',
          textAlign: 'center',
          fontSize: '20px',
          display: 'flex',
        }}
      >
        StartConnect Hub Bot - InvestIQ
      </div>
    ),
  },
  widgets: [
    {
      widgetName: 'options',
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;
