import React, { useState } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e0e0e0;
`;

const UploadIconWrapper = styled.div`
  position: absolute;
  bottom: ${props => (props.hasImage ? "10%" : "50%")};
  right: ${props => (props.hasImage ? "35%" : "50%")};
  transform: ${props => (props.hasImage ? "translate(0, 0)" : "translate(50%, 50%)")};
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 10%;
  padding: ${props => (props.hasImage ? "1px" : "10px")};
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
  text-align: center;
`;

const AvatarUploader = ({ setAvatarUrl }) => {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.size > 4 * 1024 * 1024) { 
        setError("Please choose an image smaller than 4 MB.");
        return;
      }
      setError(""); 

      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AvatarWrapper>
      <Avatar src={avatar || "images/noAvatar.avif"} alt="Avatar" />
      <UploadIconWrapper hasImage={!!avatar}>
        <label htmlFor="avatar-upload">
          <MdFileUpload size={24} />
        </label>
        <input
          type="file"
          id="avatar-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </UploadIconWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AvatarWrapper>
  );
};

export default AvatarUploader;
