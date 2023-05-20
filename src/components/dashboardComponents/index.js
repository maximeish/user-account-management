import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  StyledTitle,
  Div,
  FormWrapper,
  FormTextWrapper,
} from "../formComponents";
import UserContext from "../../context/UserContext";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 2em;
`;

const Text = styled.div`
  margin-bottom: 1em;
`;

const Header = styled.header`
  font-weight: bold;
  font-size: large;
  opacity: 0.7;
  letter-spacing: 0.5px;
  margin-bottom: 1em;
`;

const List = styled.ul``;

const Li = styled.li`
  margin: 0.5em 0;
  cursor: pointer;
  font-size: large;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: darkblue;
  opacity: 0.8;
`;

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [fn, setFn] = React.useState("");
  const [ln, setLn] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [docType, setDocType] = React.useState("");
  const [docNumber, setDocNumber] = React.useState("");
  const [gender, setGender] = React.useState("");

  const [loading, setLoading] = useState(false);

  return (
    <Wrapper>
      <Header>Account Management</Header>
      <FormWrapper>
        <StyledForm>
          <StyledTitle>Z Platform</StyledTitle>
          <StyledLabel>Profile Picture:</StyledLabel>
          <StyledInput type="file" onChange={() => {}} required />
          <StyledLabel>First Name:</StyledLabel>
          <StyledInput
            type="text"
            onChange={(e) => setFn(e.target.value)}
            value={fn}
            required
          />

          <StyledLabel>Last Name:</StyledLabel>
          <StyledInput
            type="text"
            onChange={(e) => setLn(e.target.value)}
            value={ln}
            required
          />

          <StyledLabel>Gender:</StyledLabel>
          <StyledInput
            type="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            required
          />
          <StyledLabel>Date of Birth:</StyledLabel>
          <StyledInput
            type="date"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
            required
          />

          <StyledLabel>Marital Status:</StyledLabel>
          <StyledInput
            type="password"
            onChange={(e) => setMaritalStatus(e.target.value)}
            value={maritalStatus}
            required
          />

          <StyledLabel>Nationality:</StyledLabel>
          <StyledInput
            type="text"
            onChange={(e) => setNationality(e.target.value)}
            value={nationality}
            required
          />

          <StyledLabel>Document Type:</StyledLabel>
          <select
            type="text"
            onChange={(e) => setDocType(e.target.value)}
            required
          >
            <option value="id">ID</option>
            <option value="passport">Passport</option>
          </select>

          <StyledLabel>Document Number:</StyledLabel>
          <StyledInput
            type="text"
            onChange={(e) => setDocNumber(e.target.value)}
            value={docNumber}
            required
          />

          <Div>
            <StyledButton type="submit">Update</StyledButton>
            <PuffLoader color="#36d7b7" loading={loading} />
          </Div>
        </StyledForm>
      </FormWrapper>
    </Wrapper>
  );
}
