import { useEffect, useState } from "react";

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const target = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        // return;
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, "0");
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        const s = Math.floor((difference % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }
    });
  });

  return (
    <div className="flex flex-row items-center gap-x-2 self-end ml-9">
      <div className="flex flex-col items-center">
        <h4 className="text-xs font-semibold">Days</h4>
        <p className="text-3xl text-black font-semibold">{days}</p>
      </div>
      <div className="p-2">
        <div className="rounded-full h-1 aspect-square mb-3 bg-black"></div>
        <div className="rounded-full h-1 aspect-square bg-black"></div>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-xs font-semibold">Hours</h4>
        <p className="text-3xl text-black font-semibold">{hours}</p>
      </div>
      <div className="p-2">
        <div className="rounded-full h-1 aspect-square mb-3 bg-black"></div>
        <div className="rounded-full h-1 aspect-square bg-black"></div>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-xs font-semibold">Minutes</h4>
        <p className="text-3xl text-black font-semibold">{minutes}</p>
      </div>
      <div className="p-2">
        <div className="rounded-full h-1 aspect-square mb-3 bg-black"></div>
        <div className="rounded-full h-1 aspect-square bg-black"></div>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-xs font-semibold">Seconds</h4>
        <p className="text-3xl text-black font-semibold">{seconds}</p>
      </div>
    </div>
  );
};

export default Countdown;
