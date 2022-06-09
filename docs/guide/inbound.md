---
id: inbound
title: Receiving Inbound Emails
sidebar_label: Inbound Emails
---

## Overview

Our inbound email works by catching all emails addressed to a subdomain of your domain. For example if your domain is `test.com`, and you choose the subdomain `inbound` any emails sent to `*@inbound.test.com` will be handled. We POST all emails onto a webhook address of your choice, defined on the `inbound_emails` page in our application.

We will attempt to send to your endpoint five times with an increasing gap in between each send, after which we will declare the email as failed and will not try again.

:::caution
Your domain must have passed DKIM verification and your organization must have an active plan to accept inbound emails
:::

## Setup

To setup Inbound Emails you need to add a `CNAME` DNS record that points from your chosen inbound subdomain on your domain to `inbound.mailpace.com`. This will ensure that any emails sent to `<inbound-subdomain>.<your-domain>` are sent to our servers. The specific instructions and example records are available on the **Inbound Emails** page of your Domain.

After you have setup your DNS records, you just need to add an Endpoint URL, which can be any `https` address. For testing, you can use a tunnel to your local machine like [ngrok](https://ngrok.com/) or a service like https://httpstat.us/.

## Statuses

There are four statuses that an inbound email can be in after it has been received by our servers:

- Queued: Email received and has been added to the queue for sending to the endpoint
- Success: The POST request to the endpoint succeeded, with an HTTP status code between 200 and 300
- Retrying - The POST request to the endpoint failed. We attempt to send 5 times, at vary intervals, after which the email will move to the `Failed` state
- Failed - The POST request has permanently failed, either through exhausting the number of retries or another permanent failure (e.g. HTTP connection errors or timeouts that are unlikely to succeed in the near future)

## Email Payload Reference

Emails are sent as HTTP POST requests with a JSON body containing the following parameters:

| Name | Optionality | Type | Examples |
| :------------- | :---------- | :----------- | :----------- |
| from | Required | string | `Person A <person_a@test.com>` |
| headers | Required | Array of strings | `["Received: from localhost...", "DKIM-Signature: v=1 a=rsa...;]`
| messageId | Required | string | `<3baf4caf-948a-41e6-bc5c-2e99058e6461@mailer.mailpace.com>` |
| raw | Required | string | The full raw email as described in RFC 822 |
| to | Optional | string | `Person B <person_b@test.com>` |
| subject | Optional | string | `Email Subject` |
| cc | Optional | string | `Person C <person_C@test.com>` |
| bcc | Optional | string | `Person D <person_d@test.com>` |
| inReplyTo | Optional | string | `<3baf4caf-948a-41e6-bc5c-2e99058e6461@mailer.mailpace.com>` |
| replyTo | Optional | string | `bounces+abcd@test.com` |
| html | Optional | string |  `<h1>Email Contents Here</h1>` |
| text | Optional | string |  `Text Email Contents` |
| attachments | Optional | Array of Attachments | See [Attachments](#attachments) |

*Properties that are marked as Optional may not appear as a parameter in the body*

### Attachments

Attachments are sent as an array, in the following structure:

| Name | Details | Optionality | Type | Examples |
| :------------- | :-------------| :---------- | :----------- | :----------- |
| content | Content of the attachment, encoded as a **base64** string| Required | string | `Person A <person_a@test.com>` |
| type | Type of the attachment, usually just "attachment" | Required | string | `attachment` |
| contentType | MIME type of the message | Required | string | `text/plain` | 
| contentDisposition | Content disposition type for the attachment | Required | string | `attachment` |
| filename | File name of the attachment, if provided | Optional | string | `image.png` | 
| headers | Headers for the attachment | Required | Array of strings | `[Header: content, ...]`
| checksum | An MD5 hash of the attachment content | Required | string | `abc` |
| size | Message size in bytes | Required |  number | `123`
| contentId | The header value from `Content-ID` | Optional | string | `<abc>` |
| cid | `contentId` without `<` and `>` | Optional | string | `abc` |
| related | Attachment should not be offered for download as a "standard" Attachment | Optional | boolean | `true` |
