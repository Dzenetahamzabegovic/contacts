// User.js

class User {
  constructor(title, firstName, lastName, age, email, picture) {
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.picture = picture;
  }
  isPresent() {
    return this.present;
  }
}
export default User;
