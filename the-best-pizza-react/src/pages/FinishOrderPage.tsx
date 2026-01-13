import Input from "../components/input";
import Label from "../components/label.tsx";
import Btn from "../components/btn.tsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { setName as setUserName } from "../features/userSlice.tsx";
import { useState } from "react";

export default function FinishOrderPage() {
  return (
    <>
      <form className="finish-order-page">
        <h1 className="ready-h1">Ready to order? Let's go!</h1>
        <div className="input-div">
          <Label
            text="First Name"
            className="ready-label"
            htmlFor="first-name-input"
          />
          <Input className="first-name-input ready-input" type="text"></Input>
        </div>
        <div className="input-div">
          <Label
            text="Phone number"
            className="ready-label"
            htmlFor="phone-number-input"
          />
          <Input
            className="phone-number-input ready-input"
            type="number"
          ></Input>
        </div>
        <div className="input-div relative-div">
          <Label
            text="Address"
            className="ready-label"
            htmlFor="address-input"
          />
          <Input className="address-input ready-input" type="text"></Input>
          <Btn className="get-btn">GET POSITION</Btn>
        </div>
        <div className="check-input-div">
          <Input className="check-input" type="checkbox" />
          <p className="ready-p">Want to yo give your order priority?</p>
        </div>
        <Btn className="order-now-btn">ORDER NOW FOR €27.00</Btn>
      </form>
    </>
  );
}
