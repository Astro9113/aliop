import User from '../models/user';

export default function signup(req) {
  let { username, password } = req.body;
  let user = {
    username,
    password
  }
  return new Promise((resolve, reject) => {
    new User(user)
        .save((err, res) => {
          if (err) reject(err);
          req.session.user = user;
          resolve({user: {username: user.username}});
        })
  })
}
