import React from "react";
import { connect } from "react-redux";
import { postImage, setImage } from "../../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Methods from "./Methods";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40vw",
    maxWidth: 430,
    minWidth: 240,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.lightBlue,
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  resetContainer: {
    padding: theme.spacing(3),
    color: theme.palette.common.lightBlue,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const getSteps = () => {
  return ["Select algorithm", "Upload your image or use one of ours"];
};

const getStepContent = (step, method, handleMethodChange, style, setStyle) => {
  switch (step) {
    case 0:
      return (
        <Methods method={method} handleMethodChange={handleMethodChange} />
      );
    case 1:
      return <ImageUpload method={method} style={style} setStyle={setStyle} />;
    default:
      return "Unknown step";
  }
};

const VerticalStepper = ({
  method,
  handleMethodChange,
  image,
  postImage,
  setImage,
}) => {
  const classes = useStyles();
  const [style, setStyle] = React.useState("wave");
  const [activeStep, setActiveStep] = React.useState(0);
  const [alert, setAlert] = React.useState(false);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePost = (image, method, style) => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // postImage(image, method, style);
    setTimeout(() => {
      setAlert(true);
    }, 500);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setImage(null);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      {alert && (
        <Alert severity="error">
          The back-end is not deployed! This feature is unavailable!
        </Alert>
      )}
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{
          backgroundColor: "#090F18",
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <font style={{ color: "#00E9F1", fontSize: "1rem" }}>
                {label}
              </font>
            </StepLabel>
            <StepContent>
              <Typography>
                {getStepContent(
                  index,
                  method,
                  handleMethodChange,
                  style,
                  setStyle
                )}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length
                        ? handlePost(image, method, style)
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Run Algorithm" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postImage: (imageUrl, method, style) =>
      dispatch(postImage(imageUrl, method, style)),
    setImage: (image) => dispatch(setImage(image)),
  };
};
const mapStateToProps = (state) => {
  return {
    image: state.image,
    returnedImage: state.returnedImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalStepper);
