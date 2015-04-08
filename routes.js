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
    method: ['GET', 'POST'],
    path: '/campaign',
    handler: handlers.campaign,
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
    method: ['GET', 'POST'],
    path: '/campaign/{campaign_slug}/character',
    handler: handlers.character,
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
    method: ['GET', 'POST'],
    path: '/campaign/{campaign_slug}/item',
    handler: handlers.item,
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
