import { motion } from 'framer-motion';
import React from 'react';

import * as Styled from './styles';

const HomePage: React.FC = () => {
  return (
    <Styled.HomePageWrapper>
      <Styled.HomePageHeroWrapper>
        Literally, finance in retrospect. For long term investors 💸
      </Styled.HomePageHeroWrapper>
      <Styled.HomePageTextWrapper>
        <Styled.HomePageText>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            📝 Record your investments <i>not made</i>.
          </motion.div>
        </Styled.HomePageText>
        <Styled.HomePageText>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            ⌛ Let <i>time</i> do the work.
          </motion.div>
        </Styled.HomePageText>
        <Styled.HomePageText>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3 }}
          >
            🧑‍🎓 Look back & <i>Learn</i>.
          </motion.div>
        </Styled.HomePageText>
      </Styled.HomePageTextWrapper>
    </Styled.HomePageWrapper>
  );
};

export default HomePage;
