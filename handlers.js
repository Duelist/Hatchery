var async = require('async'),
    bcrypt = require('bcrypt'),
    slug = require('slug'),
    models = require('./models');

exports.home = function (request, response) {
  return response.view('index', {
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
            }
          })
        } else {
          message = 'Invalid username or password.';
        }
      });
    }
  }

  return response.view('login', {
    message: message
  });
}

exports.logout = function (request, response) {
  request.auth.session.clear();
  return response.redirect('/');
}

exports.campaign = function (request, response) {
  var message = '';

  if (request.method === 'post') {
    if (request.payload.name) {
      // Create campaign
      models.campaign.create({
        name: request.payload.name,
        description: request.payload.description,
        slug: slug(request.payload.name).toLowerCase(),
        member_id: request.auth.credentials.id
      }).success(function (campaign) {
        return response.redirect('/');
      });
    }
  }

  return response.view('campaign', {
    member: request.auth.credentials,
    form_action_url: '/campaign',
    message: message
  });
}

exports.character = function (request, response) {
  var message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).success(function (campaign) {
    if (request.method === 'post') {
      if (request.payload.name) {
        models.character.create({
          name: request.payload.name,
          bio: request.payload.bio,
          slug: slug(request.payload.name).toLowerCase(),
          member_id: request.auth.credentials.id,
          campaign_id: campaign.id
        }).success(function (character) {
          return response.redirect('/');
        });
      }

      message = 'Please enter a character name.';
    }
  });

  return response.view('character', {
    member: request.auth.credentials,
    message: message
  });
}

exports.item = function (request, response) {
  var message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (request.method === 'post') {
      if (request.payload.name) {
        models.item.create({
          name: request.payload.name,
          description: request.payload.description,
          slug: slug(request.payload.name).toLowerCase(),
          campaign_id: campaign.id
        }).then(function (item) {
          return response.redirect('/');
        });
      }

      message = 'Please enter an item name.';
    }
  });

  return response.view('item', {
    member: request.auth.credentials,
    message: message
  });
}
