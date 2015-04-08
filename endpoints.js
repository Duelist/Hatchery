var async = require('async'),
    bcrypt = require('bcrypt'),
    slug = require('slug'),
    models = require('./models');

exports.home = function (request, response) {
  response.view('index', {
    member: request.auth.credentials
  });
}

exports.login = function (request, response) {
  var message = '';

  if (request.auth.isAuthenticated) {
    return response.redirect('/');
  }

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password.';
      response.view('login', { message: message });
    } else {
      models.member.findOne({
        where: {
          username: request.payload.username
        }
      }).then(function (member) {
        if (member) {
          bcrypt.compare(request.payload.password, member.password, function (err, is_valid) {
            if (is_valid) {
              request.auth.session.set(member);
              return response.redirect('/');
            } else {
              message = 'Invalid username or password.';
              response.view('login', { message: message });
            }
          })
        } else {
          message = 'Invalid username or password.';
          response.view('login', { message: message });
        }
      });
    }
  }

  if (request.method === 'get') {
    response.view('login', { message: message });
  }
}

exports.logout = function (request, response) {
  request.auth.session.clear();
  return response.redirect('/');
}

exports.campaign = function (request, response) {
  if (request.method === 'post') {
    if (request.payload.name) {
      // Create campaign
      models.campaign.create({
        name: request.payload.name,
        description: request.payload.description,
        slug: slug(request.payload.name).toLowerCase(),
        member_id: request.auth.credentials.id
      }).then(function (campaign) {
        if (campaign) {
          response.redirect('/');
        } else {
          response.view('campaign', {
            member: request.auth.credentials,
            message: 'Could not create a new campaign.'
          });
        }
      });
    }
  } else {
    response.view('campaign', {
      member: request.auth.credentials,
      form_action_url: '/campaign'
    });
  }
}

exports.character = function (request, response) {
  if (request.method === 'post') {
    if (request.payload.name) {
      // Create character
      models.campaign.findOne({
        where: {
          slug: request.params.campaign_slug
        }
      }).then(function (campaign) {
        if (campaign) {
          models.character.create({
            name: request.payload.name,
            bio: request.payload.bio,
            slug: slug(request.payload.name).toLowerCase(),
            member_id: request.auth.credentials.id,
            campaign_id: request.params.campaign_id
          }).then(function (character) {
            if (character) {
              response.redirect('/');
            } else {
              response.view('character', {
                member: request.auth.credentials,
                message: 'Could not create a new character.'
              });
            }
          });
        } else {
          response.redirect('/');
        }
      });
    }
  } else {
    models.campaign.findOne({
      where: {
        slug: request.params.campaign_slug
      }
    }).then(function (campaign) {
      if (campaign) {
        response.view('character', {
          member: request.auth.credentials,
          form_action_url: '/campaign/' + request.params.campaign_id + '/character'
        });
      } else {
        response.redirect('/');
      }
    });
  }
}

exports.item = function (request, response) {
  if (request.method === 'post') {
    if (request.payload.name) {
      // Create item
      models.campaign.findOne({
        where: {
          slug: request.params.campaign_slug
        }
      }).then(function (campaign) {
        if (campaign) {
          models.item.create({
            name: request.payload.name,
            description: request.payload.description,
            slug: slug(request.payload.name)
          }).then(function (item) {
            if (item) {
              response.redirect('/');
            } else {
              response.view('item', {
                member: request.auth.credentials,
                message: 'Could not create a new item.'
              });
            }
          });
        } else {
          response.redirect('/');
        }
      });
    }
  } else {
    models.campaign.findOne({
      where: {
        slug: request.params.campaign_slug
      }
    }).then(function (campaign) {
      if (campaign) {
        response.view('item', {
          member: request.auth.credentials,
          form_action_url: '/campaign/' + campaign.slug + '/item'
        });
      } else {
        response.redirect('/');
      }
    });
  }
}
