import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    orderForm: {
      name: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        type: 'input',
        config: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        type: 'input',
        config: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      },
      deliveryMethod: {
        type: 'select',
        config: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for(let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        console.log(response);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  inputChangedHandler = (event, inputId) => {
    const formData = {
      ...this.state.orderForm
    };
    const element = {
      ...formData[inputId]
    };
    element.value = event.target.value;
    formData[inputId] = element;
    this.setState({ orderForm: formData });
  };

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        ...this.state.orderForm[key],
        id: key
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => (
          <Input
            key={formElement.id}
            type={formElement.type}
            config={formElement.config}
            value={formElement.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button type='Success' clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
