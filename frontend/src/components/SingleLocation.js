import React from "react";
import { Devices, StyledLink } from './reusable-components/GlobalStyles';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import googleIcon from "./googleIcon.png";
import { BASE_URL } from "utils/utils";

export const SingleLocation = ({ }) => {
  const [details, setDetails] = useState([])
  const navigate = useNavigate();
  const [idOfUserWhoClickedButton, setIdOfUserWhoClickedButton] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken);
  const visitorId = useSelector((store) => store.user.id)
  const { id } = useParams()

  //IF USER IS LOGGED OUT 
  useEffect(() => {
    if (!accessToken) {
      navigate(`/unauthorized`);
    }
  }, [accessToken])


  useEffect(() => {
    fetch(`${BASE_URL}/locations/${id}`)
      .then(res => res.json())
      .then((data) => {
        setDetails(data.response)
        setIdOfUserWhoClickedButton(data.response.visitors)
      })
      .catch(error => console.error(error))
  }, []);

  const onBookmarkButtonClickCulture = () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch(`${BASE_URL}/location/${id}/bookmarkCulture/${visitorId}`, options)
      .then(res => res.json())
      .then((data) => {
        setIdOfUserWhoClickedButton(data.response.visitors)
        // TO GET THE USERNAME TO SHOW DIRECTLY 
        window.location.reload()
      })
      .catch(error => console.error(error))


  }

  const onBookmarkButtonClickNature = () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch(`${BASE_URL}/location/${id}/bookmarkNature/${visitorId}`, options)
      .then(res => res.json())
      .then((data) => {
        setIdOfUserWhoClickedButton(data.response.visitors)
           window.location.reload()
      })
      .catch(error => console.error(error))
  }

  const onRemoveCultureBookmarkClick = () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch(`${BASE_URL}/location/${id}/deleteBookmarkCulture/${visitorId}`, options)
      .then(res => res.json())
      .then((data) => {
        setIdOfUserWhoClickedButton(data.response.visitors)
        window.location.reload()
      })
      .catch(error => console.error(error))
  }

  const onRemoveNatureBookmarkClick = () => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch(`${BASE_URL}/location/${id}/deleteBookmarkNature/${visitorId}`, options)
      .then(res => res.json())
      .then((data) => {
        setIdOfUserWhoClickedButton(data.response.visitors)
        window.location.reload()
      })
      .catch(error => console.error(error))
  }

  const filteredLocations = Object.keys(details)

  if (filteredLocations.includes("genre")) {
    return (
      <LocationWrapper>
        <SingleLocationName> {details.name} </SingleLocationName>
        <Description>{details.description}</Description>
        <WebSiteLink><Bold>Läs mer på: </Bold><a href={details.website} target="_blank">{details.website}</a></WebSiteLink>
        <SingleLocationDivs>
          <Link to="/locations"><BackLink>Tillbaka</BackLink></Link>
          <SingleLocationDivLeft>
            <Image src={details.img} style={{ width: 220, height: 220 }} alt="picture" />
            <OpeningHours><Bold>Öppettider:</Bold>
              <li><Bold>Måndag:</Bold> {details.opening_hours_mon}</li>
              <li><Bold>Tisdag:</Bold> {details.opening_hours_tue}</li>
              <li><Bold>Onsdag:</Bold> {details.opening_hours_wed}</li>
              <li><Bold>Torsdag:</Bold> {details.opening_hours_thu}</li>
              <li><Bold>Fredag:</Bold> {details.opening_hours_fri}</li>
              <li><Bold>Lördag:</Bold> {details.opening_hours_sat}</li>
              <li><Bold>Söndag:</Bold> {details.opening_hours_sun}</li>
            </OpeningHours>
          </SingleLocationDivLeft>
          <SingleLocationDivMiddle>

            <GoogleLink href={details.googlemap} target="_blank">
              <Image src={googleIcon} style={{ width: 220, height: 220 }} alt="googlemaps icon" />
            </GoogleLink>
            <LocationDetails><Bold>Närmaste station:</Bold> {details.closestStation}</LocationDetails>
            <LocationDetails><Bold>Inträde:</Bold> {details.entranceFee}:- </LocationDetails>
          </SingleLocationDivMiddle>
          <IWantToGoDiv>
            <p>Jag vill gå! </p>
            <Visitor
              type="button"
              onClick={() =>
                onBookmarkButtonClickCulture()}>
              Klicka här</Visitor>
          </IWantToGoDiv>
          <SingleLocationDivRight>
            <p>Jag vill gå! Kontakta mig ❤️</p>
            {idOfUserWhoClickedButton.map((people) => (
              <Users>
                <StyledLink
                  key={people._id}
                  to={`/profile/${people._id}/visit`}>
                  {people.username}
                </StyledLink>
              </Users>
            ))}
            <Visitor
              type="button"
              onClick={() => onRemoveCultureBookmarkClick()}>
              Ta bort mig
            </Visitor>
          </SingleLocationDivRight>
        </SingleLocationDivs>
      </LocationWrapper >
    )
  } else {
    return (
      <LocationWrapper>
        <SingleLocationName> <a href={details.website} target="_blank">{details.name}</a></SingleLocationName>
        <Description>{details.description}</Description>
        <SingleLocationDivs>
          <Link to="/locations"><BackLink>Tillbaka</BackLink></Link>
          <SingleLocationDivLeft>
            <Image src={details.img} style={{ width: 220, height: 220 }} alt="picture" />
            <LocationDetails><Bold>Höjdpunkter:</Bold> {details.highlights}</LocationDetails>
            <LocationDetails><Bold>Aktiviteter:</Bold> {details.activities}</LocationDetails>
          </SingleLocationDivLeft>
          <SingleLocationDivMiddle>
            <GoogleLink href={details.googlemap} target="_blank">
              <Image src={googleIcon} style={{ width: 220, height: 220 }} alt="googlemaps icon" />
            </GoogleLink>
            <LocationDetails><Bold>Närmaste station:</Bold> {details.closestStation}</LocationDetails>
            <LocationDetails><Bold>Tillgång till café:</Bold> {details.cafe} </LocationDetails>
            <LocationDetails><Bold>Tillgång till grillplats:</Bold> {details.barbecuePossibility} </LocationDetails>
            <LocationDetails><Bold>Tillgång till toalett:</Bold> {details.toilet} </LocationDetails>
          </SingleLocationDivMiddle>
          <IWantToGoDiv>
            <p>Jag vill gå!</p>
            <Visitor
              type="button"
              onClick={() => onBookmarkButtonClickNature()}>Klicka här</Visitor>
          </IWantToGoDiv>
          <SingleLocationDivRight>
            <p>Jag vill gå! Kontakta mig ❤️</p>
            {idOfUserWhoClickedButton.map((people) => (
              <Users>
                <StyledLink
                  key={people._id}
                  to={`/profile/${people._id}/visit`}>
                  {people.username}
                </StyledLink>
              </Users>
            ))}
            <Visitor
              type="button"
              onClick={() => onRemoveNatureBookmarkClick()}>
              Ta bort mig
            </Visitor>
          </SingleLocationDivRight>
        </SingleLocationDivs>
      </LocationWrapper>
    )
  }
}

const WebSiteLink = styled.p`
  margin-top: 10px;
  text-align: center;
  width: 80%;
  word-wrap: break-word;
`

const SingleLocationName = styled.h1`
  font-family: 'Girassol', cursive;
  font-size: 30px;
  padding: 20px;
  margin: 10px;
  text-decoration: none;
  border-radius: 3px;
  background-color: #FCF8E8;
  text-align: center;

  @media ${Devices.tablet} {
  font-size: 35px;
  } 

  @media ${Devices.laptop} {
    font-size: 45px;
  }
`

const LocationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(140deg, #FCF8E8 60%, #ECB390 60%);
  font-family: "montserrat";
`
const SingleLocationDivs = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-bottom: 25px;

@media ${Devices.tablet} {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  } 

  @media ${Devices.laptop} {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 30px;
  }
`

const SingleLocationDivLeft = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  align-items: center;
  border-radius: 10px;
  background-color: #FCF8E8;
  border: 2px solid #e8894f;
  box-shadow: 5px 3px 3px #e8894f;

  @media ${Devices.tablet} {
    width: 350px;
  } 

  @media ${Devices.laptop} {
    grid-row-start: 1;
    grid-row-end: 4;
    width: 350px;
  }
`

const SingleLocationDivMiddle = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #FCF8E8;
  border: 2px solid #e8894f;
  box-shadow: 5px 3px 3px #e8894f;

  @media ${Devices.tablet} {
    width: 350px;
  } 

  @media ${Devices.laptop} {
    grid-row-start: 1;
    grid-row-end: 3;
    width: 350px;
  }
`

const IWantToGoDiv = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  align-items: center;
  border-radius: 10px;
  background-color: #FCF8E8;
  border: 2px solid #e8894f;
  box-shadow: 5px 3px 3px #e8894f;

  @media ${Devices.tablet} {
    width: 350px;
  } 

  @media ${Devices.laptop} {
    grid-row-start: 3;
    grid-row-end: 4;
    width: 350px;
  }
`

const SingleLocationDivRight = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
  align-items: center;
  border-radius: 10px;
  background-color: #FCF8E8;
  border: 2px solid #e8894f;
  box-shadow: 5px 3px 3px #e8894f;
  margin-bottom: 30px;

  @media ${Devices.laptop} {
    width: 350px;
  }

  @media ${Devices.laptop} {
    grid-row-start: 1;
    grid-row-end: 4;
    width: 350px;
  }
`

const Image = styled.img`
  border-radius: 50%;
  margin: 10px;
  border: 2px solid #FCF8E8;

  @media ${Devices.tablet} {
    width: 300px;
  } 

  @media ${Devices.tablet} {
    width: 200px;
    height: 200px;
  } 

`

const Description = styled.p`
  width: 80%;
  padding: 12px;
  text-align: center;

  @media ${Devices.tablet} {
    padding: 15px;
    width: 70%;
  } 
`

const LocationDetails = styled.p`
  font-size: 17px;
  text-align: center;
`

const OpeningHours = styled.ul`
  padding: 10px;
  font-size: 17px;
  border-radius: 5%;
`

const Bold = styled.span`
  font-weight: 600;
  
`
const Users = styled.button`
  padding: 0px, 5px;
  background-color: #CEE5D0;
  border-radius: 5px;
  margin: 2px;
`

const Visitor = styled.button`
  padding: 0px, 5px;
  background-color: #CEE5D0;
  color: black;
  border-radius: 5px;
  width: 100px;
  margin: 2px;
  transition: ease-out 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

const GoogleLink = styled.a`
  &:hover {
  transform: scale(1.1) rotate(0.01deg);
}
`
const BackLink = styled.button`
  padding: 0px, 5px;
  background-color: #CEE5D0;
  border-radius: 5px;
  width: 150px;
  margin: 0px 0px 20px 0px;
  align-self: flex-start;
  transition: ease-out 0.2s;

&:hover {
  transform: scale(1.05);
}
`