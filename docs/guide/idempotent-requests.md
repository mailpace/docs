---
id: idempotency
title: Idempotent Requests
sidebar_label: Idempotent Requests
---

Our [/send](../reference/send) endpoint supports [idempotency](https://en.wikipedia.org/wiki/Idempotence) for safely retrying requests without accidentally sending the same email twice. This is useful to guarantee that an email is not sent to the same recipient multiple times, e.g. through a network error, or a bug in your application logic.

To do this, when sending an email, you generate and add a unique `Idempotency-Key` string to the headers of the send request. You can then safely repeat the request without risk of sending the same email twice.

Typically you would use a UUID to do this (we suggest using [V4 UUIDs](https://datatracker.ietf.org/doc/html/rfc9562#section-5.4)), although you can use any unique string of your choice, with enough entropy to avoid a collision.

## Implementation Details

MailPace stores the response to all successful requests, and returns that response on all subsequent requests with the same Idempotency Key and Server Token, regardless of request body.

There are some additional considerations:

- Each key has a maximum length of 255 characters.
- Keys are expired at MailPace after 24 hours
- Each key is unique to the API Token, reusing the same Idempotency Key with a different Domain or API Token will result in the email being sent

We save results only after the email is queued for sending. If incoming parameters fail validation, or the request conflicts with another request that’s executing concurrently, we don’t save the idempotent result, and you can safely retry these requests.

## Examples

Here are some examples in various languages. 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="curl"
  values={[
  { label: 'cURL', value: 'curl', },
  { label: 'Node.js', value: 'js', },
  { label: 'Ruby', value: 'ruby', },
  { label: 'Python', value: 'python', },
  { label: 'Go', value: 'go', }
  ]
  }
>

  <TabItem value="curl">

  ```shell
curl "https://app.mailpace.com/api/v1/send" \
    -X POST \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -H "MailPace-Server-Token: API_TOKEN_GOES_HERE" \
    -H "Idempotency-Key: UNIQUE_STRING_EG_UUIDV4_GOES_HERE" \
    -d '{
      "from": "example@domain.com",
      "to": "person@somewhere.com",
      "subject": "Hello from MailPace.com",
      "textbody": "Hello"
    }'
  ```
  </TabItem>
  <TabItem value="js">

  ```js
var request = require('request');

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'MailPace-Server-Token': 'API_TOKEN_GOES_HERE',
    'Idempotency-Key': 'UNIQUE_STRING_EG_UUIDV4_GOES_HERE'
};

var dataString = `{
    "from": "example@domain.com",
    "to": "person@somewhere.com",
    "subject": "Hello from MailPace.com",
    "textbody": "Hello"
  }`;

var options = {
    url: 'https://app.mailpace.com/api/v1/send',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);
  ```

  </TabItem>

  <TabItem value="ruby">

  ```ruby
require 'net/http'
require 'uri'
require 'json'

uri = URI.parse('https://app.mailpace.com/api/v1/send')
request = Net::HTTP::Post.new(uri)
request.content_type = 'application/json'
request['Accept'] = 'application/json'
request['Ohmysmtp-Server-Token'] = 'API_TOKEN_GOES_HERE'
request['Idempotency-Key'] = 'UNIQUE_STRING_EG_UUIDV4_GOES_HERE'

request.body = JSON.dump(
  {
    'from' => 'example@domain.com',
    'to' => 'person@somewhere.com',
    'subject' => 'Hello from MailPace.com',
    'textbody' => 'Hello'
  }
)

req_options = {
    use_ssl: uri.scheme == 'https',
}

response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
    http.request(request)
end
  ```

  </TabItem>

  <TabItem value="python">

  ```py
import requests

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "MailPace-Server-Token": "API_TOKEN_GOES_HERE",
    "Idempotency-Key": "UNIQUE_STRING_EG_UUIDV4_GOES_HERE"
}

data = {
    "from": "example@domain.com",
    "to": "person@somewhere.com",
    "subject": "Hello from MailPace.com",
    "textbody": "Hello"
}

response = requests.post('https://app.mailpace.com/api/v1/send', headers=headers, data=data)

  ```

  </TabItem>

  <TabItem value="go">

  ```go
package main

import "bytes"
import "net/http"
import "encoding/json"

func main() {

type Payload struct {
    From     string `json:"from"`
    To       string `json:"to"`
    Subject  string `json:"subject"`
    Textbody string `json:"textbody"`
}

data := Payload{
    From: "example@domain.com",
    To: "someone@somewhere.com",
    Subject:  "Hello from MailPace.com",
    Textbody: "Hello",
}
payloadBytes, err := json.Marshal(data)
if err != nil {
    // handle err
}
body := bytes.NewReader(payloadBytes)

req, err := http.NewRequest("POST", "https://app.mailpace.com/api/v1/send", body)
if err != nil {
    // handle err
}
req.Header.Set("Accept", "application/json")
req.Header.Set("Content-Type", "application/json")
req.Header.Set("Ohmysmtp-Server-Token", "API_TOKEN_GOES_HERE")
req.Header.Set("Idempotency-Key", "UNIQUE_STRING_EG_UUIDV4_GOES_HERE")

resp, err := http.DefaultClient.Do(req)
if err != nil {
    // handle err
}
defer resp.Body.Close()

}
  ```

  </TabItem>
</Tabs>