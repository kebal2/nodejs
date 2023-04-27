import express from "express";
import fetch from "node-fetch";
import Config from "./config.js";
import EndpointNames from "./endpoint-names.js";
import URLSearchParamsHelper from "./url-search-params-helper.js";

const app = express();

app.get(EndpointNames.AUTHORIZE, async (req, res) => {
  const params = URLSearchParamsHelper.generateAuthorizeParams();

  const authorizationUrl = `${Config.AUTH_ENDPOINT}?${params.toString()}`;

  res.redirect(authorizationUrl);
});

app.get(EndpointNames.CALLBACK, async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      throw new Error("Code not found in request");
    }

    const params = URLSearchParamsHelper.generateCallbackParams(code);

    const response = await fetch(Config.TOKEN_ENDPOINT, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const token = await response.json();

    res.json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(Config.CLIENT_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${Config.CLIENT_PORT}`
  );
});
