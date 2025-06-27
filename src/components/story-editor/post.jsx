import { useState } from "react";

export const Post = () => {
  const [throttleTimeout, setThrottleTimeout] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const handleThrottle = (timeout) => {
    if (!throttleTimeout) {
      console.log("Throttled button clicked");
      setThrottleTimeout(
        setTimeout(() => {
          setThrottleTimeout(null);
        }, timeout)
      );
    }
  };

  const handleDebounce = (value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        console.log("value", value);
      }, 500)
    );
  };
  const handleChange = (event) => {
    const { value } = event.target;

    // Trigger both throttling and debouncing
    handleThrottle();
    handleDebounce(value);
  };
  return (
    <div>
      <button onClick={handleChange}>Click me</button>
      <br />
      <input
        type="text"
        placeholder="Type something..."
        onChange={handleChange}
      />
    </div>
  );
};
