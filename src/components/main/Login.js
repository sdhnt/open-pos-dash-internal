import React, { useState } from 'react';
import {
  makeStyles,
  Container,
  Typography,
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button
} from '@material-ui/core';
import { Email, VpnKey } from '@material-ui/icons';
import { FirebaseDB as db } from '../../constants/firebase';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundImage: 'linear-gradient(#301924,#000000)',
    height: '100vh',
    padding: '2vh 2vw',
    textAlign: 'center'
  },
  header: {
    marginTop: '13vh'
  },
  headerText: {
    fontFamily: 'Megrim',
    color: theme.palette.secondary.main
  },
  form: {
    marginTop: '5vh',
    maxWidth: '500px'
  },
  icon: {
    color: 'white'
  },
  input: {
    color: 'white'
  },
  underline: {
    borderBottom: '1px solid white'
  },
  button: {
    marginTop: '2vh',
    color: 'white'
  }
}));

const Login = props => {
  const { auth } = props;
  const classes = useStyles();
  const [form, setForm] = useState({ email: '', password: '' });
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const handleChange = e => {
    form[e.target.id] = e.target.value;
    setForm(form);
  };

  const handleSubmit = async () => {
    if (form.email === '' || form.password === '') {
      alert('incomplete form');
    } else {
      await db
        .collection('admins')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data();
            const emailMatch = data.email === form.email;
            const passwordMatch = data.password === form.password;
            const authMatch = emailMatch && passwordMatch;
            if (!authMatch) {
              alert('incorrect email and password');
            } else {
              auth.authenticate(() => {
                history.replace(from);
              });
            }
          });
        });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Typography variant="h2">
          <span className={classes.headerText}>OPEN</span>
        </Typography>
        <Typography variant="h4">
          <span className={classes.headerText}>Admin</span>
        </Typography>
      </div>
      <Container className={classes.form}>
        <FormGroup>
          <FormControl required>
            <InputLabel>
              <Email className={classes.icon} />
            </InputLabel>
            <Input
              className={classes.input}
              classes={{ underline: classes.underline }}
              onChange={handleChange}
              id="email"
              type="string"
              placeholder="email"
            />
          </FormControl>
          <FormControl required>
            <InputLabel>
              <VpnKey className={classes.icon} />
            </InputLabel>
            <Input
              className={classes.input}
              classes={{ underline: classes.underline }}
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="password"
            />
          </FormControl>
          <Button
            className={classes.button}
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </FormGroup>
      </Container>
    </div>
  );
};

export default Login;
