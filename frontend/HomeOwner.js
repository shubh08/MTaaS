import React, { Component } from 'react';
import cookie from 'js-cookie';
import { Redirect } from 'react-router';
import '../../../App.css';
import { ownerActions } from '../../../redux/actions/owner.actions';
import { connect } from 'react-redux';

class HomeOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderStatus: "",
      buyerAddress: "",
      orderDate: "",
      orderDetails: [],
      buyerFirstName: "",
      buyerLastName: "",
      New: "active",
      Confirmed: "",
      Preparing: "",
      Ready: "",
      Cancelled: "",
      titleName: "New Orders",
      orderId: "",
      buyerId: "",
      messageBox: "",
      messageFlag: false
    }
    this.messageBoxChangeHandler = this.messageBoxChangeHandler.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({ orders: newProps.owner.orders })
  }
  componentDidMount() {
    this.props.fetchNewOrders();
  }
  messageBoxChangeHandler = (e) => {
    this.setState({
      messageBox: e.target.value
    });
  }
  statusChange = (e) => {
    let data = ""
    let orders = ""
    if (this.state.orderStatus == "New") {
      data = { status: "Confirmed", id: this.state.orderId }
      orders = this.newOrders
    } else if (this.state.orderStatus == "Confirmed") {
      data = { status: "Preparing", id: this.state.orderId }
      orders = this.confirmedOrders
    } else if (this.state.orderStatus == "Preparing") {
      data = { status: "Ready", id: this.state.orderId }
      orders = this.preparingOrders
    } else if (this.state.orderStatus == "Ready") {
      data = { status: "Delivered", id: this.state.orderId }
      orders = this.readyOrders
    }
    this.props.statusChangeOrder(data)
    this.modalClose();
    setTimeout(() => {
      orders()
    }, 50);


  }
  cancelledOrders = (e) => {
    this.props.fetchCancelledOrders()
    this.setState({ Confirmed: "", New: "", Preparing: "", Ready: "", Cancelled: "active", titleName: "Cancelled Orders" })

  }
  cancelOrder = (e) => {
    let data = { id: e.target.id }
    this.props.cancelOrders(data);
    this.modalClose();
    let orders = ""
    if (this.state.orderStatus == "New") {
      orders = this.newOrders
    } else if (this.state.orderStatus == "Confirmed") {
      orders = this.confirmedOrders
    } else if (this.state.orderStatus == "Preparing") {
      orders = this.preparingOrders
    } else if (this.state.orderStatus == "Ready") {
      orders = this.readyOrders
    }
    setTimeout(() => {
      orders();
    }, 50);


  }
  newOrders = (e) => {
    this.props.fetchNewOrders();
    this.setState({ Confirmed: "", New: "active", Preparing: "", Ready: "", Cancelled: "", titleName: "New Orders" })
  }
  confirmedOrders = (e) => {
    this.props.fetchConfirmedOrders();
    this.setState({ Confirmed: "active", New: "", Preparing: "", Ready: "", Cancelled: "", titleName: "Confirmed Orders" })
  }
  preparingOrders = (e) => {
    this.props.fetchPreparingOrders();
    this.setState({ Confirmed: "", New: "", Preparing: "active", Ready: "", Cancelled: "", titleName: "Preparing" })
  }
  readyOrders = (e) => {
    this.props.fetchReadyOrders();
    this.setState({ Confirmed: "", New: "", Preparing: "", Ready: "active", Cancelled: "", titleName: "Ready to go" })
  }
  trackOrder = (e) => {
    document.getElementById("TrackOrder").style.display = "block"
    let order = this.state.orders.filter((order) => {
      if (order._id == e.target.id) {
        return order
      }
    })
    this.setState({
      orderStatus: order[0].orderStatus,
      buyerFirstName: order[0].buyerFirstName,
      buyerLastName: order[0].buyerLastName,
      buyerAddress: order[0].buyerAddress,
      orderDate: order[0].orderDate,
      orderId: order[0]._id,
      orderDetails: JSON.parse(order[0].orderDetails)
    })

  }
  messageSendHandler = (e) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let CurrentDateTime = date + ' ' + time;
    let data = { senderId: sessionStorage.getItem("RestaurantID"), senderFirstName: sessionStorage.getItem("RestaurantName"), senderLastName: "", receiverId: this.state.buyerId, receiverFirstName: this.state.buyerFirstName, receiverLastName: this.state.buyerLastName, message: this.state.messageBox, orderDate: this.state.orderDate, messageDate: CurrentDateTime }
    if (this.state.messageBox.length) {
      this.props.sendMessage(data);
      this.setState({ successFlag: true })
      setTimeout(() => {
        document.getElementById("Message").style.display = "none";
        this.setState({ messageFlag: false, messageBox: "", successFlag: false })
      }, 1000);
    } else {
      this.setState({ messageFlag: true })
    }

  }
  sendMessage = (e) => {
    document.getElementById("Message").style.display = "block"
    let order = this.state.orders.filter((order) => {
      if (order._id == e.target.id) {
        return order
      }
    })
    this.setState({
      buyerFirstName: order[0].buyerFirstName,
      buyerLastName: order[0].buyerLastName,
      buyerAddress: order[0].buyerAddress,
      orderDate: order[0].orderDate,
      buyerId: order[0].buyerId,
    })

  }
  modalClose = () => {
    document.getElementById("TrackOrder").style.display = "None"
  }
  modalCloseMessage = () => {
    this.setState({ messageFlag: false, messageBox: "" })
    document.getElementById("Message").style.display = "None";
  }
  render() {

    let redirectVar = "";
    let cancelButton = "";
    let statusButton = "";
    let messageDisplay = ""
    if (this.state.messageFlag == true) {
      messageDisplay = (<ul class="li alert alert-danger">Message body is needed</ul>);
    }
    if (this.state.successFlag) {
      messageDisplay = (<ul class="li alert alert-success" style={{ textAlign: "center", paddingTop: '10px' }}>Message Sent !!!</ul>);
    }
    if (this.state.orderStatus != "Cancelled" && this.state.orderStatus != "Delivered") {
      cancelButton = (<div class="col-md-4"><button class="btn btn-danger btn-lg" style={{ width: '60%' }} id={this.state.orderId} onClick={this.cancelOrder}> Cancel Order</button></div>)
    }
    if (!cookie.get("token")) {
      redirectVar = <Redirect to="/LoginOwner" />
    }
    let array = [];
    if (this.state.orders) {
      this.state.orders.map((order) => {
        if (order.orderStatus != "Delivered") {
          let val = JSON.parse(order.orderDetails);
          let array2 = []
          let sum = parseFloat(0);
          let count = parseInt(0);
          val.map((item) => {
            sum += parseFloat(item.itemCostTotal)
            count += parseInt(item.itemCount)

          })

          array.push(<div class="row embossed-heavy" style={{ marginLeft: '100px', marginRight: '140px', marginBottom: '10px', paddingBottom: '10px', fontWeight: 'bold', backgroundColor: 'white' }}>
            <div class="row" style={{ backgroundColor: '#f2f2f2', marginLeft: '0px', marginRight: '0px' }}>
              <div class="col-md-2" style={{ paddingRight: '0px' }}><h5>Order Date :</h5></div>
              <div class="col-md-3" style={{ paddingLeft: '0px' }}><h5>{order.orderDate}</h5></div>
              <div class="col-md-3"></div>
              <div class="col-md-3">
                <button class="btn " id={order._id} style={{ backgroundColor: 'Green', color: 'white', fontSize: '16px', marginTop: '0px', marginTop: '10px' }} onClick={this.sendMessage}> Send A Message</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8"><p style={{ fontSize: '20px', marginLeft: '10px', marginTop: '10px', marginBottom: '0px' }}>{order.buyerFirstName}  {order.buyerLastName}</p></div>
              <div class="col-md-2"><h5 style={{ fontWeight: 'bold' }}>Items {count}</h5></div>
              <div class="col-md-2"></div>
            </div>

            <div class="row">
              <div class="col-md-8"><p style={{ marginLeft: '10px', fontSize: '15px', paddingBottom: '0px' }}>{order.buyerAddress}</p></div>
              <div class="col-md-4">${sum.toFixed(2)}</div>

            </div>
            <div class="row" style={{ marginLeft: '5px' }}>
              <div class="col-md-4" ></div>
              <div class="col-md-4">
                <button class="btn " id={order._id} style={{ backgroundColor: 'blue', color: 'white', fontSize: '16px', marginTop: '0px' }} onClick={this.trackOrder}> Order Details</button>
              </div>
              <div class="col-md-4" ></div>
            </div>
          </div>)
        }


      })
    } else {
      array.push(<div class="NoOrder"></div>)
    }

    let items = []
    let sum = parseFloat(0);
    this.state.orderDetails.map((item) => {
      sum += parseFloat(item.itemCostTotal)
      items.push(<div class="row" style={{ marginLeft: '30px', marginBottom: '20px', textAlign: 'center' }}>
        <div class="col-md-2">{item.itemCount}</div>
        <div class="col-md-5">{item.itemName}</div>
        <div class="col-md-3"></div>
        <div class="col-md-2">${item.itemCostTotal}</div>
      </div>)
    })
    //                  
    items.push(<br></br>)
    items.push(<hr style={{ borderBottom: "1px solid black" }}></hr>)
    items.push(<div class="row" style={{ marginRight: '20px' }}>
      <div class="col-md-8"></div>
      <div class="col-md-3"><h4>Amount Paid :</h4></div>
      <div class="col-md-1"><h4>${sum.toFixed(2)}</h4></div>
    </div>)
    let progressBar = []
    switch (this.state.orderStatus) {
      case 'New':
        statusButton = (<div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4"><button class="btn" style={{ backgroundColor: 'Green', color: 'white', width: '200%' }} onClick={this.statusChange} >Confirm</button></div>
          <div class="col-md-4"></div>
        </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Placed</div>)
        break;
      case 'Confirmed':
        statusButton = (<div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4"><button class="btn" style={{ backgroundColor: 'Green', color: 'white', width: '200%' }} onClick={this.statusChange} >Preparing</button></div>
          <div class="col-md-4"></div>
        </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Placed</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Confirmed </div>)
        break;
      case 'Preparing':
        statusButton = (<div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4"><button class="btn" style={{ backgroundColor: 'Green', color: 'white', width: '200%' }} onClick={this.statusChange}>Ready</button></div>
          <div class="col-md-4"></div>
        </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Placed</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Confirmed </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Preparing</div>)
        break;
      case 'Ready':
        statusButton = (<div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-4"><button class="btn" style={{ backgroundColor: 'Green', color: 'white', width: '200%' }} onClick={this.statusChange} >Picked Up</button></div>
          <div class="col-md-4"></div>
        </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Placed</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Confirmed </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Preparing</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Ready</div>)
        break;
      case 'Delivered':
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Placed</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Order Confirmed </div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Preparing</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Ready</div>)
        progressBar.push(<div class="progress-bar bg-danger" style={{ width: "20%" }}>Delivered</div>)
        break;
      case 'Cancelled':
        progressBar.push(<div class="progress-bar" style={{ width: "100%", backgroundColor: "red" }}>Order Cancelled</div>)

        break;
    }

    return (

      <div>
        {redirectVar}
        <p style={{ color: 'crimson', fontWeight: '900', fontSize: '40px', marginLeft: '600px', marginTop: '0px' }}>{sessionStorage.getItem("RestaurantName")}</p>
        <p style={{ color: 'blue', fontWeight: '900', fontSize: '25px', marginLeft: '40px', marginTop: '0px' }}>{this.state.titleName}</p>
        <ul class="nav nav-tabs" style={{ fontSize: '18px', marginLeft: '55px' }}>
          <li class={this.state.New}><a onClick={this.newOrders}><p>New</p> </a></li>
          <li class={this.state.Confirmed}><a onClick={this.confirmedOrders}><p style={{ paddingBottom: '0px' }}>Confirmed</p></a></li>
          <li class={this.state.Preparing}><a onClick={this.preparingOrders}><p style={{ paddingBottom: '0px' }}>Preparing</p></a></li>
          <li class={this.state.Ready}><a onClick={this.readyOrders}><p style={{ paddingBottom: '0px' }}>Ready</p></a></li>
          <li class={this.state.Cancelled}><a onClick={this.cancelledOrders}><p style={{ paddingBottom: '0px' }}>Cancelled</p></a></li>

        </ul>

        <ul class="list-group" style={{ marginLeft: '150px', marginRight: '450px', marginTop: '50px' }}>
          {array}

        </ul>
        <div class="modal" id="TrackOrder" >
          <div class="modal-dialog" style={{ width: '850px', height: '1850px' }}>
            <div class="modal-content">

              <div class="modal-header">
                <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-6"><h1 class="modal-title"> Order Details</h1></div>
                  <div clas="col-md-1"></div>
                  <div class="col-md-1"><button type="button" id="closeSection" data-dismiss="modal" onClick={this.modalClose}>&times;</button></div>
                </div>
              </div>
              <div class="modal-body" style={{ height: '200%' }}>
                <div class="row" >
                  <div class="col-md-2" style={{ textAlign: 'center', paddingRight: '0px' }}><h4>Order Date : </h4></div>
                  <div class="col-md-3" style={{ textAlign: 'left', paddingLeft: '0px' }}><h4>{this.state.orderDate}</h4></div>
                  <div class="col-md-3"></div>
                  {cancelButton}
                </div>
                <div class="row" style={{ marginBottom: '20px', textAlign: 'center' }}><h3>{this.state.buyerFirstName} {this.state.buyerLastName}</h3></div>
                <div class="row" style={{ marginBottom: '20px', textAlign: 'center' }}>{this.state.buyerAddress} </div>
                <div class="progress" style={{ marginBottom: '40px' }}>
                  {progressBar}
                </div>
                <div class="row" style={{ marginLeft: '30px', marginBottom: '30px', fontSize: '16px', textAlign: 'center', fontWeight: 'bold' }}>
                  <div class="col-md-2"><h4>Quantity</h4></div>
                  <div class="col-md-5"><h4>Item Name</h4></div>
                  <div class="col-md-3"></div>
                  <div class="col-md-2"><h4>Cost</h4></div>
                </div>
                <div class="row">
                  {items}
                </div>
              </div>
              <div class="modal-footer">

                {statusButton}
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="Message" >
          <div class="modal-dialog" style={{ width: '850px', height: '1850px' }}>
            <div class="modal-content">

              <div class="modal-header">
                <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-6"><h1 class="modal-title"> Send a Message</h1></div>
                  <div clas="col-md-1"></div>
                  <div class="col-md-1"><button type="button" id="closeSection" data-dismiss="modal" onClick={this.modalCloseMessage}>&times;</button></div>
                </div>
              </div>
              <div class="modal-body" style={{ height: '200%' }}>

                <div class="row" style={{ marginBottom: '20px', textAlign: 'center' }}><h3>{this.state.buyerFirstName} {this.state.buyerLastName}</h3></div>
                <div class="row" style={{ marginBottom: '20px', textAlign: 'center' }}>{this.state.buyerAddress} </div>
                <div class="row" style={{ marginBottom: '20px', textAlign: 'center' }}> <textarea rows="4" cols="40" onChange={this.messageBoxChangeHandler} name="messageBox" value={this.state.messageBox}></textarea></div>

              </div>
              <div class="modal-footer">
                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-4"><button class="btn" style={{ backgroundColor: 'Green', color: 'white', width: '200%' }} onClick={this.messageSendHandler} >Send</button></div>
                  <div class="col-md-4"></div>
                </div>
                <div class="row">{messageDisplay}</div>
              </div>
            </div>
          </div>
        </div>

      </div>




    )
  }
}
function mapState(state) {
  const { owner, alert } = state;
  return { owner, alert };
}
const actionCreators = {
  fetchNewOrders: ownerActions.fetchNewOrders,
  fetchConfirmedOrders: ownerActions.fetchConfirmedOrders,
  fetchPreparingOrders: ownerActions.fetchPreparingOrders,
  fetchReadyOrders: ownerActions.fetchReadyOrders,
  fetchCancelledOrders: ownerActions.fetchCancelledOrders,
  cancelOrders: ownerActions.cancelOrders,
  statusChangeOrder: ownerActions.statusChange,
  sendMessage:ownerActions.sendMessage
};

const connectedHomeOwner = connect(mapState, actionCreators)(HomeOwner);
export { connectedHomeOwner as HomeOwner };
