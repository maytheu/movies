import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import AdminLayout from "../hoc/AdminLayout";

class Votes extends Component {
  state = {
    isLoading: false
  };
  render() {
      const style = {fontSize: '1rem', fontWeight:'800'}
    return (
      <AdminLayout>
        <Paper>
          <Table className='centered'>
            <TableHead>
              <TableRow>
                <TableCell  style={style}>Movie</TableCell>
                <TableCell style={style}>Link</TableCell>
                <TableCell style={style}>Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.isLoading ? (
                <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
              ) : (
                <TableRow>
                  <TableCell>Avengers</TableCell>
                  <TableCell>hhtps://you.tu/fjgudjei</TableCell>
                  <TableCell>55</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </AdminLayout>
    );
  }
}

export default Votes;
