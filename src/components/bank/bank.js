// import { TicketList } from "../tickets/TicketList";
// import { ShopList } from "../shops/ShopList";


// export const bankTotal = ()  => {

// const shopBankTotal = () => {
//     const completedShops = shops.filter(shop => shop.dateCompleted?.length > 1 ) //back to all tickets 
//     const shopTotal = completedShops.reduce((accumulator, currentValue) => {
//         return accumulator - currentValue.rate;
//       }, 0);
//     return shopTotal
// }

// const todoBankTotal = () => {
//     const completedTickets = tickets.filter(ticket => ticket.dateCompleted?.length > 1 ) //back to all tickets 
//     const bankTotal = completedTickets.reduce((accumulator, currentValue) => {
//         return accumulator + currentValue.rate;
//       }, 0);
// return bankTotal

// }

// const absoluteBankTotal = () => {
//     shopBankTotal + todoBankTotal
// }
// }

// const closeTicket = () => {
//     const copy = {
//         userId: ticketObject.userId,
//         description: ticketObject.description,
//         emergency: ticketObject.emergency,
//         dateCompleted: new Date() ,
//         rate: ticketObject.rate

//     }

//     return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(copy)

//     })
//         .then(response => response.json())
//         .then(getAllTickets) //pull new api state back in

// }