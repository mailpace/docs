module.exports = {
  overview: [{
    type: "category",
    label: "Overview",
    items: ['overview/introduction', 'overview/firstEmail'],
    collapsed: false
  },
  {
    type: "category",
    label: "API Reference",
    collapsed: false,
    items: [
      'reference/overview',
      'reference/organization-quickstart',
      'reference/authentication',
      'reference/headers',
      'reference/send',
      'reference/domains',
      'reference/responses'
    ]
  },
  {
    type: "category",
    label: "Integrations",
    collapsed: false,
    items: [
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
    items: ['guide/lifecycle', 'guide/idempotency', 'guide/blocklist', 'guide/verification', 'guide/webhooks', 'guide/inbound', 'guide/moving_from_ohmysmtp']
  }]
};
