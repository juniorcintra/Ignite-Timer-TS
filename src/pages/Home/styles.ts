import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  border: 0;

  padding: 1rem;

  font-weight: bold;

  cursor: pointer;

  color: ${(props) => props.theme["gray-100"]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseButton)`
  background: ${(props) => props.theme["green-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseButton)`
  background: ${(props) => props.theme["red-500"]};

  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-700"]};
  }
`;
