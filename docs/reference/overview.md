---
id: overview
title: Overview
sidebar_label: Overview
---

## Overview

Our API is a simple HTTPS API, hosted at `https://app.mailpace.com/api/`

Send a request using any HTTP library you like, including the right headers and your email details as the body, and we'll let you know if the email was added to the queue successfully or not, through standard HTTP status codes.

## Endpoints

We like to keep it simple, and only have one endpoint:

[https://app.mailpace.com/api/v1/send](/reference/send)

## Versioning

The URL contains the version number after the `api/` string. When backwards-incompatible changes are made to the API, a new version is released and the old version will continue to operate until a published end of life date.

The current version is `v1`.