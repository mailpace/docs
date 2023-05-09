---
id: responses
title: Responses
sidebar_label: Responses
---

## Full list


| HTTP Status Code      | Message Contents    | Details     |
| :------------- | :---------- | :----------- |
|  200 | ```{"id": Integer, "status": String}``` | We have accepted the email and are queuing it for delivery. The ID is our internal email ID, the status will always be "pending"   |
|  400 | ```{"error":"Invalid API Token"} ``` | We can't match your API token to a Domain |
|  400 | ```{"error":"Email from address not parseable"}``` | Our API is unable to parse the email address you are sending from |
|  400 | ```{"errors":{"to":["undefined field"]}}``` | You did not include a `To` field in your request |
|  400 | ```{"errors":{"to":["is invalid"]}}```  | The `To` field does not contain a valid email address |
|  400 | ```{"errors":{"to":["contains a blocked address"]}}``` | An email in the `To` field is in your blocked addresses list, which we cannot send to |
|  400 | ```{"errors":{"to":["number of email addresses exceeds maximum volume"]}}``` | You can send up to 50 emails in one go by including them in the To field, this request has more than 50 emails in the To field |
|  400 | ```{"errors":{"attachments.name":["Extension file type blocked, see Docs for full list of allowed file types"]}}``` | See [here](/reference/send) for details of allowed attachment file types |
|  401 | ```{"error":"Missing API Token"}``` | You must include an API token in every request |
|  403 | ```{"error:"Domain DKIM DNS not verified, please complete DKIM Verification"}```| Every domain must complete DKIM verification before emails can be sent from it |
|  403 | ```{"error:"The organization that owns this domain does not have an active plan"}``` | Each organization must have an active plan to allow emails to be sent |
|  403 | ```{"error:"This organization is unable to send emails. Please contact support"}``` | Your organization has been disabled. Please contact support via email for details: support@mailpace.com |
|  403 | ```{"error:"Verified domain does not match domain in From address of email"}``` | The From address needs to contain exactly the same domain that you have registered, for example, if the email has a From address of test@test.com, you must be attempting to send using the API token for the test.com address |
|  406 | ```{"error:"Invalid request format or content type"}``` | Something in your request is invalid, check the (Send Reference Documentation)[send] for details |
|  429 | ```{"error:"You are sending emails too quickly"}``` | You are being rate limited due to sending too many emails in a short period of time. The application of rate limits varies depending on factors such as organization age, plan, and historical sending patterns. Contact Support if you are experiencing this regularly  |
|  500 | `No content` | Internal Server Error - our application is down, contact support if this persists |
