import requests

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'MailPace-Server-Token': '6b6dbe32-012d-4fd4-8bd1-2276f6e1de8c',
}

data = '{\n    "from": "SOMEONE@google.com",\n    "to": "SOMEONE@SOMEWHERE.com",\n    "subject": "Hello from MailPace.com",\n    "textbody": "HTML Body is auto-generated"\n  }'

response = requests.post('https://app.mailpace.com/api/v1/send', headers=headers, json=data)