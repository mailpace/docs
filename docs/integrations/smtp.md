---
id: smtp
title: Send Email over SMTP
sidebar_label: SMTP
---

## Why use SMTP

Many applications and frameworks use the Simple Mail Transfer Protocol (SMTP) to send emails directly to other SMTP servers that in turn send the emails onto end user inboxes. In fact, SMTP is used under the hood for almost all emails and was first defined in 1982! So it's safe to say it's a stable and powerful way to send emails.

You may be able to send emails from an existing application by simply changing to our configuration settings below. However, SMTP is a chatty protocol (literally, our SMTP server responds with "Nice to meet you"!) - and as a result it's a slower way to send an email. So if you can, use our HTTPS API to ensure your emails get there quickly.

If you do need to use SMTP (e.g. to migrate an application with making any code changes), read on for instructions.

## SMTP Configuration

Find your application's SMTP configuration settings and use the following options:


| Option      | Setting    | Details |
| :------------- | :---------- |  :------ |
| SMTP Server | ```smtp.mailpace.com``` | Sometimes called Host Address or similar |
| SMTP Port | `25`, `587`, `2525` or `465` | Pick `25`, `587` or `2525` if you wish to connect with `STARTTLS`, or `465` if you want to connect with `TLS` only |
| Encryption | `STARTTLS` or `TLS` | `STARTTLS` will open an insecure connection and upgrade to secure. If you wish to use `TLS` only, ensure you use port `465` above |
| Authentication | `PLAIN` or `LOGIN` | You may only have an option to enable this without any choices, in that case it will work fine |
| Username | `Your API token` | API tokens can be found under the "API Tokens" menu of a each Domain, there is one unique API token for every domain | 
| Password | `Your API token` | API tokens can be found under the "API Tokens" menu of a each Domain, there is one unique API token for every domain | 

That's all you need. You can continue sending emails through your application's standard email interface and emails sent over SMTP will appear on your dashboard.

:::info
We are not an SMTP relay. Unsupported headers, or metadata (like Message-id) will not be kept when sending emails via SMTP. You must also set `From` and `To` headers in the message body.
:::

## Tags

MailPace supports tagging emails for later categorization and analysis in the UI. To do this over SMTP you need to set a Header on the email, using the email software you're using to send the message. The header name should be `X-MailPace-Tags` and the content either a single string or comma separated list of strings, as follows:

```
X-MailPace-Tags: a single tag
```

or

```
X-MailPace-Tags: tag one, tag two, tag three
```

## List-Unsubscribe

MailPace supports adding a `List-Unsubscribe` header to emails to allow mail clients to display an Unsubscribe link in the client. To include the header, supply the URI and/or mailto details as a header named `X-List-Unsubscribe`

```
X-List-Unsubscribe: <http://www.host.com/list.cgi?cmd=unsub&lst=list>, <mailto:list-request@host.com?subject=unsubscribe>
```