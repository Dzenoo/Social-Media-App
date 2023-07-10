"use client";
import Modal from "@mui/material/Modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { ModalProps } from "@/types/modal";
import { PostProps } from "@/types/posts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 12,
  p: 4,
};

const Modale: React.FC<ModalProps> = ({
  isOpen,
  close,
  text,
  title,
  id,
  onCloseModal,
  posts,
  setPosts,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const deletePost = async () => {
    setisLoading(true);
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const filteredPosts = posts.filter(
        (p: PostProps) => p._id !== id
      ) as PostProps[];
      toast.success("Post deleted!");
      setPosts(filteredPosts as []);
      setisLoading(false);
      onCloseModal();
    } else {
      toast.error("Post deleting failed");
      console.log(response);
    }
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="textSecondary"
          >
            {text}
          </Typography>
          <Box sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#E41818" }}
              onClick={deletePost}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Modale;
