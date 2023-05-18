"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import classes from "../../../css/Posts.module.css";
import Image from "next/image";

const Posts = () => {
  return (
    <section className={classes.main_dashboard}>
      <div className={classes.filter_bar}>
        <Typography variant="h5" fontWeight="bold" sx={{ padding: "20px" }}>
          Posts
        </Typography>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel>FIlter</InputLabel>
          <Select placeholder="Filter">
            <MenuItem>Hashtags</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "200px" }}>
          <TextField label="Search" />
        </FormControl>
        <FormControl>
          <Button
            variant="contained"
            size="large"
            sx={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            Create new post
            <Image src="/images/add.png" width={30} height={30} />
          </Button>
        </FormControl>
      </div>
    </section>
  );
};

export default Posts;
