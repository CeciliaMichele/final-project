import React from "react";
import user from "reducers/user";
import styled from "styled-components/macro";
import { Devices } from './reusable-components/GlobalStyles';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';


export const Welcome = () => {
  const dispatch = useDispatch();

  
  return (
    <WelcomeWrapper>
      <SmallHeaderText>Välkommen till</SmallHeaderText>
      <WelcomeHeader>
        KULTURLIGTVIS!
      </WelcomeHeader>
      <WelcomeText>
        <Bigtext>
          Detta är sidan för dig som vill utforska nya delar av Stockholms natur- och kulturliv tillsammans med en ny vän. Vår idé är att
          hjälpa människor med liknande intressen att hitta varandra, och ta del av nya upplevelser tillsammans.</Bigtext>
        <Bigtext>Kanske kan vår sida bidra till minskad ensamhet, nya intressen och vänner för livet? Det är åtminstone det som är tanken.
        </Bigtext>
        <Smalltext>
          Så letar du efter du ett spännande museum du inte ens visste fanns? En stig du aldrig vandrat? En ny kultur- eller naturupplevelse? Börja med
          att <Link to="/register">Skapa ett konto</Link>. Spana sedan in <Link to="/locations">Besöksmålen</Link> och bokmärk platsen om du är intresserad
          av att gå dit. Vill du slå följe? Kolla vilka andra som har bokmärkt, och kontakta den!
        </Smalltext>
      </WelcomeText>
    </WelcomeWrapper>
  )
}

export const WelcomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(140deg, #FCF8E8 60%, #ECB390 60%);

  @media ${Devices.tablet} {
    height: 100vh;
  }
`

const WelcomeHeader = styled.h1`
  font-size: 50px;
  font-family: 'Caveat', cursive;
  
  @media ${Devices.tablet} {
  margin-bottom: 5px;
  font-size: 65px;
  }
`
const SmallHeaderText = styled.p`
  font-family: "Montserrat";
  margin-top: 40px;
  font-size: 25px;
`

const Bigtext = styled.p`
  font-family: "Montserrat";
  line-height: normal;
  margin: 20px;
  font-size: 19px;

  @media ${Devices.tablet} {
    font-size: 20px;
  }
  @media ${Devices.laptop} {
    font-size: 22px;
  }
`
const Smalltext = styled.p`
  font-family: "Montserrat";
  padding: 20px;
  line-height: normal;
  margin: 20px;
  font-size: 17px;

  @media ${Devices.tablet} {
    font-size: 19px;
  }
  @media ${Devices.laptop} {
    font-size: 20px;
  }
`

const WelcomeText = styled.div`
  margin: 30px;
  width: 85%;
  text-align: center;
  border-radius: 10px;
  background-color: #FCF8E8;
  border: 2px solid #e8894f;
  box-shadow: 5px 3px 3px #e8894f;

  @media ${Devices.tablet} {
  width: 80%;
  margin: 20px;
  }

  @media ${Devices.laptop} {
  width: 50%;
  margin-top: 30px;
  }
`


