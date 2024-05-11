import "./Bubbles.scss";
import { Key, useEffect, useState } from "react";

const bubbleTexts = [
  // don't break me~
  "🎈",
  "❤️",
  "💖",
  "💕",
  "🩹",
  "🌈",
  "🎉",
  "🏳️‍⚧️",
  "🏳️‍🌈",
  "🌟",
  "🌸",
  "🌺",
  "🌼",
];

const maxBubbles = 10;
const initialBubbles = 6;

export function BubblesOverlay() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => setHeight(document.body.scrollHeight);

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(document.body);

    window.addEventListener("resize", updateHeight);
    updateHeight();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const [bubbles, setBubbles] = useState<JSX.Element[]>([]);
  useEffect(() => {
    function spawnBubble() {
      const bubble = newBubble(bubbles.length);
      setBubbles([...bubbles, bubble]);
      setTimeout(
        () => setBubbles(bubbles.filter((b) => b !== bubble)),
        bubble.durationSeconds * 1000,
      );
    }

    while (bubbles.length < initialBubbles) {
      setTimeout(() => spawnBubble(), generateVariance(0, 0, 5000));
    }

    const interval = setInterval(() => {
      if (bubbles.length < maxBubbles) {
        spawnBubble();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [bubbles]);

  return (
    <div
      id="bubbles-background"
      style={{ "--page-height": `${height}px` } as React.CSSProperties}
    ></div>
  );
}

function newBubble(key: Key): JSX.Element & { durationSeconds: number } {
  // Spawn the bubble underneath the screen wrt the scroll position.
  // Don't spawn at the bottom of the page, because it will take a while to
  // float up.
  const bubbleSize = generateVariance(100, -40, 80);
  const startY = window.scrollY + window.innerHeight + bubbleSize;

  console.debug("spawning bubble", {
    scrollY: window.scrollY,
    innerHeight: window.innerHeight,
    bubbleSize: bubbleSize,
  });

  const durationSeconds = generateVariance(15, -10, 10);
  const bubble = Bubble({
    key,
    text: bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)],
    vars: {
      "--left": Math.random() * 100 - 5 + "%",
      "--size": bubbleSize + "px",
      "--start-y": startY + "px",
      "--duration": durationSeconds + "s",
      "--wobble-scale": generateVariance(1, -0.5, 0.5).toString(),
      "--wobble-duration": generateVariance(2, -1, 1) + "s",
    },
  });

  return { ...bubble, durationSeconds };
}

function Bubble({
  key,
  text,
  vars,
}: {
  key: Key;
  text: string;
  vars: Record<`--${string}`, string>;
}) {
  return (
    <div key={key} className="bubble" style={vars as React.CSSProperties}>
      {text}
    </div>
  );
}

function generateVariance(value: number, min: number, max: number) {
  min = value + min;
  max = value + max;
  return Math.random() * (max - min) + min;
}
