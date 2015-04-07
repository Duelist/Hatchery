var endpoints = require('./endpoints');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: endpoints.home,
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
    handler: endpoints.login,
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
    handler: endpoints.logout,
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
    handler: endpoints.campaign,
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
    handler: endpoints.character,
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
    handler: endpoints.item,
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
