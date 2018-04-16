import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import DetailSection from './detail_section';
import { GalleryRow, ProjectOverviewRow } from './project_page_rows';
import BlogHelmet from '../../blog_helmet';
import { fullRowWidth, contentRowWidths } from '../../../style/dimensions';
import { GridToolbarMargin } from '../../../style/grid_styles';
import MarkdownRenderer from '../../../widgets/markdown/markdown_renderer';
// Disabling eslint for these imports because they don't like webpack loader syntax
// But, that's needed in create-react-app without ejecting because there's no
// access to the webpack configuration files
/* eslint-disable */
import projectOverviewConstants from '!json-loader!front-matter-loader!../../../docs/projects/ccls/project_overview.md';
/* eslint-enable */

const styles = () => ({});

const CCLSProjectPage = (props) => {
  return (
    <Grid container>
      <GridToolbarMargin />
      <BlogHelmet pageTitle="CCLS Android App" />
      <Grid item {...fullRowWidth}>
        <Grid container justify="center" spacing={16}>
          <ProjectOverviewRow
            projectTitle={projectOverviewConstants.attributes.projectTitle}
            projectBlurbNode={(<MarkdownRenderer markdown={projectOverviewConstants.body} />)}
          />
          <GalleryRow />
          <Grid item {...contentRowWidths}>
            <DetailSection
              sectionTitle="Project Overview"
              sectionBlurb="What the project consisted of"
              sectionContentNode="Under Construction"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CCLSProjectPage.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default withStyles(styles)(CCLSProjectPage);
