"use client";
import { Button, Card, FormControl, TextField } from "@mui/material";
import classes from "../../css/NewPost.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useValidation } from "@/hooks/useValidation";
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { PostForm } from "@/types/posts";

const PostForm: React.FC<PostForm> = ({ onSubmitPost }) => {
  const [postValues, setpostValues] = useState({
    location: "",
    hashtags: "",
    description: "",
  });
  const [imageVal, setimageVal] = useState("");
  const locationVal = useValidation([VALIDATOR_REQUIRE()]);
  const hashtagsVal = useValidation([VALIDATOR_REQUIRE()]);
  const descriptionVal = useValidation([VALIDATOR_REQUIRE()]);
  const user = JSON.parse(localStorage.getItem("userinfo"));

  const handleInputChange = (
    event: ChangeEvent<any>,
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { id, value } = event.target;
    setpostValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    onChangeHandler(event);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageUrl = fileReader.result as string;
        setimageVal(imageUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  let formIsValid = false;
  if (locationVal.isValid && hashtagsVal.isValid && descriptionVal.isValid) {
    formIsValid = true;
  }

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      location: postValues.location,
      hashtags: postValues.hashtags,
      description: postValues.description,
      image: imageVal,
      userId: user.userId,
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
        <Button
          disabled={!formIsValid}
          type="submit"
          variant="contained"
          size="large"
        >
          Post
        </Button>
      </Card>
    </form>
  );
};

export default PostForm;
