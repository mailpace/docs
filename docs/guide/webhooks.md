---
id: webhooks
title: Webhooks
sidebar_label: Webhooks
---

We can send optional Webhooks (HTTPS POST requests) to an endpoint of your choice when certain events happen in the MailPace API.

To set this up, open the Webhooks section of your Domain. Here you can add or remove endpoints and see recently sent webhooks.

> Note that endpoint URLs must use TLS/SSL, and start with `https://`

Webhooks are sent as JSON POST requests, with a Content-Type of `application/json`, and are signed using an Ed25519 signature available in the `X-MailPace-Signature` header key.

## Events

All webhook event bodies have two properties:

- `event` a string with the event name, e.g. email.delivered
- `payload` a JSON object containing the event details (see below for details)

### Email Events

| Event | Description |
| :------------- | :---------- | 
| email.queued | Occurs when an email is added to the queue for sending |
| email.delivered | Occurs when an email is accepted by the recipient's SMTP server |
| email.deferred | Occurs when an email soft-bounces and is marked for redelivery |
| email.bounced | Occurs when an email hard bounces, delivery will not be attempted again |
| email.spam | Occurs when our internal filter identifies an email as spam, delivery will not be attempted |

#### Payload Properties

| Key | Type | Details | Nullable* |
| :------------- | :---------- | :---------- | :---------- | 
`status` | String | Email status, one of either queued, delivered, deferred, bounced or spam| No |
`id` | Integer | Reference ID of email | No |
`domain_id` | Integer | Reference ID of sending Domain | No |
`created_at` | DateTime | Timestamp of when the email was first received by our API| No |
`updated_at` | DateTime | Timestamp of when the email was last updated, typically a status change | No |
`from` | String | From email address | No |
`to` | String | To email address, may be a comma separated list if multiple recipients provided | Yes |
`htmlbody` | String | HTML body in email | Yes |
`textbody` | String | Text body in email| Yes |
`cc` | String | Carbon Copy email address, may be a comma separated list if multiple recipients provided | Yes |
`bcc` | String | Blind Carbon Copy email address, may be a comma separated list if multiple recipients provided| Yes |
`subject` | String | Email subject | Yes |
`replyto` | String | Reply to address | Yes |
`message_id` | String | Message ID set by MailPace, in the format `<message-id>@<mailer.mailpace.com>` | No |
`list_unsubscribe` | String | List-Unsubscribe header | Yes |
`tags` | Array[String] | The email tags as an array of strings | Yes |

*Properties that are marked as nullable are optional and will appear as `null` in the body if undefined*


#### Example Body

```json
{
    "event": "email.queued",
    "payload": {
        "status": "queued",
        "id": 1,
        "domain_id": 1,
        "created_at": 2021-11-16T14:50:15.445Z,
        "updated_at": 2021-11-16T14:50:15.445Z,
        "from": "string",
        "to": "string",
        "htmlbody": "string",
        "textbody": "string",
        "cc": "string",
        "bcc": "string",
        "subject": "string",
        "replyto": "string",
        "message_id": "string",
        "list_unsubscribe": "string",
        "tags": ["string", "string"]
    }
}
```

## Verification

For added security we sign all webhook requests with an [Ed25519](https://datatracker.ietf.org/doc/html/rfc8032) keypair and place the signature of the webhook body into the request headers, under the header name `X-MailPace-Signature`.

You can validate this signature using the public key available in the `Webhooks -> Public Key Verification` section of your Domain at https://app.mailpace.com. Note that each domain has a different keypair.

This is useful to ensure that all received webhooks have come from the MailPace servers and have not been tampered with. Only we have the private key to sign requests, so if the request body verifies successfully you know we have sent it.

:::caution 
Both the key and signature are a byte string that has been Base64 encoded, using strict_encode. You will need to decode both key and signature to the byte string before verifying (as shown in the examples below). We do this to make sending the signature and key over HTTPS easier and less error-prone.
:::

### Examples

#### Ruby

```ruby
require "ed25519"

# Assuming you have the headers available in a headers array
signature_base64 = headers["X-MailPace-Signature"]
signature = Base64.strict_decode64(signature_base_64)

verify_key_base64 = "Your Public Key from app.mailpace.com here"
verify_key = Ed25519::VerifyKey.new(Base64.strict_decode64(verify_key_base64))

# Assuming the full body of the request is available under a request object
message = request.raw_post

verify_key.verify(signature, message) # True if verification passed!
```
