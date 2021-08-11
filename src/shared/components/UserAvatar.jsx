import { Avatar } from "@material-ui/core";

const UserAvatar = ({ src, size }) => {
  return (
    <Avatar
      style={{
        background: "#4343a7",
        width: size,
        height: size,
        border: "1px solid #e2e2e2",
      }}
      src={src}
    />
  );
};

export default UserAvatar;
