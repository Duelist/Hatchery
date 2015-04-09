var handlers = require('./handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.home,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/login',
    handler: handlers.login,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: handlers.logout,
    config: {
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: ['GET'],
    path: '/campaign/new',
    handler: handlers.new_campaign,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: ['POST'],
    path: '/campaign',
    handler: handlers.create_campaign,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: ['GET'],
    path: '/campaign/{campaign_slug}/character/new',
    handler: handlers.new_character,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: ['POST'],
    path: '/campaign/{campaign_slug}/character',
    handler: handlers.create_character,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: ['GET'],
    path: '/campaign/{campaign_slug}/item/new',
    handler: handlers.new_item,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  },
  {
    method: ['POST'],
    path: '/campaign/{campaign_slug}/item',
    handler: handlers.create_item,
    config: {
      auth: {
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/'
        }
      }
    }
  }
]
