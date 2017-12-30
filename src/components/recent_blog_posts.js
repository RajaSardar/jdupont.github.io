import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import BlurbCard from './blog_posts/blurb_card';
import { filepathToUrlParam } from './routing/title_to_url_converter';
import { fullRowWidth, contentRowWidths } from '../style/dimensions';
import { topLevelGridStyles } from '../style/grid_styles';

const contentStyles = theme => ({
  content: {
    ...topLevelGridStyles(theme),
  },
});

class RecentBlogPosts extends Component {
  static createBlurb(postFileName, post) {
    return (
      <BlurbCard
        key={postFileName}
        title={post.attributes.title}
        date={post.attributes.date}
        preview={post.attributes.description}
        image={`${process.env.PUBLIC_URL}/images/blog_posts/${post.attributes.coverImage}`}
        link={{ pathname: '/blogs', query: { title: filepathToUrlParam(postFileName) } }}
        tags={post.attributes.tags}
      />
    );
  }

  static wrapInGrid(item, uniqueKey) {
    return (
      <Grid key={uniqueKey} item {...fullRowWidth}>
        <Grid key={uniqueKey} container justify="center">
          <Grid key={uniqueKey} item {...contentRowWidths}>
            {item}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  static getBlogPosts() {
    const blogPosts = require.context('!json-loader!front-matter-loader!../../public/posts/', true, /.md$/);
    return blogPosts;
  }

  render() {
    const { classes } = this.props;

    const blogPosts = RecentBlogPosts.getBlogPosts();

    return (
      <Grid container className={classes.content}>
        {blogPosts.keys().map((fileName) => {
          const post = blogPosts(fileName);
          const blurbCard = RecentBlogPosts.createBlurb(fileName, post);
          return RecentBlogPosts.wrapInGrid(blurbCard, fileName);
        })}
      </Grid>
    );
  }
}

RecentBlogPosts.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default withStyles(contentStyles, { withTheme: true })(RecentBlogPosts);