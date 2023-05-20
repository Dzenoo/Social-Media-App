"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

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

const Modale = ({ isOpen, close }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontWeight="bold"
            color="red"
          >
            Delete Post Confirmation
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="textSecondary"
          >
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
          <Box sx={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#E41818" }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Modale;
