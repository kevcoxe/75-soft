import React, { useEffect } from "react";

// User has switched back to the tab
const handleOnFocus = () => {
};

// User has switched away from the tab (AKA tab is hidden)
const handleOnBlur = () => {
};

interface WindowFocusHandlerInterface {
  onBlur?: ()=>void,
  onFocus?: ()=>void,
}

const WindowFocusHandler = ({
  onBlur = handleOnBlur,
  onFocus = handleOnFocus
}: WindowFocusHandlerInterface) => {
    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        // Calls onFocus when the window first loads
        onFocus();
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
  }, []);

    return <></>;
};

export default WindowFocusHandler;