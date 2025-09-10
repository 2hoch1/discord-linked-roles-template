import type { JSX } from "react";
import viteLogo from "/vite.svg";

const ErrorTypes = {
  UNKNOWN_ERROR: 0,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  EXPECTATION_FAILED: 417,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};

const getErrorType = (raw: object): number | null => {
  if ("status" in raw) {
    const type = raw["status"];
    if (typeof type === "number") {
      return type;
    }
  }
  return null;
};

const errorTemplateMessage = (message: string): JSX.Element => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
      </div>
      <div style={{ whiteSpace: "pre-line" }}>
        <p>{message}</p>
      </div>
    </>
  );
};

function getErrorMessage(type: number): JSX.Element {
  switch (type) {
    case ErrorTypes.UNKNOWN_ERROR: {
      return errorTemplateMessage(
        `Something went wrong.\n Please try again later.`
      );
    }

    case ErrorTypes.BAD_REQUEST: {
      return errorTemplateMessage(
        `We couldn't process your request.\n Please check your input and try again.`
      );
    }
    case ErrorTypes.UNAUTHORIZED: {
      return errorTemplateMessage(
        `You are not signed in.\n Please log in and try again.`
      );
    }
    case ErrorTypes.FORBIDDEN: {
      return errorTemplateMessage(
        `You don’t have permission to do that.\n Please contact support if you believe this is a mistake.`
      );
    }
    case ErrorTypes.NOT_FOUND: {
      return errorTemplateMessage(
        `We couldn’t find what you were looking for.\n Please check the link or try again.`
      );
    }
    case ErrorTypes.EXPECTATION_FAILED: {
      return errorTemplateMessage(
        `Something went wrong with your request.\n Please try again.`
      );
    }
    case ErrorTypes.TOO_MANY_REQUESTS: {
      return errorTemplateMessage(
        `Too many attempts.\n Please wait a moment and try again.`
      );
    }

    case ErrorTypes.INTERNAL_SERVER_ERROR: {
      return errorTemplateMessage(
        `Something went wrong on our side.\n Please try again later.`
      );
    }
    case ErrorTypes.BAD_GATEWAY:
    case ErrorTypes.SERVICE_UNAVAILABLE:
    case ErrorTypes.GATEWAY_TIMEOUT: {
      return errorTemplateMessage(
        `The service is temporarily unavailable.\n Please try again later.`
      );
    }
    case ErrorTypes.NETWORK_AUTHENTICATION_REQUIRED: {
      return errorTemplateMessage(
        `You need to sign in to continue.\n Please log in and try again.`
      );
    }

    default: {
      return errorTemplateMessage(
        `An unexpected error occurred.\n Please try again later.`
      );
    }
  }
}

function Errors(raw: object) {
  const type = getErrorType(raw) ?? ErrorTypes.UNKNOWN_ERROR;
  const message = getErrorMessage(type);
  return message;
}

export default Errors;
