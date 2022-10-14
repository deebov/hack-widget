import React from 'react';
import { DemoPage, DemoSection } from '../components';
import Chat, {
  Bubble,
  MessageProps,
  useMessages,
  QuickReplyItemProps,
  useQuickReplies,
  Card,
  CardTitle,
  CardText,
  List,
  ListItem,
  Flex,
  FlexItem,
  ScrollView,
  ToolbarItemProps,
} from '../../../src';
import OrderSelector from './OrdderSelector';

type MessageWithoutId = Omit<MessageProps, '_id'>;

const initialMessages: MessageWithoutId[] = [
  {
    type: 'system',
    content: { text: '88VIP exclusive intelligent customer service Xiaomi serves you' },
  },
  {
    type: 'text',
    content: {
      text: 'Hi, I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
    },
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg', name: 'Xiaomi' },
    createdAt: Date.now(),
    hasTime: true,
  },
  {
    type: 'guess-you',
  },
  {
    type: 'skill-cards',
  },
  {
    type: 'text',
    content: { text: 'Xiaomi I want to check my logistics information' },
    position: 'right',
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
  {
    type: 'image',
    content: {
      picUrl: '//img.alicdn.com/tfs/TB1p_nirYr1gK0jSZR0XXbP8XXa-300-300.png',
    },
  },
  {
    type: 'system',
    content: {
      text: 'This service has been automatically ended because you have not spoken for a long time or logged out of Xiaomi (leaving the page, locking the screen, etc.)',
    },
  },
];

const defaultQuickReplies = [
  {
    icon: 'shopping-bag',
    name: 'Consult order questions (highlighted)',
    code: 'orderSelector',
    isHighlight: true,
  },
  {
    icon: 'shopping-bag',
    name: 'How to request a refund (highlighted)',
    code: 'orderSelector',
    isHighlight: true,
  },
  {
    icon: 'message',
    name: 'Contact Human Services (highlighted + new)',
    code: 'q1',
    isNew: true,
    isHighlight: true,
  },
  {
    name: 'Quality Issues (new)',
    code: 'q3',
    isNew: true,
  },
  {
    name: "Seller's copy",
    code: 'q4',
  },
  {
    name: 'Top 5 Shortcut Phrases',
    code: 'q5',
  },
  {
    name: '6 Weak Shortcut Phrases',
    code: 'q6',
  },
];

const skillList = [
  { title: 'phone bill recharge', desc: 'Smart recharge Smart recharge' },
  { title: 'Evaluation management', desc: '我的评价' },
  { title: 'Contact the merchant', desc: 'quick contact' },
  { title: 'Red Packet Cards', desc: 'Use discount' },
  { title: 'Change address', desc: 'Change address' },
];

const toolbar = [
  {
    type: 'smile',
    icon: 'smile',
    title: 'expression',
  },
  {
    type: 'orderSelector',
    icon: 'shopping-bag',
    title: 'baby',
  },
  {
    type: 'image',
    icon: 'image',
    title: 'picture',
  },
  {
    type: 'camera',
    icon: 'camera',
    title: 'Photograph',
  },
  {
    type: 'photo',
    title: 'Photo',
    img: 'https://gw.alicdn.com/tfs/TB1eDjNj.T1gK0jSZFrXXcNCXXa-80-80.png',
  },
];

export default () => {
  // message list
  const { messages, appendMsg, setTyping, prependMsgs } = useMessages(initialMessages);
  const { quickReplies, replace } = useQuickReplies(defaultQuickReplies);
  const msgRef = React.useRef(null);

  window.appendMsg = appendMsg;
  window.msgRef = msgRef;

  // send callback
  function handleSend(type: string, val: string) {
    if (type === 'text' && val.trim()) {
      // TODO: send request
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTimeout(() => {
        setTyping(true);
      }, 10);

      // Mock reply message
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: "Dear, what's your problem? Please briefly describe your problem~" },
        });
      }, 1000);
    }
  }

  // Shortcut phrase callback, you can make different operations according to item data, here is an example of sending a text message
  function handleQuickReplyClick(item: QuickReplyItemProps) {
    handleSend('text', item.name);

    if (item.code === 'q1') {
      replace([
        {
          name: 'phrase a',
          code: 'qa',
          isHighlight: true,
        },
        {
          name: 'phrase b',
          code: 'qb',
        },
      ]);
    } else if (item.code === 'orderSelector') {
      appendMsg({
        type: 'order-selector',
        content: {},
      });
    }
  }

  function handleRefresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = Date.now();

        prependMsgs([
          {
            _id: now + '1111',
            type: 'text',
            content: {
              text: '11111 Hi, I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '2222',
            type: 'text',
            content: {
              text: '22222 Hi, I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '3333',
            type: 'text',
            content: {
              text: '333 Hi, I am your exclusive intelligent assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '4444',
            type: 'text',
            content: {
              text: "444 Hi, I'm your exclusive intelligent assistant Xiaomi, please feel free to contact me if you have any questions~",
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '5555',
            type: 'text',
            content: {
              text: '555 Hi，I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '6666',
            type: 'text',
            content: {
              text: '666 Hi，I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
          {
            _id: now + '7777',
            type: 'text',
            content: {
              text: '777 Hi，I am your exclusive smart assistant Xiaomi, please feel free to contact me if you have any questions~',
            },
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          },
        ]);
        resolve({});
      }, 800);
    });
  }

  function handleToolbarClick(item: ToolbarItemProps) {
    if (item.type === 'orderSelector') {
      appendMsg({
        type: 'order-selector',
        content: {},
      });
    }
  }

  function renderMessageContent(msg: MessageProps) {
    const { type, content } = msg;

    // Render according to message type
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'guess-you':
        return (
          <Card fluid>
            <Flex>
              <div className="guess-you-aside">
                <h1>Guess you want to ask</h1>
              </div>
              <FlexItem>
                <List>
                  <ListItem
                    content="Where does my red packet refund go?"
                    as="a"
                    rightIcon="chevron-right"
                  />
                  <ListItem
                    content="Where does my red packet refund go?"
                    as="a"
                    rightIcon="chevron-right"
                  />
                  <ListItem content="How to modify the review?" as="a" rightIcon="chevron-right" />
                  <ListItem
                    content="Consultation on logistics issues"
                    as="a"
                    rightIcon="chevron-right"
                  />
                </List>
              </FlexItem>
            </Flex>
          </Card>
        );
      case 'skill-cards':
        return (
          <ScrollView
            className="skill-cards"
            data={skillList}
            fullWidth
            renderItem={(item) => (
              <Card>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.desc}</CardText>
              </Card>
            )}
          />
        );
      case 'order-selector':
        return <OrderSelector />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <DemoPage>
      <div style={{ height: 'calc(100vh - 48px)', marginTop: '-12px' }}>
        <Chat
          onRefresh={handleRefresh}
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
          rightAction={{ icon: 'compass' }}
          toolbar={toolbar}
          messagesRef={msgRef}
          onToolbarClick={handleToolbarClick}
          recorder={{ canRecord: true }}
          wideBreakpoint="600px"
          messages={messages}
          renderMessageContent={renderMessageContent}
          quickReplies={quickReplies}
          onQuickReplyClick={handleQuickReplyClick}
          onSend={handleSend}
          onImageSend={() => Promise.resolve()}
        />
      </div>
    </DemoPage>
  );
};
