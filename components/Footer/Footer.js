/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Link from "next/link"
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/footerStyle.js";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link href="/web">
              <a className={classes.block}>
                Home
              </a>
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link href="/privacy">
              <a className={classes.block}>
                Privacy Policy
              </a>
              </Link>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="#"
              target="_blank"
              className={classes.a}
            >
             UbycoHub
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
