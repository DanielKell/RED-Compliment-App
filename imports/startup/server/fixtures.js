import { Meteor } from "meteor/meteor";
import { Posts } from "../../api/posts/posts";
import { Quotes } from "../../api/quotes/quotes";
import { Suggestions } from "../../api/suggestions/suggestions";
import { Badges } from "../../api/badges/badges";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(() => {
  // START UP CODE HERE
  let user = {};

  if (Meteor.users.find().count() === 0) {
    (user = Accounts.createUser({
      email: "admin@123.com",
      password: "pass",
      profile: {
        firstName: "Andrew",
        lastName: "Gonzalous",
        email: "abc@abc.com",
        photo:
          "https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb"
      }
    })),
      Accounts.createUser({
        email: "abc@123.com",
        password: "password",
        profile: {
          firstName: "Alicia",
          lastName: "White",
          email: "abc@abc.com",
          photo:
            "https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb"
        }
      });
  } else {
    user = `${Meteor.users.findOne()._id}`;
  }

  if (Posts.find().count() === 0) {
    const dateArr = [];
    const tzOffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
    const localTime = `${new Date(Date.now() - tzOffset)
      .toUTCString()
      .slice(5, -13)
      .split(" ")
      .forEach(elem => dateArr.push(elem))}`;

    const formattedDate = `${dateArr[1]} ${dateArr[0]} ${dateArr[2]}`;

    Posts.insert({
      to: Meteor.users.findOne(),
      from: Meteor.users.findOne({}, { skip: 1 }),
      body: "This is a beautiful world...",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne({}, { skip: 1 }),
      from: Meteor.users.findOne(),
      body: "Nice haircut!",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne(),
      from: Meteor.users.findOne({}, { skip: 1 }),
      body: "Nice face!!",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne({}, { skip: 1 }),
      from: Meteor.users.findOne(),
      body: "That shirt of yours is so cool!",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne(),
      from: Meteor.users.findOne({}, { skip: 1 }),
      body: "Always like talking to you!",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne({}, { skip: 1 }),
      from: Meteor.users.findOne(),
      body: "Always a pleasure chillin",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
    Posts.insert({
      to: Meteor.users.findOne(),
      from: Meteor.users.findOne({}, { skip: 1 }),
      body: "How are you so good at beer pong?!",
      upvotes: [],
      sarcasm: [],
      dateCreated: formattedDate
    });
  }

  Meteor.publish("users", function usersPublication() {
    return Meteor.users.find();
  });

  if (Suggestions.find().count() === 0) {
    Suggestions.insert({
      suggestion: "Your beer pong skills are insane"
    });
    Suggestions.insert({
      suggestion: "That project looked so professional"
    });
    Suggestions.insert({
      suggestion: "Your lunch always looks delicious"
    });
    Suggestions.insert({
      suggestion: "I love your dog Betsy!"
    });
  }

  if (Quotes.find().count() === 0) {
    Quotes.insert({
      quote: "shamwowowowowowowowo"
    });
    Quotes.insert({
      quote: "yesyesyes"
    });
    Quotes.insert({
      quote: "and and and"
    });
    Quotes.insert({
      quote: "💩 💩 💩 💩"
    });
  }
});
