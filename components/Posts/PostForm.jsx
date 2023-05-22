"use client";
import { Button, Card, FormControl, TextField } from "@mui/material";
import classes from "../../css/NewPost.module.css";

const PostForm = () => {
  return (
    <form>
      <Card className={classes.post_form}>
        <FormControl>
          <label htmlFor="location">Location</label>
          <TextField id="location" label="Location" />
        </FormControl>
        <FormControl>
          <label htmlFor="hashtags">Hashtags</label>
          <TextField id="hashtags" label="Hashtags" />
        </FormControl>
        <FormControl>
          <label htmlFor="image">Image</label>
          <TextField id="image" type="file" />
        </FormControl>
        <FormControl>
          <label htmlFor="description">Description</label>
          <TextField id="description" label="Description" multiline />
        </FormControl>
        <Button type="submit" variant="contained" size="large">
          Post
        </Button>
      </Card>
    </form>
  );
};

export default PostForm;
