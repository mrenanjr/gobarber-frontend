import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400px;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      content: '';
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.div`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .rdp {
    border-radius: 10px;
  }

  .rdp-root {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .rdp,
  .rdp-month,
  .rdp-month_grid {
    width: 100%;
  }

  .rdp-nav {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 12px;

    button > svg {
      fill: #999591 !important;
    }
  }

  .rdp-month {
    border-collapse: separate;
    border-spacing: 8px;
    padding: 0 16px 16px 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
    text-align: center;
  }

  .rdp-month_caption {
    position: relative;
    top: -34px;
    padding: 0 1em;
    color: #f4ede8;
    font-weight: bold;
    width: 320px;
    margin: auto;
  }

  .rdp-day {
    width: 40px;
    height: 40px;
    border-radius: 10px;

    &.rdp-today {
      font-weight: normal;
    }

    &.rdp-disabled {
      color: #666360 !important;
      background: transparent !important;

      .rdp-day_button {
        cursor: not-allowed;
      }
    }

    &.rdp-selected {
      background: #ff9000 !important;
      color: #f4ede8 !important;
    }
  }

  .rdp-day_available:not(.rdp-day_outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .rdp-day:not(.rdp_disabled):not(.rdp_selected):not(.rdp_outside):hover {
    background: rgba(62, 59, 71, 0.8); /* Usando um tom mais escuro no hover */
  }
`;
