import React, { FC, useState, useRef } from 'react';
import { Input, Avatar, Col, Row } from 'antd';
import './index.css';
import type {
  ConversationState,
  WebSocketRequest,
  WebSocketResponse,
} from "../../../chat-with-kg/types/websocketTypes";
import useWebSocket, { ReadyState } from "react-use-websocket";

const { TextArea } = Input;

interface IMsgData {
  position: 'right' | 'left';
  text: string;
  date?: number;
  type?: string;
}
const MsgBox: FC<IMsgData> = ({ position, text }) => {
  const contStyle: any =
    position === 'left'
      ? {
          float: 'left',
          marginLeft: 12,
          backgroundColor: '#fff'
        }
      : {
          float: 'right',
          marginRight: 12,
          backgroundColor: '#7AB71C',
          color: '#fff',
        };
  return (
    <Row className="msgBox">
      {position === 'left' && (
        <Col>
          <Avatar>A</Avatar>
        </Col>
      )}
      <Col flex={1}>
        <div className="msgCont" style={contStyle}>
          {text}
        </div>
      </Col>
      {position === 'right' && (
        <Col>
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
        </Col>
      )}
    </Row>
  );
};

function loadKeyFromStorage() {
  return localStorage.getItem("api_key");
}
const URI =
  import.meta.env.VITE_KG_CHAT_BACKEND_ENDPOINT ??
  "ws://localhost:7860/text2text";
const QUESTION_PREFIX_REGEXP = /^[0-9]{1,2}[\w]*[\.\)\-]*[\w]*/;
const QUESTIONS_URI =
  import.meta.env.VITE_KG_CHAT_SAMPLE_QUESTIONS_ENDPOINT ??
  "http://localhost:7860/questionProposalsForCurrentDb";

function stripQuestionPrefix(question: string): string {
    if (question.match(QUESTION_PREFIX_REGEXP)) {
      return question.replace(QUESTION_PREFIX_REGEXP, "");
    }
    return question;
  }

const Chat: FC = () => {
  const msgBox = useRef(null)
  const [apiKey, setApiKey] = useState(loadKeyFromStorage() || "");
  const [keyword, setKeyword] = useState('');
  const [msgs, setMsgs] = useState<IMsgData[]>([]);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);
  const [text2cypherModel, setText2cypherModel] = useState<string>("gpt-3.5-turbo");

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(URI, {
    shouldReconnect: () => true,
    reconnectInterval: 5000,
  });

  function loadSampleQuestions() {
    const body = {
      api_key: apiKey,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(QUESTIONS_URI, options).then(
      (response) => {
        response.json().then(
          (result) => {
            if (result.output && result.output.length > 0) {
              setSampleQuestions(result.output.map(stripQuestionPrefix));
            } else {
              setSampleQuestions([]);
            }
          },
          (error) => {
            setSampleQuestions([]);
          }
        );
      },
      (error) => {
        setSampleQuestions([]);
      }
    );
  }

  const sendQuestion = (question: string) => {
    const webSocketRequest: WebSocketRequest = {
      type: "question",
      question: question,
    };
    if (apiKey) {
      webSocketRequest.api_key = apiKey;
    }
    webSocketRequest.model_name = text2cypherModel;
    sendJsonMessage(webSocketRequest);
  };

  const submitHandler = () => {
    sendQuestion(keyword)
    // msgs.push({
    //   position: 'right',
    //   type: 'text',
    //   text: keyword,
    //   date: new Date().getTime(),
    // });
    // msgs.push({
    //   position: 'left',
    //   type: 'text',
    //   text: 'What can I do for you?',
    //   date: new Date().getTime(),
    // });
    // setMsgs(msgs);
    // setKeyword('');
    // if (msgBox.current) {
    //   setTimeout(() => {
    //     msgBox.current.scrollTo(0, 10000)
    //   }, 200)
    // }
  };

  return (
    <div>
      <div className="msglist" ref={msgBox}>
        {msgs.map((i) => (
          <MsgBox key={i.date} {...i} />
        ))}
      </div>
      <div style={{ padding: 16 }}>
        <TextArea
          placeholder="Enter to Submit"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
          onPressEnter={(e) => {
            if (e.ctrlKey || e.metaKey) {
              submitHandler();
            }
          }}
          rows={4}
          style={{ marginTop: 12 }}
        />
      </div>
    </div>
  );
};

export default Chat;
