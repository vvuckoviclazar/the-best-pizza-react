import Input from "../components/input";
import Btn from "../components/btn.tsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { setName as setUserName } from "../features/userSlice.tsx";
import { useState } from "react";

export default function StartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const storedName = useSelector((state: RootState) => state.user.name);
  const [name, setName] = useState("");

  function handleStartOrder() {
    dispatch(setUserName(name));
  }

  const hasName = storedName.length > 0;

  return (
    <>
      <h1 className="the-best-h1">The best pizza.</h1>
      <h1 className="straight-h1">Straight out of oven, straight to you.</h1>

      {!hasName && (
        <>
          <p className="welcome-p">
            👋 Welcome! Please start by telling us your name:
          </p>

          <form className="start-order-form">
            <Input
              className="start-order-input"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {name.length > 0 && (
              <Link to="/orders">
                <Btn
                  className="start-ordering-btn"
                  type="button"
                  onClick={handleStartOrder}
                >
                  START ORDERING
                </Btn>
              </Link>
            )}
          </form>
        </>
      )}

      {hasName && (
        <Link to="/orders">
          <div className="hasName-div">
            <Btn className="start-ordering-btn" type="button">
              CONTINUE ORDERING, <p className="stored-p">{storedName}</p>
            </Btn>
          </div>
        </Link>
      )}
    </>
  );
}
