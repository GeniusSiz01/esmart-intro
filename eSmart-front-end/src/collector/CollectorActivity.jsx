import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import binLogo from "../esmartbin.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CollectorAuth from "../utils/CollectorAuth";
import NotificationSnackBar from "../components/NotificationSnackBar";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default class CollectorActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bins: [],
      userId: CollectorAuth.getClientId(),
      open: false,
      binName: "",
      donorName: "",
      binTypes: [],
      donorId: 0,
      viewRequests: false
    };
  }

  async componentDidMount() {
    await this.refresh();
  }

  async componentWillUnmount() {
    clearTimeout(this.timer2);
    clearTimeout(this.timer1);
  }

  refresh = async () => {
    let params = { id: this.state.userId };
    this.timer2 = setTimeout(async () => {
      await axios.post(`/bins/full`, params).then(async response => {
        let data = response.data;
        if (data.isEmpty) {
          this.timer1 = setInterval(await this.refresh(), 1000);
        } else {
          clearTimeout(this.timer2);
          clearTimeout(this.timer1);
          this.setState({ bins: data.readyBins, userId: response.data.collector.id, viewRequests: true });
        }
      });
    }, 1000)
  }


  handleClickOpen = e => {
    let { bins } = this.state;
    this.setState({ open: true });
    let donorId = Number(e.currentTarget.id);
    bins.forEach(donors => {
      if (donors.id === donorId) {
        let params = {
          donorId
        };
        axios.post("/accept/request", params).then(response => {
          this.setState({
            binTypes: response.data.bins,
            donorId: response.data.bins[0].waste_donor_id
          });
        });
        this.setState({
          donorName: `${donors.firstname + " " + donors.lastname}`
        });
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAccept = () => {
    let { binTypes, userId, donorId } = this.state;
    this.setState({ open: false });
    let params = {
      donorId: donorId,
      collectorId: userId,
      binTypeId: binTypes
    };
    axios.post("/collect", params);
  };

  renderModal = () => {
    let { binTypes, donorName } = this.state;
    return (
      <div>
        <Dialog
          fullScreen={this.state.fullScreen}
          open={this.state.open}
          onClose={this.handleAccept}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Accept request?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>{donorName}</strong> Has the following bins
              <Grid item xs={12} md={6}>
                <Demo>
                  <List dense={true}>
                    {binTypes.map(list =>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={binLogo} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${list.name} waste`}
                          secondary={"Secondary text"}
                        />
                      </ListItem>
                    )}
                  </List>
                </Demo>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAccept}>close</Button>
            <NotificationSnackBar open={true} />
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    let { viewRequests, bins } = this.state;
    return (
      <div>
        <h3 className="center">Bins available for pick-up</h3>
        {viewRequests ? (
          <>
            {bins.map(list =>
              <List key={list.id} className="center" sx={{
                width: '95%', bgcolor: 'rgba(82, 183, 136, 0.74)', borderRadius: '12px', margin: '12px'
              }}>
                <div id={list.id} onClick={this.handleClickOpen}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={list.firstname}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${list.firstname + " " + list.lastname}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ready for collection
                          </Typography>
                          {
                            " — This bin is full and is ready for pick-up. Select to accept request"
                          }
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress color="info" />
                  </Box>
                </div>
              </List>
            )}
          </>
        ) : (
          <h5 className="center">No bins available for collection</h5>
        )}
        {this.renderModal()}
      </div>
    );
  }
}
