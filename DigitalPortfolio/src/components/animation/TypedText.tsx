import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingTextProps {
    text: string;
}

const TypingText: React.FC<TypingTextProps> = ({ text }) => {
  const [visibleText, setVisibleText] = useState('');
  const [index, setIndex] = useState(0);
  const [makingMistake, setMakingMistake] = useState(false);
  const randomIntBetween100and500 = Math.floor(Math.random() * (200 - 100 + 1) + 100);
  const randomIntBetween25and75 = Math.floor(Math.random() * (75 - 25 + 1) + 25);

  useEffect(() => {
    const isMakingMistake = Math.random() < 0.05; // 10% chance of making a mistake

    const timeout = setTimeout(() => {
      if (index < text.length) {
        if (isMakingMistake && !makingMistake) {
          // Introduce a random character as a mistake
          setVisibleText((prevText) => prevText + String.fromCharCode(97 + Math.floor(Math.random() * 26)));
          setMakingMistake(true);
        } else if (makingMistake) {
          // Remove the mistake character
          setVisibleText((prevText) => prevText.slice(0, -1));
          setMakingMistake(false);
        } else {
          // Continue typing
          setVisibleText((prevText) => prevText + text.charAt(index));
          setIndex((prevIndex) => prevIndex + 1);
        }
      }
    }, makingMistake ? randomIntBetween100and500 : randomIntBetween25and75); // Longer delay for correcting a mistake

    return () => clearTimeout(timeout);
  }, [text, index, makingMistake]);

  return (
    <AnimatePresence>
      <motion.div
      >
        {visibleText}
      </motion.div>
    </AnimatePresence>
  );
};

export default TypingText;