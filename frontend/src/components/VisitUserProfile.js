import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from 'utils/utils';

import { ProfileWrapper,
    Card,
    ProfileImg,
    Age, 
    DescriptionProfile2, 
    SoMeWrapperProfile, 
    SoMeIconProfile, 
    ContactButton, 
    SoMeIconLinkProfile } 
from './UserProfile';

export const VisitUserProfile = () => {
    const [userDetails, setUserDetails] = useState("")
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
      if (!accessToken) {
        navigate("/unauthorized");
      }
    }, [accessToken])

    useEffect(() => {
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
         "Authorization": accessToken
        }
      }
  
   fetch(`${BASE_URL}/profile/${id}`, options)
        .then((res) => res.json())
        .then((data) => 
        setUserDetails(data.response));
    }, [id]);


  return (
      <ProfileWrapper>
        <Card accessToken={accessToken} userDetails={userDetails}>
        <ProfileImg src="https://th.bing.com/th/id/OIP.IB0XUg8PV5FGxOf0WWDdOQHaHa?pid=ImgDet&rs=1" alt="John" />
          <h1>{userDetails.name}</h1>
          <h2>{userDetails.username}</h2>
          <Age>{userDetails.age} år</Age>
          <DescriptionProfile2>{userDetails.presentation}

          </DescriptionProfile2>
          <SoMeWrapperProfile>
            <SoMeIconProfile href={`https://instagram.com/${userDetails.instagram}`}>
              <SoMeIconLinkProfile className="fa fa-instagram" />
            </SoMeIconProfile>
            <SoMeIconProfile href={userDetails.facebook}>
              <SoMeIconLinkProfile className="fa fa-facebook" />
            </SoMeIconProfile>
          </SoMeWrapperProfile>
          <p>
            <a href={`mailto:${userDetails.email}`}>
              <ContactButton>Maila mig!</ContactButton>
            </a>
          </p>
        </Card >
      </ProfileWrapper >
  );
};
