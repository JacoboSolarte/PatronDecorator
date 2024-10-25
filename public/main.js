const addToOrderButton = document.getElementById('add-to-order');
const placeOrderButton = document.getElementById('place-order');
const cancelOrderButton = document.getElementById('cancel-order');
const orderList = document.getElementById('order-list');
const foodItemSelect = document.getElementById('food-item');
const extraCheeseCheckbox = document.getElementById('extra-cheese');
const extraSauceCheckbox = document.getElementById('extra-sauce');

let orders = [];

addToOrderButton.addEventListener('click', function() {
    const foodItem = foodItemSelect.value;
    const extras = [];
    if (extraCheeseCheckbox.checked) {
        extras.push('Queso Extra');
    }
    if (extraSauceCheckbox.checked) {
        extras.push('Salsa Extra');
    }

    const order = {
        item: foodItem,
        extras: extras
    };

    orders.push(order);
    updateOrderList();
});

function updateOrderList() {
    orderList.innerHTML = ''; 
    orders.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${order.item} ${order.extras.length > 0 ? '(' + order.extras.join(', ') + ')' : ''}`;
        orderList.appendChild(listItem);
    });
}

placeOrderButton.addEventListener('click', function() {
    if (orders.length === 0) {
        alert('No hay pedidos para realizar.');
    } else {
        alert('Pedido realizado: \n' + orders.map(order => `${order.item} ${order.extras.length > 0 ? '(' + order.extras.join(', ') + ')' : ''}`).join('\n'));
        orders = []; 
        updateOrderList();
    }
});

cancelOrderButton.addEventListener('click', function() {
    if (orders.length === 0) {
        alert('No hay pedidos para cancelar.');
    } else {
        orders.pop(); 
        updateOrderList();
        alert('Última orden cancelada.');
    }
});
