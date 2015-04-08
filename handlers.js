var async = require('async'),
    bcrypt = require('bcrypt'),
    slug = require('slug'),
    models = require('./models'),
    context = {
      message: ''
    };

exports.home = function (request, response) {
  return response.view('index', {
    member: request.auth.credentials
  });
}

exports.login = function (request, response) {
  if (request.auth.isAuthenticated) {
    return response.redirect('/');
  }

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      context.message = 'Missing username or password.';
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
              context.message = 'Invalid username or password.';
            }
          })
        } else {
          context.message = 'Invalid username or password.';
        }
      });
    }
  }

  return response.view('login', context);
}

exports.logout = function (request, response) {
  request.auth.session.clear();
  return response.redirect('/');
}

exports.campaign = function (request, response) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign';

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

  return response.view('campaign', context);
}

exports.character = function (request, response) {
  context.member = request.auth.credentials || {};

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).success(function (campaign) {
    if (request.method === 'post') {
      if (request.payload.name && campaign) {
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

      context.message = 'Please enter a character name.';
    }
  });

  return response.view('character', context);
}

exports.item = function (request, response) {
  context.member = request.auth.credentials || {};

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (request.method === 'post') {
      if (request.payload.name && campaign) {
        models.item.create({
          name: request.payload.name,
          description: request.payload.description,
          slug: slug(request.payload.name).toLowerCase(),
          campaign_id: campaign.id
        }).then(function (item) {
          return response.redirect('/');
        });
      }

      context.message = 'Please enter an item name.';
    }
  });

  return response.view('item', context);
}
