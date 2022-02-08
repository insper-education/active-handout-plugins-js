import styled from "styled-components";
import theme from "../../commons/theme";
import { IDType } from "../../services/calendar";

function dtypeAwareColor(dtype?: IDType) {
  return `
  color: ${dtype?.color?.default || "#000"};
  filter: brightness(0.8);
  mix-blend-mode: multiply;
  `;
}

export const TabContainer = styled.div`
  margin: ${theme.margin.rem(12)} 0 ${theme.margin.rem(8)};
`;

interface ITabTitleProps {
  dtype: IDType;
  selected: boolean;
}

export const TabTitle = styled.button<ITabTitleProps>`
  cursor: pointer;

  ${theme.text.xl};
  padding: ${theme.padding.rem(2)} ${theme.padding.rem(4)};
  background-color: ${({ selected, dtype }) =>
    selected ? dtype.color.default : "transparent"};
  color: ${({ selected, dtype }) =>
    selected ? dtype.textColor : theme.colors.gray[400]};
  border-radius: ${theme.borderRadius.full};
`;

export const TabTitlePoints = styled.span<ITabTitleProps>`
  margin-left: ${theme.margin.rem(1)};
  ${({ dtype, selected }) =>
    selected ? dtypeAwareColor(dtype) : `color: ${theme.colors.gray[300]};}`};
`;

export const CardContainer = styled.div`
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
  dtype?: IDType;
}

export const TopicCard = styled.a<ITopicCardProps>`
  && {
    background-color: ${({ dtype }) => dtype?.color?.default || "#f3f3f3"};
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

export const TopicNameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

export const TopicName = styled.span`
  flex-grow: 1;
`;

export const TopicDate = styled.span<ITopicCardProps>`
  max-width: 5ch;
  font-size: 1.5em;
  line-height: 1;
  padding-bottom: 0.5rem;
  ${({ dtype }) => dtypeAwareColor(dtype)}
  margin-left: 0.2rem;
`;

export const ProgressSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  gap: 0.5rem;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem;
`;

export const ProgressContainer = styled.div`
  width: 100%;
`;

export const ProgressTitle = styled.span`
  display: block;
`;
