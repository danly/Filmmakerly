# Filmmakerly

### Master Your Craft
##### Improve Your Skills With Monthly Filmmkaing Challenges
###Purpose

The purpose of this project is to help filmmakers of all abilities get better at the art of filmmaking by creating monthly challenges that they can choose to do that are competitive and fun. 

The app provides a place for users to setup a basic profile and choose a challenge from a list. The challenges include a thumbnail image, description, due date, and tags such as a category and recommended skill level. 

Users complete the challenge by the due date, upload the completed challenge to Vimeo (for now), and then submit a link for review.

###How It Works

First, sign-up for a free account. The sign-up requires an email and password.

Once you sign-up, you'll be taken to a profile page. The profile page will populate a profile picture based on the Gravatar image linked to the email address you used to register. If you don't have a Gravatar image, there is a link to add one on the page.

The profile page also includes some basic personal information including your first and last name, city, state, country, and a short bio. There is also a place on the profile page that dislays a "Current Challenge" and a Submit Link for submitting the URL to the completed challenge on Vimeo.

To view the challenges, select the available "Challenges" link. This will take you to the Challenges page. Each challenge includes an image, title, description, due date, category, and skill level tags.

Select the "I accept this challenge!" button to accept the challenge and add it to your profile.

###Technology Used

The app is built using Node.js, Express, and MongoDB. Other modules include: 

* Body-Parser for form submission
* Bcrypt for password salting and hashing
* Express-Session for managing sessions
* MD5 for hashing the email address sent to Gravatar to pull the user's image on the profile page
* Underscore for templating
* Mongoose for models


###Known Bugs

Users must select a challenge before their profile pages will save. Challenges are entered with an ID, instead of the challenge title.

###Future Updates

Future updates will include:

* Email confirmation for sign-up
* Remember Me button on login
* Facebook login
* User-created challenges
* User ranking of challenges (vote up)
* Filtering of challenges based on categories and skill levels
* User voting of submitted challenges
* User profile includes challenge history, awards, and prizes 
* User able to follow other members
* Stripe API integration for premium memberships
* Account history
* Ecommerce store to buy Filmmakerly branded apparel (t-shirts, hats)

###View Site


[www.filmmakerly.com](http://www.filmmakerly.com)


<small>Copyright © 2015 Stephen Eyer. All Rights Reserved.




