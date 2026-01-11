import Input from "../components/input";
import Btn from "../components/btn.tsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { setName as setUserName } from "../features/userSlice.tsx";
import { useState } from "react";

export default function FinishOrderPage() {
  return (
    <>
      <div className="finish-order-page">
        <h1 className="ready-h1">Ready to order? Let's go!</h1>
      </div>
    </>
  );
}
