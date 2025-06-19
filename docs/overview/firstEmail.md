---
id: firstEmail
title: Sending an email
sidebar_label: Send your first email
---

## Prerequisites

You must complete the following within https://app.mailpace.com:

- Create an Organization
- Create a Domain
- Verify the domain
- Sign up to a Plan

After following the [onboarding steps](https://app.mailpace.com/onboarding) all of these steps should be complete

## Sending an email with the HTTPS API

The MailPace has an easy to use HTTPS API, to send an email you just need to call the [/send endpoint](../reference/send) with a standard HTTP POST request containing the [authentication token](../reference/authentication), [required headers](../reference/headers) and your email

The send endpoint is located at

`https://app.mailpace.com/api/v1/send`

### Examples

Here are some examples in various languages. For examples that contain your API key, open the Domain in the App and select "Examples" from the top menu bar

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
    'MailPace-Server-Token': 'API_TOKEN_GOES_HERE'
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
    "MailPace-Server-Token": "API_TOKEN_GOES_HERE"
}

data = {
    "from": "example@domain.com",
    "to": "person@somewhere.com",
    "subject": "Hello from MailPace.com",
    "textbody": "Hello"
}

response = requests.post('https://app.mailpace.com/api/v1/send', headers=headers, json=data)

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

resp, err := http.DefaultClient.Do(req)
if err != nil {
    // handle err
}
defer resp.Body.Close()

}
  ```

  </TabItem>
</Tabs>

## The response

The response will come back using HTTP Status codes with a JSON body. If something went wrong (i.e. it does not return 200) an error object will be included to explain why. For full details of responses and their meaning see [responses](../reference/responses)
