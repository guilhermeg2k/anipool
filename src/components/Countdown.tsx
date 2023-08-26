import { useEffect, useState } from 'react';

const getCountdownValues = (from: Date) => {
  const now = new Date();
  const t = from.getTime() - now.getTime();
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const CountDownItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex flex-col items-center">
      <span>{value}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export const CountDown = ({ from }: { from: Date }) => {
  const [countdown, setCountdown] = useState(getCountdownValues(from));

  useEffect(() => {
    const timeout = setInterval(() => {
      const countdown = getCountdownValues(from);
      setCountdown(countdown);
    }, 1000);

    return () => clearInterval(timeout);
  }, [from]);

  return (
    <div className="text-4xl uppercase font-bold flex gap-10 w-full justify-center flex-col sm:flex-row">
      <CountDownItem label="Days" value={countdown.days} />
      <CountDownItem label="Hours" value={countdown.hours} />
      <CountDownItem label="Minutes" value={countdown.minutes} />
      <CountDownItem label="Seconds" value={countdown.seconds} />
    </div>
  );
};
