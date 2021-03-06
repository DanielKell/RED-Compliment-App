import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import {
  Paper,
  Toggle,
  SelectField,
  MenuItem,
  CircularProgress
} from "material-ui";

import { Posts } from "../../../api/posts/posts";
import { Suggestions } from "../../../api/suggestions/suggestions";
import { Badges } from "../../../api/badges/badges";
import RecentList from "../../components/RecentCompliments/RecentList/";
import RecentListItem from "../../components/RecentCompliments/RecentListItems/";
import PostItem from "../../components/Posts/PostItem/";
import ShareForm from "../../components/Share/ShareForm";

import "./styles";

class PostsContainer extends Component {
  state = {
    shareIsExpanded: false,
    toValue: "",
    bodyValue: "",
    value: 1,
    filterItems: ["Most Recent", "Most Popular", "Most Sarcasm"],
    anon: false
  };

  filteredPosts = (posts, value) => {
    switch (value) {
      case 1: // most recent
        const dateSortArr = posts.sort((post1, post2) => {
          return -(post2.sortDate - post1.sortDate);
        });
        return dateSortArr.map(post => (
          <PostItem
            key={post._id}
            content={post.body}
            to={post.to}
            from={post.from}
            postID={post._id}
            postObj={post}
            anon={post.anon}
          />
        ));
        break;

      case 2: // sorted by upvotes
        const upvoteArr = posts.sort((post1, post2) => {
          return -(post2.upvotes.length - post1.upvotes.length);
        });

        return upvoteArr.map(post => (
          <PostItem
            key={post._id}
            content={post.body}
            to={post.to}
            from={post.from}
            postID={post._id}
            postObj={post}
            anon={post.anon}
          />
        ));
        break;

      case 3: // sort by sarcasm
        const sarcasmArr = posts.sort((post1, post2) => {
          return -(post2.sarcasm.length - post1.sarcasm.length);
        });

        return sarcasmArr.map(post => (
          <PostItem
            key={post._id}
            content={post.body}
            to={post.to}
            from={post.from}
            postID={post._id}
            postObj={post}
            anon={post.anon}
          />
        ));
        break;

      default:
        break;
    }
  };

  handleFilterChange = (event, index, value) => this.setState({ value });

  handleToChange = (event, index, toValue) =>
    this.setState({ toValue: event.target.value });

  handleBodyChange = (event, index, bodyValue) =>
    this.setState({ bodyValue: event.target.value });

  handleToggle = e => {
    this.setState({ anon: !this.state.anon });
  };

  getRecentCompliments = () => {
    const { currentUser, posts } = this.props;
    const itemsContainer = [];

    // Sort posts by date
    const dateSortArr = posts.sort((post1, post2) => {
      return -(post2.sortDate - post1.sortDate);
    });

    const filteredPosts = currentUser
      ? dateSortArr.filter(post => post.to._id === currentUser._id)
      : null;

    if (!currentUser) return;

    for (let i = 1; i <= 3; i++) {
      if (
        filteredPosts[filteredPosts.length - i] !== undefined ||
        filteredPosts[filteredPosts.length - i] !== null
      ) {
        itemsContainer.push(filteredPosts[filteredPosts.length - i]);
      }
    }

    return itemsContainer;
  };

  showShareForm = e => {
    const { shareIsExpanded } = this.state;

    shareIsExpanded
      ? this.setState({
          shareIsExpanded: false
        })
      : this.setState({
          shareIsExpanded: true
        });
  };

  addCompliment = e => {
    e.preventDefault();
    let to = e.target.shareTo.value;
    let body = e.target.shareBody.value;
    let from = this.props.currentUser;
    let anon = this.state.anon;

    let user = Meteor.call(
      "posts.addCompliment",
      to,
      body,
      from,
      anon,
      this.props.users
    );

    this.setState({
      toValue: "",
      bodyValue: "",
      shareIsExpanded: false
    });
  };

  render() {
    const { users, posts, suggestions } = this.props;
    const { shareIsExpanded, toValue, bodyValue, value } = this.state;

    if (posts.length > 0 && users.length > 0) {
      return (
        <div className="post-wrapper">
          <div className="recent-container">
            <Paper className="posts-paper" zDepth={1} rounded={false}>
              <h2 className="recent-subtitle">
                Your Recently Received Compliments
              </h2>
              <RecentList>
                {this.getRecentCompliments() !== undefined
                  ? this.getRecentCompliments().map(item => {
                      return item !== undefined ? (
                        <RecentListItem
                          key={Math.random()}
                          recentitem={`${item.body}`}
                        />
                      ) : null;
                    })
                  : null}
              </RecentList>
            </Paper>
          </div>
          <div className="filter-container">
            <SelectField
              value={this.state.value}
              onChange={this.handleFilterChange}
              floatingLabelText="Filter Compliments"
              floatingLabelStyle={{ color: "#ed4242" }}
              labelStyle={{ color: "white" }}
              selectedMenuItemStyle={{ color: "#ed4242" }}
            >
              {this.state.filterItems.map((item, index) => (
                <MenuItem
                  key={index + 1}
                  value={index + 1}
                  primaryText={item}
                />
              ))}
            </SelectField>
          </div>
          <div className="posts-container">
            {this.filteredPosts(posts, this.state.value)}
          </div>
          <ShareForm
            shareIsExpanded={shareIsExpanded}
            showShareForm={this.showShareForm}
            addCompliment={this.addCompliment}
            toValue={toValue}
            bodyValue={bodyValue}
            handleToChange={this.handleToChange}
            handleBodyChange={this.handleBodyChange}
            suggestionsList={suggestions["0"]}
            toggle={this.handleToggle}
          />
        </div>
      );
    }
    return (
      <div className="loading-container">
        <CircularProgress
          className="page-loader"
          color="#ed4242"
          size={80}
          thickness={5}
        />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
}

Posts.propTypes = {
  currentUser: PropTypes.object,
  posts: PropTypes.arrayOf(PropTypes.object),
  suggestions: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object)
};

export default withTracker(() => {
  Meteor.subscribe("posts");
  Meteor.subscribe("users");
  Meteor.subscribe("suggestions");

  return {
    currentUser: Meteor.user(),
    users: Meteor.users.find({}).fetch(),
    posts: Posts.find({}).fetch(),
    suggestions: Suggestions.find().fetch()
  };
})(PostsContainer);
