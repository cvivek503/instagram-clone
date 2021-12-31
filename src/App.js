import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import ImageUpload from "./ImageUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 5,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signup_input"
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup_input"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup_input"
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
          {/*<Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>*/}
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup_input"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup_input"
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
          {/*<Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>*/}
        </Box>
      </Modal>
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="app__headerImage"
        />
        {user ? (
          <div className="app__logoutContainer">
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>

            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        {posts.map(({ id, post }) => {
          return (
            <Post
              key={id}
              postId={id}
              caption={post.caption}
              imageUrl={post.imageUrl}
              username={post.username}
              user={user}
            />
          );
        })}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h2>Login to share pics with the world !</h2>
      )}
    </div>
  );
}

export default App;
