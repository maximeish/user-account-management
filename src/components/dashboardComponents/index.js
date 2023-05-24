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
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

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
  const { userData } = useContext(UserContext);
  console.log(userData);
  const [fn, setFn] = React.useState("");
  const [ln, setLn] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [docType, setDocType] = React.useState("");
  const [docNumber, setDocNumber] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [photo, setPhotoUrl] = React.useState(
    "https://logosandtypes.com/wp-content/uploads/2020/08/zipcar.svg"
  );
  const [user, setUser] = React.useState({});

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    await axios
      .get(`http://localhost:3000/v1/users/${userData.user.id}`, {
        headers: {
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then((r) => {
        setUser(r.data);
        setFn(r.data.fn);
        setLn(r.data.ln);

        console.log("receiv", r.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const updatedFields = {};
    const names = [
      "fn",
      "ln",
      "maritalStatus",
      "dob",
      "nationality",
      "docType",
      "docNumber",
      "gender",
    ];
    [
      fn,
      ln,
      maritalStatus,
      dob,
      nationality,
      docType,
      docNumber,
      gender,
    ].forEach((f, i) => {
      if (f !== "") {
        updatedFields[names[i]] = f;
      }
    });

    await axios
      .patch(
        `http://localhost:3000/v1/users/${userData.user.id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        }
      )
      .then()
      .catch();

    console.log({ ...updatedFields, id: userData.user.id, photo });
    setLoading(false);
  };

  return (
    <Wrapper>
      <Header>Account Management</Header>
      <MDBContainer className="w-80 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center p-4"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={photo}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "100px" }}
                    fluid
                  />
                  <MDBTypography tag="h5">
                    {fn} {ln}
                    <br />
                    (Unverified)
                  </MDBTypography>
                  <MDBCardText>
                    <StyledInput
                      type="file"
                      onChange={(e) => {
                        console.log("photo updated", e.target.files[0]);
                        setPhotoUrl(e.target.files[0]);
                      }}
                      required
                    />
                  </MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Z Platform</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">First Name</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setFn(e.target.value)}
                          value={fn}
                          required
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last Name:</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setLn(e.target.value)}
                            value={ln}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                          required
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Date of Birth:</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Marital Status</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          value={maritalStatus}
                          required
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Nationality:</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setNationality(e.target.value)}
                            value={nationality}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Document Type</MDBTypography>
                        <select
                          type="text"
                          onChange={(e) => setDocType(e.target.value)}
                          required
                        >
                          <option value="id">ID</option>
                          <option value="passport">Passport</option>
                        </select>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Document Number:</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setDocNumber(e.target.value)}
                            value={docNumber}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <Div></Div>
                      <MDBCol size="6" className="mb-3">
                        <PuffLoader color="#36d7b7" loading={loading} />
                      </MDBCol>
                      <MDBCol size="6" className="justify-content-right mb-3">
                        <StyledButton onClick={handleSubmit}>
                          Update
                        </StyledButton>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Wrapper>
  );
}
