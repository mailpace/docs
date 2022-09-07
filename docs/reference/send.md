---
id: send
title: Send
sidebar_label: Send
---

## The Send Endpoint

The `/send` endpoint is the main API endpoint for sending messages through MailPace

## Send an email

### Endpoint address

`https://app.mailpace.com/api/v1/send`

*Only HTTPS is supported*

### Limitations

- You can send to up 50 email addresses in one go in the `To` address fields
- The endpoint supports a total email size of 50 MB
- Rate limits exist for high send volumes over short periods of time. If you are experiencing this or believe you will, contact our Support team to discuss 

### Headers

| Header Name     | Contents    | |
| :------------- | :---------- | :----------- |
|  Accept | `application/json` | **Required** |
|  Content-Type | `application/json` | **Required** |
|  MailPace-Server-Token | See [authentication](authentication) for details | **Required**  |

### Body Parameters

| Name | Type | Examples | Validations | | 
| :------------- | :---------- | :----------- | :----------- | :----------- |
| from | string | `example@domain.com` <br /> <br /> `Full Name <example@domain.com>` | Must be an email address or name & addr-spec as specified in https://tools.ietf.org/html/rfc822. Domain must be the domain associated with this API token. |  **Required** |
| to | string | `example@domain.com` <br /> <br /> `Full Name <example@domain.com>` <br /> <br /> `example@domain.com, example2@domain.com, Full Name <example3@domain.com>` | Must be an email address, name & addr-spec as specified in https://tools.ietf.org/html/rfc822 or a comma separated list of email addresses |  **Required** |
| htmlbody | string | `<html><body><p>Content</p></body></html>` | Enclosing html tags are optional |  **Required if textbody not supplied** |
| textbody | string | `Content` |  |  **Required if htmlbody not supplied** |
| cc | string | `example@domain.com` <br /> <br /> `Full Name <example@domain.com>` <br /> <br /> `example@domain.com, example2@domain.com, Full Name <example3@domain.com>` | Must be an email address, name & addr-spec as specified in https://tools.ietf.org/html/rfc822, or a comma separated list of email addresses |  *Optional* |
| bcc | string | `example@domain.com` <br /> <br /> `Full Name <example@domain.com>` <br /> <br /> `example@domain.com, example2@domain.com, Full Name <example3@domain.com>` | Must be an email address, name & addr-spec as specified in https://tools.ietf.org/html/rfc822, or a comma separated list of email addresses |  *Optional* |
| subject | string | `Email Subject` |  |  *Optional* |
| replyto | string | `example@domain.com` |  |  *Optional* |
| list_unsubscribe | string | `<mailto:list@host.com?subject=unsubscribe>`<br /> <br />`<http://www.host.com/list.cgi?cmd=unsub&lst=list>, <mailto:list-request@host.com?subject=unsubscribe>`|  |  *Optional* |
| attachments | array of attachment objects (see below) | [ name: "attachment.jpg", "cid": '< attachment.cid>', "content": "abcdefghijek", content_type": "image/jpeg" ] |  |  *Optional* File types are allow-listed (see below) |
| tags | array of tags or a single tag as a string | [ "password reset", "welcome" ] or "welcome" | |  *Optional* |


#### Attachments

To send attachments over the API use the following format of an array of objects as the `attachments` property:

```javascript
[
    {
        name: "This is what will be displayed to the end user. Example: myimage.jpg",
        content: "The attachment, encoded as a base64 encoded string",
        content_type: "MIME type. Example: image/jpeg"
        cid: "Optional, used for embedding inline images. Example: '<myimage.cid>'. Setting a cid value will set the attachment's Content-Disposition type to 'inline'",
    },
    { ... }
]
```

That the content field (the attachment itself) should be a base64 encoded string. You can easily convert files to base64 strings in most programming languages.

Only the following attachment extensions are supported, see [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for their corresponding ContentTypes:

`jpeg`, `jpg`, `png`, `gif`, `txt`, `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `att`, `ics`, `ical`

Including files with an extension other than the above will return an error. If you need to send an attachment type that is not specified in the list above, contact our Support team.

For unusual file types or large attachments we **strongly recommend using an external service to host files and send a link to those files in the email**. This will be much faster, and tends to be a far more scalable approach.