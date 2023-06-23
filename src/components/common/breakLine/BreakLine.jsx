import React from "react";

export default function BreakLine({ content }) {
  return (
    <>
      {content.split("\n").map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}
