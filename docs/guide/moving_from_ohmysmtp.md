---
id: moving_from_ohmysmtp
title: Moving from OhMySMTP to MailPace
sidebar_label: Moving from OhMySMTP
---

## Summary

- In January 2022 we renamed our service from OhMySMTP to MailPace. **This is a name change only**, ownership, service and all other aspects of our original service remain the same
- The existing API routes, SMTP servers and all libraries will continue to operate and exist as before, indefinitely
- You don't need to change anything on your end in your application(s), however it would be prudent to update your application libraries/API routes to the new MailPace ones listed below

## Changes

### HTTPS API 

| Change      | Old      | New    | Comments |
| :------------- | :------------- | :---------- |  :------ |
| API domain | https://api.ohmysmtp.com | https://api.mailpace.com | The existing API routes will all continue to work indefinitely|
| API Token header name | `OhMySMTP-Server-Token` | `MailPace-Server-Token` | The old token name will be supported indefinitely |


### SMTP Server

| Change      | Old      | New    | Comments |
| :------------- | :------------- | :---------- |  :------ |
| SMTP Domain | https://smtp.ohmysmtp.com | https://smtp.mailpace.com | The existing SMTP route will continue to work indefinitely|
| Tags header name | `X-OhMySMTP-Tags` | `X-MailPace-Tags` | The old tags header will be supported indefinitely  |

### Your DNS Settings

| Record      | Old      | New    | Comments |
| :------------- | :------------- | :---------- |  :------ |
| DKIM Selector | `ohmysmtp._domainkey<.your-subdomain>` | `ohmysmtp._domainkey<.your-subdomain>`  | To avoid breaking DKIM signing this stays the same |
| Advanced Verification - CNAME  | `mailer.ohmysmtp.com` | mailer.ohmysmtp.com | To avoid breaking rDNS lookups this stays the same  |
| Inbound CNAME | `inbound.ohmysmtp.com` | inbound.mailpace.com | Inbound emails will continue to work through the old record indefinitely |

### Libraries

| Library      | Old Name     | New Name   | Comments |
| :------------- | :------------- | :---------- |  :------ |
| Rails | `ohmysmtp-rails` | `mailpace-rails` | The existing gem will remain available, but will not receive updates |
| Node / JavaScript | `@ohmysmtp/ohmysmtp.js` | `@mailpace/mailpace.js` | The existing npm library will remain available, but will not receive updates |
| Swiftmailer | `ohmysmtp-swiftmailer` | `mailpace-swiftmailer` | The existing package will remain available, but will not receive updates |

All other libraries are community maintained and will be updated in due course.

### Websites and Support

| Item      | Old     | New   | 
| :------------- | :------------- | :---------- | 
| Landing Page | https://ohmysmtp.com | https://mailpace.com |
| Documentation | https://docs.ohmysmtp.com | https://docs.mailpace.com |
| Blog | https://blog.ohmysmtp.com | https://mailpace.com/blog |
| Status Monitor | https://status.ohmysmtp.com | https://status.mailpace.com |
| Support Email | support@ohmysmtp.com | support@mailpace.com |
| Twitter | [@ohmysmtp](https://twitter.com/ohmysmtp) | [@mailpace](https://twitter.com/mailpace) |
| Github | https://github.com/ohmysmtp | https://github.com/mailpace |

## Support

If you have any queries or require support, please contact us at support@mailpace.com
