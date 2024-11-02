// ImageUploader.js
import React, { useState } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  bottom: ${props => (props.hasImage ? "5px" : "50%")};
  right: ${props => (props.hasImage ? "5px" : "50%")};
  transform: ${props => (props.hasImage ? "translate(0, 0)" : "translate(50%, 50%)")};
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const AvatarUploader = ({ setAvatarUrl }) => {
  const [avatar, setAvatar] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        setAvatarUrl(reader.result); // Pass URL to parent component
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
    </AvatarWrapper>
  );
};

export default AvatarUploader;
