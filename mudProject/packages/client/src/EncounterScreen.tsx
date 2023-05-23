import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { useMUD } from "./MUDContext";
import { MonsterCatchResult } from "./monsterCatchResult";

type Props = {
  monsterName: string;
  monsterEmoji: string;
  questionBody: string;
  opt1: string;
  opt2: string;
  opt3: string;
  correct: number;
};

export const EncounterScreen = ({
  monsterName,
  monsterEmoji,
  questionBody,
  opt1,
  opt2,
  opt3,
  correct,
}: Props) => {
  const {
    systemCalls: { throwBall, fleeEncounter },
  } = useMUD();

  const [appear, setAppear] = useState(false);
  const [icon, setIcon] = useState("❔");
  const [bodyText, setBodyText] = useState(questionBody);
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    // sometimes the fade-in transition doesn't play, so a timeout is a hacky fix
    const timer = setTimeout(() => setAppear(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const answer = async (index: number) => {
    const answering = toast.loading("answering…");
    if (index === correct) {
      setIcon("✅");
      setBodyText("Great good answer!");
      setShowAnswer(true);
      toast.update(answering, {
        isLoading: false,
        type: "success",
        render: "Correct answer!",
        autoClose: 5000,
        closeButton: true,
      });
    } else {
      setIcon("❌");
      setBodyText("Incorrect answer!");
      setShowAnswer(true);
      toast.update(answering, {
        isLoading: false,
        type: "success",
        render: "Incorrect answer!",
        autoClose: 5000,
        closeButton: true,
      });
    }
  };
  return (
    <div
      className={twMerge(
        "flex flex-col gap-10 items-center justify-center bg-black text-white transition-opacity duration-1000",
        appear ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-8xl animate-bounce">{icon}</div>
      <div>{bodyText}</div>

      {!showAnswer && (
        <div className="flex gap-3">
          <button
            type="button"
            className="bg-stone-800 hover:ring rounded-lg px-4 py-2"
            onClick={async () => {
              answer(1);
            }}
          >
            🇦 {opt1}
          </button>
          <button
            type="button"
            className="bg-stone-800 hover:ring rounded-lg px-4 py-2"
            onClick={async () => {
              answer(2);
            }}
          >
            🇧 {opt2}
          </button>
          <button
            type="button"
            className="bg-stone-800 hover:ring rounded-lg px-4 py-2"
            onClick={async () => {
              answer(3);
            }}
          >
            🇨 {opt3}
          </button>
        </div>
      )}
      <button
        type="button"
        className="bg-stone-800 hover:ring rounded-lg px-4 py-2"
        onClick={async () => {
          const toastId = toast.loading("Running away…");
          await fleeEncounter();
          toast.update(toastId, {
            isLoading: false,
            type: "default",
            render: `You leave!`,
            autoClose: 5000,
            closeButton: true,
          });
        }}
      >
        🏃‍♂️ Exit
      </button>
    </div>
  );
};
