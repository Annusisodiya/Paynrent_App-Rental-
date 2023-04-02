import { Grid } from "@mui/material";
import { useStyles } from "./ProductCss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, IconButton, Avatar, Button } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState, useEffect } from "react";
import { getData, postData } from "./services/ServerServices";
import Swal from "sweetalert2";

export default function ListProduct() {
  var classes = useStyles();
  const [image, setImage] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [productId, setProductId] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");

  const fetchAllCategoryId = async () => {
    var result = await getData("product/fetch_all_categoryid");
    setCategoryIds(result.data);
  };

  const fillCategoryId = () => {
    return categoryIds.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryid}</MenuItem>;
    });
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
    fetchAllProductId(event.target.value);
  };

  const fetchAllProductId = async (categoryid) => {
    var body = { categoryid: categoryid };
    var result = await postData("listproduct/fetch_all_productid", body);
    setProductIds(result.data);
  };

  const fillProductId = () => {
    return productIds.map((item) => {
      return <MenuItem value={item.productid}>{item.productid}</MenuItem>;
    });
  };

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleImage = (event) => {
    setImage({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  useEffect(function () {
    fetchAllCategoryId();
  }, []);

  const clearValue = () => {
    setCategoryId("");
    setImage({ fileName: "/assets/watermark.png", bytes: "" });
    setDescription("");
    setOfferPrice("");
    setProductId("");
    setWeight("");
    setPrice("");
  };

  const handleClick = async () => {
    var cd = new Date();
    var dd =
      cd.getFullYear() +
      "/" +
      (cd.getMonth() + 1) +
      "/" +
      cd.getDate() +
      " " +
      cd.getHours() +
      ":" +
      cd.getMinutes() +
      ":" +
      cd.getSeconds();
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("productid", productId);
    formData.append("weight", weight);
    formData.append("price", price);
    formData.append("offerprice", offerPrice);
    formData.append("description", description);
    formData.append("images", image.bytes);
    formData.append("createdat", dd);
    formData.append("updatedat", dd);
    formData.append("createdby", "ADMIN");

    var result = await postData("listproduct/add_new_listproduct", formData);
    if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
        });
      }
      clearValue();
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.rowStyle}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <img src="/assets/logo.png" width="40" />
              </div>
              <div className={classes.headingStyle}>List Product</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Category Id"
                onChange={handleCategoryIdChange}
              >
                <MenuItem>Choose CategoryId..</MenuItem>
                {fillCategoryId()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                label="Category Id"
                onChange={handleProductIdChange}
              >
                <MenuItem>Choose Product..</MenuItem>
                {fillProductId()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              //error={!error.companyName ? false : true}
              //helperText={error.companyName}
              //onFocus={() => handleError("companyName", null)}
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              fullWidth
              label="Weight"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              //error={!error.companyName ? false : true}
              //helperText={error.companyName}
              //onFocus={() => handleError("companyName", null)}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              fullWidth
              label="Price"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              //error={!error.companyName ? false : true}
              //helperText={error.companyName}
              //onFocus={() => handleError("companyName", null)}
              value={offerPrice}
              onChange={(event) => setOfferPrice(event.target.value)}
              fullWidth
              label="Offer Price"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              //error={!error.companyName ? false : true}
              //helperText={error.companyName}
              //onFocus={() => handleError("companyName", null)}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              label="Description"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} className={classes.rowStyle}>
            <IconButton
              fullWidth
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
              <PhotoCamera />
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={image.fileName}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Button onClick={handleClick} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={clearValue} fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
