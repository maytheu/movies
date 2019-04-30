import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import AdminLayout from "../hoc/AdminLayout";
import { adminVote } from "../../actions/movieActions";

class Votes extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.dispatch(adminVote()).then(response => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const style = { fontSize: "1rem", fontWeight: "800" };
    return (
      <AdminLayout>
        <Paper>
          <Table className="centered">
            <TableHead>
              <TableRow>
                <TableCell style={style}>Movie</TableCell>
                <TableCell style={style}>Link</TableCell>
                <TableCell style={style}>Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.isLoading ? (
                <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
              ) : this.props.isMovies.shows ? (
                this.props.isMovies.shows.map(show => (
                  <TableRow key={show._id}>
                    <TableCell>{show.title}</TableCell>
                    <TableCell>{show.videoLink}</TableCell>
                    <TableCell>{show.vote}</TableCell>
                  </TableRow>
                ))
              ) : (
                ""
              )}
            </TableBody>
          </Table>
        </Paper>
      </AdminLayout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isMovies: state.movie
  };
}

export default connect(mapStateToProps)(Votes);
