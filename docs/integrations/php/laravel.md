---
id: laravel
title: Laravel Integration
sidebar_label: Laravel
---

## Overview

Laravel uses Symfony Mailer under the hood, we maintain a [Symfony Mailer Bridge](https://symfony.com/doc/current/mailer.html#using-a-3rd-party-transport) that makes sending emails from your Laravel app super easy.

## Setup

### Install the bridge & http client:

`composer require symfony/oh-my-smtp-mailer symfony/http-client`


### Extend Mail with the `oh-my-smtp` bridge

In a `boot()` function

```php title=app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Bridge\OhMySmtp\Transport\OhMySmtpTransportFactory;
use Symfony\Component\Mailer\Transport\Dsn;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Mail::extend('oh-my-smtp', function () {
            return (new OhMySmtpTransportFactory())->create(
                new Dsn(
                    'ohmysmtp+api',
                    'default',
                    config('services.ohmysmtp.key')
                )
            );
        });
    }
}
```

### Add the Mailer to the available transports 

```php title=config/mail.php
'mailpace' => [
    'transport' => 'oh-my-smtp',
],
```

### Add your API key

```php title=config/services.php
'mailpace' => [
    'key' => 'your-api-key',
],
```


## Example

Here's an example Laravel 9 repository with a commit that demonstrates the changes required to configure MailPace with Laravel:

https://github.com/mailpace/laravel-example/commit/93053f8d87fef62bb38323894a12a9e95b3abf91

In this example we create a `/send` route that triggers an email. To test this just update the `from` address and `key` with your MailPace API token and open the `/send` path in your browser