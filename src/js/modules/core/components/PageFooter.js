import React from 'react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const styles = {
  PageFooter: {
    background: '#121212',
    height: '370px',
    paddingTop: '9px',
  },
  pageFooterMain: {
    margin: '0 auto',
    width: '930px',
  },
  sectionFlex: {
    height: '350px',
    display: 'flex',
    flexFlow: 'column wrap',
  },
  sectionBlock: {
    marginTop: '23px',
    marginRight: '20px',
  },
  topLevelSectionLink: {
    color: '#fffefe',
    fontSize: '14px',
    fontFamily: "Circular Std",
    fontStyle: 'normal',
    fontWeight: '500',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subsectionLink: {
    color: '#b6b6b6',
    fontSize: '13px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: '300',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  filler: {
    width: '140px',
    padding: '0px 10px',
  }
};

const PageFooter = ({classes, sectionsWithSubsections}) => {
  const makeSectionLinks = () => {
    return (sectionsWithSubsections.map((topLevelSection) => {
        return (
          <div className={classes.sectionBlock} key={topLevelSection.id}>
            <Link to={`/${topLevelSection.slug}`} className={classes.topLevelSectionLink}>
              {topLevelSection.name}
            </Link><br/>
            {
              Object.keys(topLevelSection.subsections).map((subsectionSlug) => {
                return makeSubsectionLink(
                  topLevelSection.slug,
                  topLevelSection.subsections[subsectionSlug]);
              })
            }
          </div>
        );
      })
    );
  };
  const makeSubsectionLink = (topLevelSectionSlug, subsection) => {
    return (
      <div>
        <Link to={`/${topLevelSectionSlug}/${subsection.slug}`} className={classes.subsectionLink}>
          {subsection.name}
        </Link>
        <br/>
      </div>
    );
  };

  return (
    <Container fluid={true} className={classes.PageFooter}>
      <Row className={classes.pageFooterMain}>
        <Col md="8" md-offset="2" className={classes.sectionFlex}>
          {makeSectionLinks()}
        </Col>
      </Row>
    </Container>
  );
};

export default (injectSheet(styles)(PageFooter));