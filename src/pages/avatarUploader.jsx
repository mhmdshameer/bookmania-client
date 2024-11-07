import React, { useState } from "react";
import styled from "styled-components";
import { MdFileUpload, MdCancel } from "react-icons/md";

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e0e0e0;
`;

const UploadIconWrapper = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: ${(props) => (props.hasImage ? "none" : "flex")};
  align-items: center;
  justify-content: center;
`;

const CancelIconWrapper = styled.div`
  position: absolute;
  right: 140px;
  color: red;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;
  display: ${(props) => (props.hasImage ? "block" : "none")};
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
      if (file.size > 4 * 1024 * 1024) { // 4MB file size limit
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

  const handleCancelImage = () => {
    setAvatar(null);
    setAvatarUrl(null);
  };

  return (
    <AvatarWrapper>
      <Avatar src={avatar || "images/noAvatar.avif"} alt="Avatar" />
      <UploadIconWrapper htmlFor="avatar-upload" hasImage={!!avatar}>
        <MdFileUpload size={24} />
        <input
          type="file"
          id="avatar-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </UploadIconWrapper>
      <CancelIconWrapper hasImage={!!avatar} onClick={handleCancelImage}>
        <MdCancel size={20} />
      </CancelIconWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AvatarWrapper>
  );
};

export default AvatarUploader;
