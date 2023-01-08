import { useState } from "react";
import Hero from "./components/Hero";
import Input from "./components/Input";
import Messages from "./components/Messages";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";

export type Message = {
  msg: string;
  me?: boolean;
  img: string | undefined;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem("auth");
    if (!user) return undefined;
    return JSON.parse(user);
  });
  console.log(auth);

  function addMessage(msg: Message) {
    setMessages((prev) => [...prev, msg]);
  }
  function toggleLoading(value: boolean) {
    setLoading(value);
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={!auth ? <Auth /> : <Navigate to="/chat" />} />
        <Route
          path="/chat"
          element={
            !auth ? (
              <Navigate to="/login" />
            ) : (
              <div
                style={{
                  width: "50%",
                  margin: "auto",
                  height: "100vh",
                  position: "relative",
                }}
              >
                {messages.length != 0 ? (
                  <div
                    style={{
                      height: "88%",
                      overflowY: "scroll",
                    }}
                  >
                    <Messages show={loading} messages={messages} />
                  </div>
                ) : (
                  <Hero />
                )}

                <Input toggleLoading={toggleLoading} addMessage={addMessage} />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}
