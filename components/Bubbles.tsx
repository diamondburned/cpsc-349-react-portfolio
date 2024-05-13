import "./Bubbles.scss";

import { Component } from "react";

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
const perspective = 3; // see Bio.scss for the corresponding value

type BubblesOverlayProps = {
  scrollElement: HTMLElement | null;
};

type BubblesOverlayState = {
  bubbles: ReturnType<typeof Bubble>[];
};

export class BubblesOverlay extends Component<BubblesOverlayProps, BubblesOverlayState> {
  scrollElement: HTMLElement | null;
  idleCallback: number | null = null;

  state: BubblesOverlayState = {
    bubbles: [],
  };

  constructor(props: { scrollElement: HTMLElement | null }) {
    super(props);
    this.scrollElement = props.scrollElement;
  }

  render() {
    return (
      <div id="bubbles-background" suppressHydrationWarning>
        {this.state.bubbles}
      </div>
    );
  }

  componentDidMount() {
    const requestIdleCallback =
      window.requestIdleCallback ||
      ((callback: IdleRequestCallback) => {
        const start = Date.now();
        return setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: function () {
              return Math.max(0, 50 - (Date.now() - start));
            },
          });
        }, 1);
      });

    const callback = (deadline: IdleDeadline) => {
      if (deadline.timeRemaining() > 0) {
        this.spawnBubble();
      }
      this.idleCallback = requestIdleCallback(callback);
    };

    this.idleCallback = requestIdleCallback(callback);
  }

  componentWillUnmount() {
    if (this.idleCallback) {
      cancelIdleCallback(this.idleCallback);
    }
  }

  private spawnBubble() {
    if (!this.scrollElement) {
      console.debug("cannot spawn bubble, no scroll element");
      return;
    }

    this.setState((state) => {
      let { bubbles } = state;

      // If we're past a certain amount of the bubbles, check for any bubbles
      // that have floated off the top of the screen.
      if (bubbles.length >= maxBubbles * 0.85) {
        bubbles = bubbles.filter((bubble) => {
          const element = bubble.element();
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 0) {
              console.debug("removing bubble", bubble.key);
              return false;
            }
          }
          return true;
        });
      }

      if (bubbles.length >= maxBubbles) {
        return { bubbles };
      }

      if (Math.random() > 0.65) {
        console.debug("got", bubbles.length, "bubbles, spawning more");

        const bubble = Bubble({ scrollElement: this.scrollElement! });
        bubbles = [...bubbles, bubble];
      }

      return { bubbles };
    });
  }
}

function childScale(zDepth: number): number {
  // https://stackoverflow.com/q/45578101/5041327
  return 1 + -zDepth / perspective;
}

let globalBubbleID = 0;

function Bubble({ scrollElement }: { scrollElement: HTMLElement }): JSX.Element & {
  durationSeconds: number;
  element: () => HTMLElement | null;
} {
  // Spawn the bubble underneath the screen wrt the scroll position.
  // Don't spawn at the bottom of the page, because it will take a while to
  // float up.
  const zDepth = -(Math.random() * 4);
  const zScale = childScale(zDepth);

  const scrollHeight = scrollElement.scrollHeight * zScale;
  const startY = (scrollElement.scrollTop + document.body.scrollHeight) * zScale;

  const leftMargin = 50;
  const left = biasedRandom() * (100 + leftMargin * 2) - leftMargin;

  console.debug("spawning bubble", {
    scrollY: window.scrollY,
    startY,
    height: scrollHeight,
    zDepth,
    zScale,
    left,
    scrollElement,
  });

  const key = `${globalBubbleID++}`;
  const durationSeconds = generateVariance(15, -10, 10);

  const bubble = (
    <div
      id={`bubble-${key}`} // FUCK IT WE BALL
      key={key}
      className="bubble"
      style={
        {
          "--left": `${left}%`,
          "--z-depth": zDepth.toString(),
          "--z-scale": zScale.toString(),
          "--start-y": startY + "px",
          "--duration": durationSeconds + "s",
          "--wobble-scale": generateVariance(1, -0.75, 0.75).toString(),
          "--wobble-duration": generateVariance(2, -1, 1) + "s",
        } as React.CSSProperties
      }
    >
      {bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)]}
    </div>
  );

  return {
    ...bubble,
    element: () => document.getElementById(`bubble-${key}`),
    durationSeconds,
  };
}

function generateVariance(value: number, min: number, max: number) {
  min = value + min;
  max = value + max;
  return Math.random() * (max - min) + min;
}

// biasedRandom returns random numbers that are more biased in the range [0.0,
// 0.1] and [0.9, 1.0].
function biasedRandom(): number {
  const r = Math.random();
  const b = 0.1;
  if (Math.random() > 0.25) {
    return r * b + (r < 0.5 ? 0 : 1 - b);
  }
  return r;
}
