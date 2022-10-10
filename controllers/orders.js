const Orders = require('../models/orders')

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
    if (orders.length > 0) {
      res.status(200).json({
        orders: orders.reverse(),
      })
    } else {
      res.status(200).json({
        message: 'No results',
        orders,
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const getOrderById = (req, res) => {
  try {
    const id = req.params.id
    Orders.findById(id).then((response) => {
      res.json({
        response,
      })
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

const addOrder = async (req, res) => {
  console.log('REQ: ', req.body)
  try {
    let order = new Orders(req.body)
    console.log('ORDERS: ', order)
    await order.save()
    await res.status(200).json({
      message: 'Add order successfully!',
    })
  } catch (error) {
    console.log('ERROR: ', error)
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
  // const {
  //   customerName,
  //   phone,
  //   pitchId,
  //   pitchName,
  //   pitchSize,
  //   timeOrder,
  //   dateOrder,
  //   userId,
  // } = req.body
  // if (
  //   !customerName ||
  //   !phone ||
  //   !pitchId ||
  //   !pitchName ||
  //   !pitchSize ||
  //   !timeOrder ||
  //   !dateOrder ||
  //   !userId
  // ) {
  //   res.status(400).json({ message: 'Some field not null' })
  // }
}

const editOrder = (req, res) => {
  try {
    let id = req.params.id
    Orders.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
      (data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
          })
        } else res.send({ message: 'Order was updated successfully.' })
      },
    )
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!',
    })
  }
}

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  editOrder,
}