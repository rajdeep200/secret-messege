import React from "react";

import dynamic from "next/dynamic";

const GenerateIcon = ({ icon, size, color, className }) => {
  const IconGeneralEZLogo = dynamic(() =>
    import("../assets/icons/icons_general_ezlogo.svg")
  );
  const IconGeneralMessage = dynamic(() =>
    import("../assets/icons/message-icon.svg")
  );
  const IconGeneralMessageLogo = dynamic(() =>
    import("../assets/icons/message-logo-2.svg")
  );
  const IconGeneralMessageMobile = dynamic(() =>
    import("../assets/icons/mobile-message.svg")
  );

  if (icon === undefined || icon === null || icon === "") {
    icon = "general-ez-logo";
  }
  if (size === undefined || size === null || size === "") {
    size = "1em";
  }
  // For retrieving custom className for Icon
  if (className === undefined || className === null || className === "") {
    className = "";
  }
  // If no custom className is defined, default color to black
  if (color === undefined || color === null || color === "") {
    color = "";
  }
  const getIcon = (inputIcon) => {
    const prefixedSize = "100%";

    switch (inputIcon) {
      // General (Button) Icons
      // Viewbox Settings: "0 0 24 24"
      case "general-ez-logo":
        return (
          <IconGeneralEZLogo
            width={prefixedSize}
            height={prefixedSize}
            viewBox={"0 0 24 24"}
            className={""}
          />
        );
      case "message-logo":
        return (
          <IconGeneralMessage
            width={prefixedSize}
            height={prefixedSize}
            className={""}
          />
        );
      case "message-logo-2":
        return (
          <IconGeneralMessageLogo
            width={prefixedSize}
            height={prefixedSize}
            className={""}
          />
        );
      case "message-mobile-logo":
        return (
          <IconGeneralMessageMobile
            width={prefixedSize}
            height={prefixedSize}
            className={""}
          />
        );
    }
  };

  return <div style={{ width: size, height: size }}>{getIcon(icon)}</div>;
};

export default GenerateIcon;
