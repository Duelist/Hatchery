var async = require('async'),
    bcrypt = require('bcrypt'),
    boom = require('boom'),
    redis = require('redis'),
    slug = require('slug'),
    models = require('./models'),
    context = {},
    redis_client = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_IP
    );

exports.home = function (request, reply) {
  context.member = request.auth.credentials || null;
  reply.view('index', context);
}

exports.get_login = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  } else {
    return reply.view('login', context);
  }
}

exports.post_login = function (request, reply) {
  if (request.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  if (!request.payload.username || !request.payload.password) {
    context.message = 'Missing username or password.';
    return reply.view('login', context);
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
            return reply.view('login', context);
          }
        })
      } else {
        context.message = 'Invalid username or password.';
        return reply.view('login', context);
      }
    });
  }
}

exports.logout = function (request, reply) {
  request.auth.session.clear();
  reply.redirect('/');
}

exports.new_member = function (request, reply) {
  context.member = request.auth.credentials || null;
  context.form_action_url = '/member';
  context.message = '';

  return reply.view('member', context);
}

exports.create_member = function (request, reply) {
  context.member = request.auth.credentials || null;
  context.form_action_url = '/member';
  context.message = '';

  if (context.member) {
    return reply.redirect('/');
  } else {
    if (request.payload.email && request.payload.username && request.payload.password) {
      bcrypt.genSalt(function (err, salt) {
        if (salt) {
          bcrypt.hash(request.payload.password, salt, function (err, hash) {
            if (hash) {
              models.member.create({
                username: request.payload.username,
                password: hash,
                email: request.payload.email
              }).then(function (member) {
                if (member) {
                  return reply.redirect('/');
                } else {
                  context.message = 'Could not create member.';
                  return reply.view('member', context);
                }
              }).error(function (err) {
                context.message = 'Validation error.';
                return reply.view('member', context);
              });
            } else {
              context.message = 'Password could not be hashed.';
              return reply.view('member', context);
            }
          });
        } else {
          context.message = 'Salt could not be generated.';
          return reply.view('member', context);
        }
      });
    } else {
      context.message = 'Please fill in all required fields.';
      return reply.view('member', context);
    }
  }
}

exports.new_campaign = function (request, reply) {
  context.member = request.auth.credentials || null;
  context.form_action_url = '/campaign';
  context.message = '';

  return reply.view('campaign', context);
}

exports.create_campaign = function (request, reply) {
  context.member = request.auth.credentials || null;
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
          redis_client.sadd('campaigns:' + member.id, {
          id: campaign.id,
          slug: campaign.slug,
          name: campaign.name
        }, function (err, res) {
          return reply.redirect('/');
        });
      } else {
        return reply(boom.notFound('Could not create campaign.'));
      }
    });
  } else {
    context.message = 'Please enter a campaign name.';
    return reply.view('campaign', context);
  }
}

exports.new_character = function (request, reply) {
  context.member = request.auth.credentials || null;
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
  context.member = request.auth.credentials || null;
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
  context.member = request.auth.credentials || null;
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
  context.member = request.auth.credentials || null;
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
