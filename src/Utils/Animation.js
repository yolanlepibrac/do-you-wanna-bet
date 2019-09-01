

import { fadeInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const FadeInRight = styled.div`
  animation: 0.6s ${fadeInRightAnimation};
`;

var Animation = {};
Animation.FadeInRight = FadeInRight

export default Animation
