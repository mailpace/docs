---
id: organization-quickstart
title: Organization API Quickstart
sidebar_label: Organization Quickstart
---

## Organization API Quickstart

Use this quickstart to create a domain and a domain API token over HTTPS using your Organization API token.

Base URL: `https://app.mailpace.com/api/v1`

*Only HTTPS is supported*

## Before you start

- Create an Organization API token in the MailPace dashboard (Organization -> API Tokens)
- Export it as an environment variable:

```bash
export MAILPACE_ORG_TOKEN="ORGANIZATION_TOKEN_GOES_HERE"
```

## 1) Create a domain

```bash
curl "https://app.mailpace.com/api/v1/domains" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: $MAILPACE_ORG_TOKEN" \
  -d '{
    "domain": {
      "name": "Production",
      "url": "example.com"
    }
  }'
```

Save the returned `id` for the next steps.

## 2) Verify DNS for the domain

```bash
curl "https://app.mailpace.com/api/v1/domains/DOMAIN_ID/verify" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: $MAILPACE_ORG_TOKEN"
```

This returns verification fields such as `dkim_verified` and `advance_verified` plus errors when records are missing.

## 3) Create a domain API token

```bash
curl "https://app.mailpace.com/api/v1/domains/DOMAIN_ID/api_tokens" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: $MAILPACE_ORG_TOKEN" \
  -d '{
    "api_token": {
      "name": "Production sender key"
    }
  }'
```

Save the returned domain token and use it as `MailPace-Server-Token` for `POST /api/v1/send`.

## 4) Send email with the domain token

```bash
curl "https://app.mailpace.com/api/v1/send" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Server-Token: DOMAIN_API_TOKEN_GOES_HERE" \
  -d '{
    "from": "hello@example.com",
    "to": "you@yourdomain.com",
    "subject": "MailPace quickstart",
    "textbody": "It works"
  }'
```

## Next steps

- Full domains reference: [/reference/domains](/reference/domains)
- Send endpoint reference: [/reference/send](/reference/send)
- Authentication details: [/reference/authentication](/reference/authentication)
