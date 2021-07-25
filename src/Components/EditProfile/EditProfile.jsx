import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router";

function EditProfile() {
  const [info] = useStateValue();
  const [user, setUser] = useState({
    uid: info.user.uid,
    email: info.user.email,
  });
  const [editDone, setEditDone] = useState(false);
  const history = useHistory();

  useEffect(() => {
    db.collection("users")
      .get()
      .then((data) =>
        data.docs.map((doc) => {
          if (doc.data().uid === user.uid)
            setUser((u) => ({ ...u, ...doc.data(), id: doc.id }));
        })
      );
  }, []);

  const handleBioChange = (e) => {
    setUser((u) => ({ ...u, bio: e.target.value }));
  };

  const handleAvatarChange = () => {
    let url = prompt("Enter URL");
    console.log(user.avatarUrl);
    setUser((u) => ({ ...u, avatarUrl: url }));
  };

  const handleProfileChange = (e) => {
    db.collection("users")
      .doc(user.id)
      .update({ bio: user.bio, avatarUrl: user.avatarUrl });

    setEditDone(true);

    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <div className="editProfile">
      <div className="editProfile__Container">
        {editDone ? (
          <h2 className="editProfile__h2">Profile Updated!!</h2>
        ) : (
          <>
            <div className="editProfile__innerContainer">
              <div className="editProfile__ImgContainer">
                <input
                  type="image"
                  src={user.avatarUrl}
                  alt="avt-img"
                  className="editProfile__avtImg"
                  onClick={handleAvatarChange}
                />
              </div>
              <p>sanctum007</p>
            </div>
            <input
              type="text"
              placeholder="Enter Your Bio..."
              className="editProfile__bio"
              value={user.bio}
              onChange={handleBioChange}
            />
            <button
              className="editProfile__updateBtn"
              onClick={handleProfileChange}
            >
              Update Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
