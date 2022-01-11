import useCurrentTime from 'hooks/useCurrentTime';
import { useEffect, useState } from 'react';
import './Clock.css';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function Clock() {
  const [date, setDate] = useState(new Date());
  const currentTime = useCurrentTime();
  useEffect(
    // 이 함수는 현 컴포넌트가 mount 시에 호출됨
    () => {
      const interval = setInterval(() => {
        setDate(new Date());
      }, 1000);
      // 리턴된 함수는 현 컴포넌트 unmount시에 호출됨
      return () => {
        clearInterval(interval);
      };
    },
    [],
  );

  return (
    <div className="clock-wrapper">
      <h2>시계</h2>

      <div class="clock">
        <p class="date">
          {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}{' '}
          {WEEKDAYS[date.getDay()]}
        </p>
        {/* <p class="time">{date.toISOString().slice(11, 19)}</p> */}
        <p class="time">{currentTime}</p>
        <p class="text">Powered by React.js</p>
      </div>
    </div>
  );
}

export default Clock;
