---
id: verification
title: Domain Verification (DKIM, SPF and DMARC)
sidebar_label: Verification
---

## Basic Verification

In order to send emails with us you must verify ownership of your chosen domain. This will also enable [DKIM signing](https://blog.mailpace.com/blog/whats-a-DKIM-record/) of your emails, which proves that your emails have come from a server with the authority to send emails on your behalf and that they have not been tampered with.

You will be guided through DKIM verification during the onboarding process. If you need to re-verify your domain (for example after changing DNS providers), you can complete the process again by accessing the Verification page under your Domain.

## Advanced Verification

To improve deliverability rates you can enable [DMARC validation](https://en.wikipedia.org/wiki/DMARC), which is an additional check used to tie SPF and DKIM together into a Domain policy. 

:::caution
Adjusting DMARC, CNAME and SPF policies for your domain can introduce side effects on other email services using the same domain. If you are unsure of the impacts, contact our support team and we'll be happy to guide you through the setup process
:::

When you complete the Advanced Verification steps (two additional DNS records) on your `Domain -> Verification` page, a Custom Return-Path will be enabled for your domain. This means your emails will have a Return-Path which looks like this:

```
bounces+<message-id>@mailer.<domain>
```

Where `message-id` is set by our email servers and `domain` is your full domain name. With this your `From` address and `Reply-To` addresses will have the same domain, which is required for DMARC validation to pass and is often used as an additional check by spam filters.

Additionally, Because you will also add a CNAME record to `mailer.ohmysmtp.com` as part of this process, any bounce reports will also be redirected to our servers for handling.