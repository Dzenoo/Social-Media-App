"use client";
import { Button, Card, FormControl, TextField } from "@mui/material";
import classes from "../../css/NewPost.module.css";
import { useState } from "react";
import { useValidation } from "@/hooks/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";

const PostForm = () => {
  const [postValues, setpostValues] = useState({
    location: "",
    hashtags: "",
    image: "",
    description: "",
  });
  const locationVal = useValidation([VALIDATOR_REQUIRE()]);
  const hashtagsVal = useValidation([VALIDATOR_REQUIRE()]);
  const imageVal = useValidation([VALIDATOR_REQUIRE()]);
  const descriptionVal = useValidation([VALIDATOR_REQUIRE()]);

  const handleInputChange = (event, onChangeHandler) => {
    const { id, value } = event.target;
    setpostValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    onChangeHandler(event);
  };

  console.log(postValues);

  return (
    <form>
      <Card className={classes.post_form}>
        <FormControl>
          <label htmlFor="location">Location</label>
          <TextField
            id="location"
            label="Location"
            value={locationVal.value}
            onChange={(event) =>
              handleInputChange(event, locationVal.onChangeHandler)
            }
            error={!locationVal.isValid && locationVal.isTouched}
            onBlur={locationVal.onBlurHandler}
            helperText={
              !locationVal.isValid &&
              locationVal.isTouched &&
              "Enter valid location"
            }
          />
        </FormControl>
        <FormControl>
          <label htmlFor="hashtags">Hashtags</label>
          <TextField
            id="hashtags"
            label="Hashtags"
            value={hashtagsVal.value}
            onChange={(event) =>
              handleInputChange(event, hashtagsVal.onChangeHandler)
            }
            error={!hashtagsVal.isValid && hashtagsVal.isTouched}
            onBlur={hashtagsVal.onBlurHandler}
            helperText={
              !hashtagsVal.isValid &&
              hashtagsVal.isTouched &&
              "Enter valid hashtags"
            }
          />
        </FormControl>
        <FormControl>
          <label htmlFor="image">Image</label>
          <TextField
            id="image"
            type="file"
            value={imageVal.value}
            onChange={(event) =>
              handleInputChange(event, imageVal.onChangeHandler)
            }
            error={!imageVal.isValid && imageVal.isTouched}
            onBlur={imageVal.onBlurHandler}
            helperText={
              !imageVal.isValid && imageVal.isTouched && "Enter valid image"
            }
          />
        </FormControl>
        <FormControl>
          <label htmlFor="description">Description</label>
          <TextField
            id="description"
            label="Description"
            multiline
            value={descriptionVal.value}
            onChange={(event) =>
              handleInputChange(event, descriptionVal.onChangeHandler)
            }
            error={!descriptionVal.isValid && descriptionVal.isTouched}
            onBlur={descriptionVal.onBlurHandler}
            helperText={
              !descriptionVal.isValid &&
              descriptionVal.isTouched &&
              "Enter valid description"
            }
          />
        </FormControl>
        <Button type="submit" variant="contained" size="large">
          Post
        </Button>
      </Card>
    </form>
  );
};

export default PostForm;
