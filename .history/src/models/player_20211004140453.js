const { pg } = require('pg');

function Player(firstName, lastName, playerId, age, jersey, photo, avgPosAge, avgLeagueAge) { // Accept firstName and age in the constructor
  this.firstName = firstName || null;
  this.lastName = lastName || null;
  this.age = age || null;
  this.playerId = id || null;
  this.jersey = jersey;
  this.photo = photo,
//   this.avgPosAge = avgPosAge,
//   this.avgLeagueAge = avgLeagueAge;// ,
}

Player.prototype.getAge = function () {
  return this.age;
};

Player.prototype.setAge = function (age) {
  this.age = age;
};

Player.prototype.getFirstName = function () {
  return this.firstName;
};

Player.prototype.setFirstName = function (firstName) {
  this.firstName = firstName;
};

Player.prototype.getLastName = function () {
  return this.lastName;
};

Player.prototype.setLastName = function (lastName) {
  this.lastName = lastName;
};

Player.prototype.equals = function (otherPlayer) {
  return otherPlayer.getName() == this.getName()
        && otherPlayer.getAge() == this.getAge();
};

Player.prototype.fill = function (newFields) {
  for (const field in newFields) {
    if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
      if (this[field] !== 'undefined') {
        this[field] = newFields[field];
      }
    }
  }
};

module.exports = Player; // Export the Player function as it is
