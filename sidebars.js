module.exports = {
  overview: [{
    type: "category",
    label: "Overview",
    items: ['overview/introduction', 'overview/firstEmail'],
    collapsed: false
  },
  {
    type: "category",
    label: "Integrations",
    collapsed: false,
    items: [
      {
        "HTTP API": [
          'reference/overview',
          'reference/authentication',
          'reference/headers',
          'reference/send',
          'reference/responses'
        ]
      },
      'integrations/smtp',
      'integrations/rails',
      {
        "JavaScript": [
          'integrations/javascript/node',
          'integrations/javascript/fastify',
        ]
      },
      {
        "PHP": [
          'integrations/php/laravel',
          'integrations/php/swiftmailer',
          'integrations/php/symfony',
        ]
      },
      {
        "Erlang": [
          "integrations/erlang/swoosh",
          "integrations/erlang/elixir",
        ]
      },
      'integrations/go',
      'integrations/rust',
    ]
  },
  {
    type: "category",
    label: "Guides",
    collapsed: false,
    items: ['guide/lifecycle', 'guide/blocklist', 'guide/verification', 'guide/webhooks', 'guide/inbound', 'guide/moving_from_ohmysmtp']
  }]
};