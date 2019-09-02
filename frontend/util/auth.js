import React, { Component } from "react";
import nookies from "nookies";
import nextCookie from "next-cookies";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export const auth = async ctx => {
  if (ctx.req) {
    let {
      access_token_cookie,
      refresh_token_cookie,
      csrf_access_token,
      csrf_refresh_token
    } = await nookies.get(ctx);

    if (!access_token_cookie) {
      return null;
    }
    let user = await axios
      .get("/user", {
        withCredentials: true,
        headers: {
          cookie: ctx.req.headers.cookie || ""
        }
      })
      .then(res => res.data)
      .catch(err => err.response.data);

    if (user.msg) {
      if (user.msg === "Token has expired") {
        user = await axios
          .post(
            "/user",
            {},
            {
              withCredentials: true,
              headers: {
                "X-CSRF-TOKEN": csrf_refresh_token,
                cookie: ctx.req.headers.cookie || ""
              }
            }
          )
          .then(res => res)
          .catch(err => {
            NotificationManager.error(`An error occurred: ${err.message}`);
            return null;
          });
      }
      let new_cookies = user.headers["set-cookie"];
      user = user.data;
      access_token_cookie = await new_cookies[0].substring(
        new_cookies[0].indexOf("=") + 1,
        new_cookies[0].indexOf(";")
      );

      csrf_access_token = await new_cookies[1].substring(
        new_cookies[1].indexOf("=") + 1,
        new_cookies[1].indexOf(";")
      );

      await nookies.set(ctx, "access_token_cookie", access_token_cookie, {
        httpOnly: true,
        path: "/"
      });
      await nookies.set(ctx, "csrf_access_token", csrf_access_token, {
        path: "/"
      });
    }

    return user;
  } else {
    let { csrf_access_token, csrf_refresh_token } = nextCookie(document.cookie);

    if (!csrf_access_token) {
      return null;
    }

    let user = await axios
      .get("/user", {
        withCredentials: true
      })
      .then(res => res.data)
      .catch(err => err.response.data);

    if (user.msg) {
      if (user.msg === "Token has expired") {
        user = await axios
          .post(
            "/user",
            {},
            {
              withCredentials: true,
              xsrfCookieName: "csrf_refresh_token"
            }
          )
          .then(res => res)
          .catch(err => err.response.data);
      }
    }

    console.log("SWAGBOY", user);
    return user;
  }
};
