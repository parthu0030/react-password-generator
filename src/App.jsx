import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // new state

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 16);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // feedback resets after 1.5s
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-800">
        <h1 className="text-white text-center text-2xl font-bold mb-4">
          🔐 Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-lg font-mono text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 hover:bg-blue-800 transition-all text-white px-4 py-2 font-semibold"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="rangeInput">Password Length: {length}</label>
            <input
              id="rangeInput"
              type="range"
              min={6}
              max={15}
              value={length}
              className="cursor-pointer w-1/2"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
