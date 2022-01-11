const { useState, useEffect } = require('react');

function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return currentTime;
}
export default useCurrentTime;
