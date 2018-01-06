import React from "react";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { getArticlesWithContributors } from "../../selectors";
import Byline from "../Byline";
import Dateline from "../Dateline";
import Outquote from "../Outquote";

// TODO: ADD OUTQUOTES

const styles = {
  RightColumn: {
    borderLeft: "solid 1px #ddd",
    paddingLeft: "14px !important",
    paddingRight: 0,
    "& > div": {
      paddingBottom: "14px",
    },
  },
  issuuEmbed: {
    borderBottom: "1px solid #ddd",
    marginBottom: "10px",
    paddingBottom: "10px !important",
  },
  figure: {
    margin: "0 0 12px 0",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontWeight: 300,
    fontSize: "12px",
    marginBottom: "4px",
    textTransform: "uppercase",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  primaryArticle: {
    borderBottom: "1px solid #ddd",
    marginBottom: "14px",
  },
  summary: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    marginBottom: "10px",
  },
  articleTitle: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: 1.22,
    marginBottom: "1px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: "0 0 12px 0",
    padding: "4px 0",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  spotifyEmbed: {
    border: 0,
    height: 340,
    width: "100%",
  },
  "@media (max-width: 768px)": {
    RightColumn: {
      borderLeft: "none",
      paddingLeft: "0 !important",
    },
  },
};

const RightColumn = ({ classes }) => {
  return <Col xs={12} sm={3} md={3} lg={3} className={classes.RightColumn} />;
  let availableArticles = [];
  Object.values(articles)
    .slice(9)
    .find(article => {
      if (availableArticles.length >= 2) {
        return true;
      }
      if (
        !Object.values(outquotes).find(
          outquote => outquote.articleId === article.id,
        )
      ) {
        availableArticles.push(article);
      }
    });
  const [primaryArticle, secondaryArticle] = availableArticles;
  return (
    <Col xs={12} sm={3} md={3} lg={3} className={classes.RightColumn}>
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<iframe style="width:100%; height:309px;" src="//e.issuu.com/embed.html#9521608/55321841" frameborder="0" allowfullscreen></iframe>',
        }}
        className={classes.issuuEmbed}
      />
      {primaryArticle && (
        <div className={classes.primaryArticle}>
          <Link
            to={sections[primaryArticle.sectionId].permalink}
            className={classes.sectionLabel}
          >
            {sections[primaryArticle.sectionId].name}
          </Link>
          <Link
            to={`${sections[primaryArticle.sectionId]
              .permalink}/${primaryArticle.slug}`}
            className={classes.articleTitle}
          >
            {primaryArticle.title}
          </Link>
          {/*primaryArticle.outquotes.length > 0 && (
            <Outquote quote={primaryArticle.outquotes[0]} />
          )*/}
          <p className={classes.summary}>{primaryArticle.summary}</p>
          <Byline contributors={primaryArticle.contributors} />
          <Dateline timestamp={primaryArticle.createdAt} />
        </div>
      )}

      {secondaryArticle && (
        <div className={classes.secondaryArticle}>
          <Link
            to={sections[secondaryArticle.sectionId].permalink}
            className={classes.sectionLabel}
          >
            {sections[secondaryArticle.sectionId].name}
          </Link>
          <Link
            to={`${sections[secondaryArticle.sectionId]
              .permalink}/${secondaryArticle.slug}`}
            className={classes.articleTitle}
          >
            {secondaryArticle.title}
          </Link>
          <p className={classes.summary}>{secondaryArticle.summary}</p>
          <Byline contributors={secondaryArticle.contributors} />
          <Dateline timestamp={secondaryArticle.createdAt} />
        </div>
      )}

      <Link to="/" className={classes.label}>
        SING! 2017 Senior Playlist
      </Link>
      <iframe
        className={classes.spotifyEmbed}
        src="https://open.spotify.com/embed/user/spec.ae/playlist/4FrJhYPbWrWF3fYkzGZPy1"
        frameBorder="0"
        allowTransparency="true"
      />
    </Col>
  );
};

export default injectSheet(styles)(RightColumn);
