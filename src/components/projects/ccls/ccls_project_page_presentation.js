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
import cclsProjectOverview from '!json-loader!front-matter-loader!../../../docs/projects/ccls/ccls_project_overview.md';
/* eslint-enable */

const styles = () => ({});

const CCLSProjectPagePresentation = (props) => {
  const { sections } = props;

  return (
    <Grid container>
      <GridToolbarMargin />
      <BlogHelmet pageTitle="CCLS Android App" />
      <Grid item {...fullRowWidth}>
        <Grid container justify="center" spacing={16}>
          <ProjectOverviewRow
            projectTitle={cclsProjectOverview.attributes.projectTitle}
            projectBlurbNode={(<MarkdownRenderer markdown={cclsProjectOverview.body} />)}
          />
          <GalleryRow />
          <Grid item {...contentRowWidths}>
            {
              sections.map(section => (
                <DetailSection
                  key={section.attributes.ordinal}
                  sectionTitle={section.attributes.title}
                  sectionBlurb={section.attributes.description}
                  sectionContentNode={(<MarkdownRenderer markdown={section.body} />)}
                />
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CCLSProjectPagePresentation.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  classes: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  sections: PropTypes.arrayOf(PropTypes.shape({
    attributes: PropTypes.shape({
      ordinal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(styles)(CCLSProjectPagePresentation);
