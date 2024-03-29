"use client";

import React, { useEffect, useState } from "react";

const GetModel = () => {
  const [models, setModels] = useState<Record<string, Record<string, string>>>(
    {}
  );

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const response: Record<string, Record<string, string>> = await fetch(
      "/api/locales/model"
    ).then((a) => a.json());

    setModels(response);
  };

  return (
    <div>
      {Object.entries(models).map(([key, model], i) => {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <React.Fragment key={i}>
            <p
              style={{ fontSize: "12px" }}
            >{`export const enum ${capitalizedKey} {`}</p>
            {Object.entries(model).map(([key, value], index) => {
              return (
                <p
                  key={index}
                  style={{ marginLeft: "16px", fontSize: "12px" }}
                >{`${key.toUpperCase()} = "${value}",`}</p>
              );
            })}
            {`}`}
            <br />
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default GetModel;
