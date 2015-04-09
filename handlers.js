var async = require('async'),
    bcrypt = require('bcrypt'),
    boom = require('boom'),
    redis = require('redis'),
    slug = require('slug'),
    models = require('./models'),
    context = {};

exports.home = function (request, reply) {
  context.member = request.auth.credentials || null;
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

exports.new_campaign = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign';
  context.message = '';

  reply.view('campaign', context);
}

exports.create_campaign = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign';
  context.message = '';

  if (request.payload.name) {
    models.campaign.create({
      name: request.payload.name,
      description: request.payload.description,
      slug: slug(request.payload.name).toLowerCase(),
      member_id: request.auth.credentials.id
    }).then(function (campaign) {
      if (campaign) {
        return reply.redirect('/');
      } else {
        return reply(boom.notFound('Could not find campaign.'));
      }
    });
  } else {
    context.message = 'Please enter a campaign name.';
    return reply.view('campaign', context);
  }
}

exports.new_character = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign/' + request.params.campaign_slug + '/character';
  context.message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (campaign) {
      return reply.view('character', context);
    } else {
      return reply(boom.notFound('Could not find campaign.'));
    }
  });
}

exports.create_character = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign/' + request.params.campaign_slug + '/character';
  context.message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (campaign) {
      if (request.payload.name) {
        models.character.create({
          name: request.payload.name,
          bio: request.payload.bio,
          slug: slug(request.payload.name).toLowerCase(),
          member_id: request.auth.credentials.id,
          campaign_id: campaign.id
        }).then(function (character) {
          if (character) {
            return reply.redirect('/');
          } else {
            return reply(boom.badRequest('Could not create character.'));
          }
        });
      } else {
        context.message = 'Please enter a character name.';
        return reply.view('character', context);
      }
    } else {
      return reply(boom.notFound('Could not find campaign.'));
    }
  });
}

exports.new_item = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign/' + request.params.campaign_slug + '/item';
  context.message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (campaign) {
      return reply.view('item', context);
    } else {
      return reply(boom.notFound('Could not find campaign.'));
    }
  });
}

exports.create_item = function (request, reply) {
  context.member = request.auth.credentials || {};
  context.form_action_url = '/campaign/' + request.params.campaign_slug + '/item';
  context.message = '';

  models.campaign.findOne({
    where: {
      slug: request.params.campaign_slug
    }
  }).then(function (campaign) {
    if (campaign) {
      if (request.payload.name) {
        models.item.create({
          name: request.payload.name,
          description: request.payload.description,
          slug: slug(request.payload.name).toLowerCase(),
          campaign_id: campaign.id
        }).then(function (item) {
          if (item) {
            return reply.redirect('/');
          } else {
            return reply(boom.badRequest('Could not create item.'));
          }
        });
      } else {
        context.message = 'Please enter an item name.';
        return reply.view('item', context);
      }
    } else {
      return reply(boom.notFound('Could not find item.'));
    }
  });
}
