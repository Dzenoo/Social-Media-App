"use client";
import { Button, Card, FormControl, TextField } from "@mui/material";
import classes from "../../css/NewPost.module.css";
import { useState } from "react";
import { useValidation } from "@/hooks/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";

const PostForm = ({ onSubmitPost }) => {
  const [postValues, setpostValues] = useState({
    location: "",
    hashtags: "",
    description: "",
  });
  const [imageVal, setimageVal] = useState("");
  const locationVal = useValidation([VALIDATOR_REQUIRE()]);
  const hashtagsVal = useValidation([VALIDATOR_REQUIRE()]);
  const descriptionVal = useValidation([VALIDATOR_REQUIRE()]);

  const handleInputChange = (event, onChangeHandler) => {
    const { id, value } = event.target;
    setpostValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    onChangeHandler(event);
  };

  const handleImageChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageUrl = fileReader.result;
      setimageVal(imageUrl);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const data = {
      location: postValues.location,
      hashtags: postValues.location,
      description: postValues.location,
      image: imageVal,
    };

    onSubmitPost(data);
  };

  return (
    <form onSubmit={submitFormHandler}>
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
          <input
            id="image"
            accept="image/*"
            type="file"
            onChange={handleImageChange}
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
