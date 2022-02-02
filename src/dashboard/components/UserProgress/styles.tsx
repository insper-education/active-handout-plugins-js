import styled from "styled-components";
import { IDType } from "../../../services/calendar";

const CardContainer = styled.div`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

interface ITopicCardProps {
  competence?: IDType;
}

const TopicCard = styled.a<ITopicCardProps>`
  && {
    background-color: ${({ competence }) =>
      competence?.color?.default || "#f3f3f3"};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0.1px 0.1px 0.3px rgba(0, 0, 0, 0.014),
      0.3px 0.3px 0.7px rgba(0, 0, 0, 0.02),
      0.6px 0.6px 1.3px rgba(0, 0, 0, 0.025),
      1.1px 1.1px 2.2px rgba(0, 0, 0, 0.03),
      2.1px 2.1px 4.2px rgba(0, 0, 0, 0.036), 5px 5px 10px rgba(0, 0, 0, 0.05);
    word-break: inherit;
    color: inherit;
  }

  &&:hover,
  &&:focus {
    color: inherit;
    box-shadow: 0.3px 0.3px 0.3px rgba(0, 0, 0, 0.014),
      0.7px 0.7px 0.7px rgba(0, 0, 0, 0.02),
      1.3px 1.3px 1.3px rgba(0, 0, 0, 0.025),
      2.2px 2.2px 2.2px rgba(0, 0, 0, 0.03),
      4.2px 4.2px 4.2px rgba(0, 0, 0, 0.036), 10px 10px 10px rgba(0, 0, 0, 0.05);
  }
`;

const TopicNameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

const TopicName = styled.span`
  flex-grow: 1;
`;

const TopicDate = styled.span`
  max-width: 5ch;
  font-size: 1.5em;
  line-height: 1;
  padding-bottom: 0.5rem;
  color: #000;
  mix-blend-mode: overlay;
  margin-left: 0.2rem;
`;

const ProgressSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  gap: 0.5rem;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
`;

const ProgressTitle = styled.span`
  display: block;
`;

export {
  CardContainer,
  TopicCard,
  TopicNameContainer,
  TopicName,
  TopicDate,
  ProgressSetContainer,
  ProgressContainer,
  ProgressTitle,
};