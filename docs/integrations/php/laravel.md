---
id: laravel
title: Laravel Integration
sidebar_label: Laravel
---

## Overview

Laravel uses Symfony Mailer under the hood, we maintain a [Symfony Mailer Bridge](https://symfony.com/doc/current/mailer.html#using-a-3rd-party-transport) that makes sending emails from your Laravel app super easy.

## Setup

### Install the bridge & http client:

`composer require symfony/mail-pace-mailer symfony/http-client`


### Extend Mail with the `mail-pace` bridge

In a `boot()` function

```php title=app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Bridge\MailPace\Transport\MailPaceTransportFactory;
use Symfony\Component\Mailer\Transport\Dsn;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Mail::extend('mail-pace', function () {
            return (new MailPaceTransportFactory())->create(
                new Dsn(
                    'mailpace+api',
                    'default',
                    config('services.mailpace.key')
                )
            );
        });
    }
}
```

### Add the Mailer to the available transports 

```php title=config/mail.php
'mailpace' => [
    'transport' => 'mail-pace',
],
```

### Add your API key

```php title=config/services.php
'mailpace' => [
    'key' => 'your-api-key',
],
```


## Example

Here's an example Laravel 9 repository demonstrates a MailPace configuration with Laravel:

https://github.com/mailpace/laravel-example/

In this example we create a `/send` route that triggers an email. To test this just update the `from` address and `key` with your MailPace API token and open the `/send` path in your browser
