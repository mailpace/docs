---
id: domains
title: Domains API
sidebar_label: Domains
---

## Domains API

The Domains API lets you list, create, update, and verify domains over HTTPS.

Base URL: `https://app.mailpace.com/api/v1/domains`

*Only HTTPS is supported*

## Authentication

Domains API requests use an **Organization API token** (not a Domain API token).

Include this header on every request:

`MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE`

Required headers:

| Header Name | Contents | |
| :------------- | :---------- | :----------- |
| Accept | `application/json` | **Required** |
| Content-Type | `application/json` | **Required** |
| MailPace-Organization-Token | Organization API token | **Required** |

You can create and revoke Organization API tokens from your Organization's **API Tokens** page in the MailPace dashboard.

## Domain object

A domain response contains:

- `id`
- `name`
- `url`
- `dkim_selector`
- `dkim_string`
- `dkim_verified`
- `advanced_verified`
- `webhook_public_key`
- `created_at`
- `modified_at`

## Endpoints

### List domains

`GET /api/v1/domains`

Returns an array of domains for the authenticated organization.

```bash
curl "https://app.mailpace.com/api/v1/domains" \
  -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

### Get one domain

`GET /api/v1/domains/:id`

Returns a single domain by ID.

```bash
curl "https://app.mailpace.com/api/v1/domains/123" \
  -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

### Create a domain

`POST /api/v1/domains`

Request body:

| Name | Type | Notes | |
| :------------- | :---------- | :----------- | :----------- |
| `domain.url` | string | Lower-case domain with TLD, for example `example.com` | **Required** |
| `domain.name` | string | Friendly name for your reference | *Optional* |

Example:

```bash
curl "https://app.mailpace.com/api/v1/domains" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE" \
  -d '{
    "domain": {
      "name": "Production",
      "url": "example.com"
    }
  }'
```

On success, returns `201 Created` with the created domain object.

### Update a domain

`PATCH /api/v1/domains/:id`

Allows updating:

- `domain.name`
- `domain.url`

Example:

```bash
curl "https://app.mailpace.com/api/v1/domains/123" \
  -X PATCH \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE" \
  -d '{
    "domain": {
      "name": "Production EU"
    }
  }'
```

On success, returns `200 OK` with the updated domain object.

### Verify a domain

`POST /api/v1/domains/:id/verify`

Checks DKIM and advanced verification DNS records.

Example:

```bash
curl "https://app.mailpace.com/api/v1/domains/123/verify" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

Example response:

```json
{
  "dkim_verified": false,
  "advance_verified": false,
  "errors": {
    "dkim": "No matching DKIM key found",
    "advance_verified": "No CNAME keys found"
  }
}
```

### List domain API tokens

`GET /api/v1/domains/:domain_id/api_tokens`

Returns all domain API tokens for the domain.

```bash
curl "https://app.mailpace.com/api/v1/domains/123/api_tokens" \
  -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

### Get one domain API token

`GET /api/v1/domains/:domain_id/api_tokens/:id`

Returns one domain API token by ID.

```bash
curl "https://app.mailpace.com/api/v1/domains/123/api_tokens/456" \
  -X GET \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

### Create a domain API token

`POST /api/v1/domains/:domain_id/api_tokens`

Creates a new domain API token.

Request body:

| Name | Type | Notes | |
| :------------- | :---------- | :----------- | :----------- |
| `api_token.name` | string | Friendly token label | *Optional* |

```bash
curl "https://app.mailpace.com/api/v1/domains/123/api_tokens" \
  -X POST \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE" \
  -d '{
    "api_token": {
      "name": "Production sender key"
    }
  }'
```

On success, returns `201 Created` with the created API token.

### Update a domain API token

`PATCH /api/v1/domains/:domain_id/api_tokens/:id`

Updates token attributes.

```bash
curl "https://app.mailpace.com/api/v1/domains/123/api_tokens/456" \
  -X PATCH \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE" \
  -d '{
    "api_token": {
      "name": "Primary sender key"
    }
  }'
```

On success, returns `200 OK` with the updated API token.

### Revoke a domain API token

`DELETE /api/v1/domains/:domain_id/api_tokens/:id`

Revokes the token.

```bash
curl "https://app.mailpace.com/api/v1/domains/123/api_tokens/456" \
  -X DELETE \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "MailPace-Organization-Token: ORGANIZATION_TOKEN_GOES_HERE"
```

On success, returns `200 OK` with a revoke confirmation message.

## Errors and status codes

- `200 OK`: Request succeeded
- `201 Created`: Domain created successfully
- `401 Unauthorized`: Missing, invalid, or revoked organization token
- `404 Not Found`: Domain was not found for this organization
- `422 Unprocessable Entity`: Validation failed (for example invalid domain format)
