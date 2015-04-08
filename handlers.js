var async = require('async'),
    bcrypt = require('bcrypt'),
    slug = require('slug'),
    models = require('./models'),
    context = {
      message: ''
    };

exports.home = function (request, reply) {
  context.member = request.auth.credentials || {};
  reply.view('index', context);
}

exports.login = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
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
              return reply.redirect('/');
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

  reply.view('login', context);
}

exports.logout = function (request, reply) {
  request.auth.session.clear();
  reply.redirect('/');
}

exports.campaign = function (request, reply) {
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
      }).then(function (campaign) {
        return reply.redirect('/');
      });
    }
  }

  reply.view('campaign', context);
}

exports.character = function (request, reply) {
  context.member = request.auth.credentials || {};

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (request.method === 'post') {
      console.log('IBTEST');
      console.log(campaign);
      if (campaign) {
        if (request.payload.name) {
          models.character.create({
            name: request.payload.name,
            bio: request.payload.bio,
            slug: slug(request.payload.name).toLowerCase(),
            member_id: request.auth.credentials.id,
            campaign_id: campaign.id
          }).then(function (character) {
            return reply.redirect('/');
          });
        }

        context.message = 'Please enter a character name.';
      }
    }
  });

  reply.view('character', context);
}

exports.item = function (request, reply) {
  context.member = request.auth.credentials || {};

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (request.method === 'post') {
      if (campaign) {
        if (request.payload.name) {
          models.item.create({
            name: request.payload.name,
            description: request.payload.description,
            slug: slug(request.payload.name).toLowerCase(),
            campaign_id: campaign.id
          }).then(function (item) {
            return reply.redirect('/');
          });
        }

        context.message = 'Please enter an item name.';
      }
    }
  });

  reply.view('item', context);
}
