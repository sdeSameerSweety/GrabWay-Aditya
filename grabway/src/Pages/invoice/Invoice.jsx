import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Button, ChakraProvider } from "@chakra-ui/react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Invoice() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  let price = 0;
  let discount = 0;
  let totalPrice = 0;
  const id = useParams();
  const [uid, setUid] = useState();

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/jewellery/`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setArr(data);
        console.log(data[0].userID);
        setUid(data[0].userID);
        console.log(data);
      } else {
        const err = await res.json();
        throw new Error(err);
      }
    } catch (error) {
      alert(error.msg);
    }
  };

  if (arr.length > 0) {
    arr.forEach((el) => {
      price += parseInt(el.value);
    });
    discount = Math.round(price * 0.1);
    totalPrice = price - discount;
  } else {
    price = 0;
  }
  let c = 1;

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <MDBContainer className="py-5">
        <MDBCard className="p-4">
          <MDBCardBody>
            <MDBContainer className="mb-2 mt-3">
              <MDBRow className="d-flex align-items-baseline">
                <MDBCol xl="9">
                  <p style={{ color: "black", fontSize: "20px" }}>INVOICE</p>
                </MDBCol>
                <MDBCol xl="3" className="float-end">
                  <ChakraProvider></ChakraProvider>
                  <hr />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBContainer>
              <MDBCol md="12" className="text-center">
                <MDBIcon
                  fab
                  icon="mdb"
                  size="4x"
                  className="ms-0 "
                  style={{ color: "#5d9fc5" }}
                />
                <h3 className="pt-0">Golden Sparrow</h3>
              </MDBCol>
            </MDBContainer>
            <MDBRow>
              <MDBCol xl="8">
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    Customer Id: <span style={{ color: "#5d9fc5" }}>{uid}</span>
                  </li>
                </MDBTypography>
              </MDBCol>
              <MDBCol xl="4">
                <p className="text-muted">Invoice</p>
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">ID:</span>
                    {id.id}
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Creation Date: </span>
                    {new Date().toJSON().slice(0, 10)}
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Status:</span>
                    <span className="badge bg-warning text-black fw-bold ms-1">
                      Paid
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-2 mx-1 justify-content-center">
              <MDBTable striped borderless>
                <MDBTableHead
                  className="text-white"
                  style={{ backgroundColor: "#84B0CA" }}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Amount</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {arr.length > 0 &&
                    arr.map((el) => {
                      return (
                        <tr>
                          <th scope="row">{c++}</th>
                          <td>{el.link}</td>
                          <td>1</td>
                          <td>{el.value}</td>
                          <td>{el.value}</td>
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
            <MDBRow>
              <MDBCol xl="8">
                <p className="ms-3">
                  Add additional notes and payment information
                </p>
              </MDBCol>
              <MDBCol xl="3">
                <MDBTypography listUnStyled>
                  <li className="text-muted ms-3">
                    <span class="text-black me-4">SubTotal</span>Rs:{" "}
                    {totalPrice}/-
                  </li>
                </MDBTypography>
                <p className="text-black float-start">
                  <span className="text-black me-3"> Total Amount</span>
                  <span style={{ fontSize: "25px" }}>Rs: {totalPrice}/-</span>
                </p>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol xl="10">
                <p>Thank you for your purchase</p>
              </MDBCol>
              <MDBCol xl="2">
                <ChakraProvider>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => {
                      navigate("/jwellery/Bestseller");
                    }}>
                    Go Back
                  </Button>
                </ChakraProvider>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
}
