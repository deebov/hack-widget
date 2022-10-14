import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat, {
  Bubble,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardText,
  CardTitle,
  Carousel,
  MessageProps,
  ToolbarItemProps,
  useMessages,
} from '../../../src';
import { User } from '../../../src/components/Message/Message';
import { DemoPage } from '../components';
type MessageWithoutId = Omit<MessageProps, '_id'>;

type CarouselData = {
  cards: {
    imageUrl: string;
    title: string;
    description: string;
    buttons: {
      actions: [];
      text: string;
      type: string;
      next: {
        type: string;
        ref: string;
      };
    }[];
  }[];
};

type Response = {
  confidenceThreshold: number;
  entities: [];
  messages: { text: string; buttons: { text: string }[]; carouselData?: CarouselData }[];
  predictedIntents: [];
};

const translate = async (payload: { target: string; text: string }) => {
  const res = await axios.post('https://chat.staging.ultimate.ai/api/translate', payload, {
    headers: { Authorization: 'HACK-PACK-API-KEY' },
  });
  return res;
};

const BOT_USER: User = {
  name: 'UltiMate',
  avatar:
    'https://thehub-io.imgix.net/files/s3/20220311105639-ad1226c301da6a97cd2897b72d32703b.png?fit=crop&w=300&h=300&q=60',
};

export default () => {
  // message list
  const { messages, appendMsg, setTyping, prependMsgs, updateMsg } = useMessages();
  const msgRef = React.useRef(null);
  const [conversationId, setConversationId] = useState(uuidv4());
  const [translation, setTranlation] = useState({
    active: false,
    target: null,
  });

  window.appendMsg = appendMsg;
  window.msgRef = msgRef;

  const appendResponseMessages = (_messages: Response['messages']) => {
    _messages.forEach((msg) => {
      const isButtonCard = msg.text?.trim() && msg.buttons?.length;

      const isCarousel = msg.carouselData;

      if (isButtonCard) {
        appendMsg({
          type: 'card',
          content: {
            text: msg.text,
            buttons: msg.buttons,
          },
        });
      } else if (isCarousel) {
        appendMsg({
          type: 'product-carousel',
          content: {
            cards: msg.carouselData?.cards,
          },
          position: 'left',
        });
      } else {
        appendMsg({
          type: 'text',
          content: { text: msg.text },
          position: 'left',
          // user: BOT_USER,
        });

        msg.buttons.forEach((btn) => {
          appendMsg({
            type: 'button',
            content: { text: btn.text },
            position: 'left',
            // user: {
            //   avatar:
            //     'https://thehub-io.imgix.net/files/s3/20220311105639-ad1226c301da6a97cd2897b72d32703b.png?fit=crop&w=0&h=0&q=60',
            // },
          });
        });
      }
    });
  };

  useEffect(() => {
    const startSession = async () => {
      try {
        const res = await axios.post<Response>(
          'https://chat.staging.ultimate.ai/api/v2/automation',
          {
            botId: '6347e26e5127c7c5e48f6bef',
            conversationId: conversationId,
            eventType: 'startSession',
          },
          {
            headers: {
              Authorization:
                'Basic ' +
                'bWljaGFsLm1pc2Noa2VyK2hhY2thdGhvbkB1bHRpbWF0ZS5haTpIYWNrYXRob25AMTIzNA==',
            },
          },
        );

        appendResponseMessages(res.data.messages);
      } catch (error) {}
    };

    const endSession = async () => {
      try {
        const res = await axios.post(
          'https://chat.staging.ultimate.ai/api/v2/automation',
          {
            botId: '6347e26e5127c7c5e48f6bef',
            conversationId: conversationId,
            eventType: 'endSession',
          },
          {
            headers: {
              Authorization:
                'Basic ' +
                'bWljaGFsLm1pc2Noa2VyK2hhY2thdGhvbkB1bHRpbWF0ZS5haTpIYWNrYXRob25AMTIzNA==',
            },
          },
        );
      } catch (error) {}
    };

    startSession();

    return function cleanup() {
      endSession();
    };
  }, [conversationId]);

  const sendMessage = async (text: string, cardIndex?: number) => {
    const body = {
      botId: '6347e26e5127c7c5e48f6bef',
      conversationId: conversationId,
      eventType: 'message',
      text: text,
    };

    if (typeof cardIndex === 'number') {
      body.cardIndex = cardIndex;
    }

    const res = await axios.post<Response>(
      'https://chat.staging.ultimate.ai/api/v2/automation',
      body,
      {
        headers: {
          Authorization:
            'Basic ' + 'bWljaGFsLm1pc2Noa2VyK2hhY2thdGhvbkB1bHRpbWF0ZS5haTpIYWNrYXRob25AMTIzNA==',
        },
      },
    );

    return res;
  };

  // send callback
  async function handleSend(type: string, val: string, cardIndex?: number) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      const res = await sendMessage(val, cardIndex);

      setTyping(false);

      appendResponseMessages(res.data.messages);
    }

    if (type === 'button') {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      const res = await sendMessage(val, cardIndex);

      setTyping(false);

      appendResponseMessages(res.data.messages);
    }
  }

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // Render according to message type
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'button':
        return (
          <Button
            onClick={() => {
              handleSend('button', content.text);
            }}
          >
            {content.text}
          </Button>
        );
      case 'card':
        return (
          <Card size="xl">
            <CardText>{content.text}</CardText>
            <CardActions direction="column">
              {content.buttons.map((btn) => (
                <Button
                  onClick={() => {
                    handleSend('button', btn.text);
                  }}
                >
                  {btn.text}
                </Button>
              ))}
            </CardActions>
          </Card>
        );

      case 'product-carousel':
        return (
          <Carousel>
            {(content.cards as CarouselData['cards']).map((card) => (
              <Card size="xl">
                <CardMedia image={card.imageUrl} />
                <CardTitle>{card.title}</CardTitle>
                <CardText>{card.description}</CardText>
                {/* <CardContent>Card content</CardContent> */}
                <CardActions direction="column">
                  {card.buttons.map((btn, idx) => (
                    <Button
                      onClick={() => {
                        handleSend('button', btn.text, idx);
                      }}
                    >
                      {btn.text}
                    </Button>
                  ))}
                </CardActions>
              </Card>
            ))}
          </Carousel>
        );

      default:
        return null;
    }
  }

  const translateAndUpdateMessage = async (message: MessageProps) => {
    // if(translation.active) {
    //   setTranlation({
    //     active:true,
    //     target: 'de'
    //   })
    // } else {

    // }
    const res = await translate({ target: 'es', text: message.content.text });

    updateMsg(message._id, {
      ...message,
      content: {
        text: res.data.text + ' [AI-translated]',
      },
    });
  };

  function handleToolbarClick(item: ToolbarItemProps) {
    if (item.type === 'translate') {
      messages.forEach((msg) => {
        if ((msg.type === 'text' || msg.type === 'button') && msg.position === 'left') {
          translateAndUpdateMessage(msg);
        }
      });
    }
  }

  return (
    <DemoPage>
      <div style={{ height: 'calc(100vh - 48px)', marginTop: '-12px' }}>
        <Chat
          // onRefresh={handleRefresh}
          navbar={{
            leftContent: {
              icon: 'chevron-left',
              title: 'Back',
            },
            rightContent: [
              {
                icon: 'apps',
                title: 'Applications',
              },
              {
                icon: 'ellipsis-h',
                title: 'More',
              },
            ],
            title: 'Assistant',
          }}
          locale="en-US"
          // loadMoreText='Load More'
          // rightAction={{ icon: 'compass' }}
          placeholder="Enter your question..."
          messagesRef={msgRef}
          wideBreakpoint="600px"
          messages={messages}
          renderMessageContent={renderMessageContent}
          onSend={handleSend}
          onToolbarClick={handleToolbarClick}
          toolbar={[
            {
              type: 'translate',
              title: translation.active ? 'Disable translation' : 'Enable translation',
              img: 'https://cdn4.iconfinder.com/data/icons/logos-4/24/Translate-512.png',
            },
          ]}
        />
      </div>
    </DemoPage>
  );
};
