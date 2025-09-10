import type { JSX } from "react";
import dlrtLogo from "../assets/dlrt.svg";

const SuccsesTypes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
};

const getSuccsesType = (raw: object): number | null => {
  if ("status" in raw) {
    const type = raw["status"];
    if (typeof type === "number") {
      return type;
    }
  }
  return null;
};

const successTemplateMessage = (message: string): JSX.Element => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={dlrtLogo} className="logo vite" alt="DLRT logo" />
        </a>
      </div>
      <p className="status">{JSON.stringify(message, null, 2)}</p>
    </>
  );
};

function getSuccessMessage(type: number): JSX.Element {
  switch (type) {
    case SuccsesTypes.OK: {
      return successTemplateMessage(`Your request was successful.`);
    }

    default: {
      return successTemplateMessage(
        `Your request was successful.`
      );
    }
  }
}

function Success(raw: object) {
  const type = getSuccsesType(raw) ?? SuccsesTypes.OK;
  const message = getSuccessMessage(type);
    console.log(message)
  return message;
}

export default Success;