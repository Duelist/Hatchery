/** @jsx React.DOM */

var React = require('react'),
    io = require('socket.io-client'),
    cx = require('classnames'),
    BlogPost = require('./blog_post');

var Blog = React.createClass({
  getInitialState: function() {
    return {
      blog_id: 1,
      posts: null
    };
  },
  componentDidMount: function() {
    var that = this;
    this.socket = io('http://localhost:3000/');

    this.socket.on('blog-posts', function (posts) {
      that.setState({
        blog_id: that.state.blog_id,
        posts: posts
      });
    });

    this.socket.emit('get-blog-posts', {
      blog_id: this.state.blog_id
    });
  },
  render: function() {
    var classes = cx(
      'blog',
      this.props.className
    );

    var posts = (<div>Loading blog posts...</div>);
    if (this.state.posts) {
      posts = this.state.posts.map(function (post) {
        return (<BlogPost title={post.title} body={post.body}></BlogPost>);
      });
    }

    return (
      <div className={classes}>
        {posts}
      </div>
    );
  }
});

module.exports = Blog;
